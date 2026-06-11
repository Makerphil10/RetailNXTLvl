import { useEffect, useMemo, useRef, useState } from 'react';
import type { CareerStation } from '../cvData';
import { PLAYER_FRAMES, SPRITE_W } from '../sprites';
import { sfx } from '../audio';

interface Props {
  stations: CareerStation[];
  visited: Set<string>;
  paused: boolean;
  onInteract: (station: CareerStation) => void;
  onFirstMove: () => void;
  onLeftWall: () => void;
}

/** A solid box the player can stand on (and is blocked by from the side). */
interface Solid {
  x1: number;
  x2: number;
  top: number;
}

const START_X = 140;
const FIRST_STATION_X = 470;
const STATION_GAP = 520;
const STEP_H = 110; // every station sits one step higher
const TERRACE_HALF = 260; // terraces touch: STATION_GAP / 2
const CRATE_W = 70;
const CRATE_H = 56;
const SPEED = 300; // px per second
const GRAVITY = 2600;
const JUMP_V = 1000;
const PLAYER_HALF = 18;
const INTERACT_RANGE = 90;
const LEFT_WALL = 60;
const GROUND_PX = 72; // height of the base ground strip in CSS

export default function GameWorld({ stations, visited, paused, onInteract, onFirstMove, onLeftWall }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: START_X, y: 0, vy: 0 });
  const camY = useRef(0);
  const keys = useRef({ left: false, right: false });
  const jumpQueued = useRef(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const [nearId, setNearId] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const nearIdRef = useRef<string | null>(null);
  const firedMoveRef = useRef(false);
  const firedWallRef = useRef(false);
  const onFirstMoveRef = useRef(onFirstMove);
  const onLeftWallRef = useRef(onLeftWall);
  onFirstMoveRef.current = onFirstMove;
  onLeftWallRef.current = onLeftWall;

  const isTouch = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );

  // station positions: x along the world, h = platform height
  const stationPos = useMemo(
    () =>
      new Map(
        stations.map((s, i) => [s.id, { x: FIRST_STATION_X + i * STATION_GAP, h: i * STEP_H }]),
      ),
    [stations],
  );
  const last = stationPos.get(stations[stations.length - 1].id)!;
  const worldWidth = last.x + 500;
  const maxX = last.x + 70;

  // terraced staircase: one solid step per station (the first sits on the ground),
  // plus a half-height crate in front of each step face as a stepping stone
  const { terraces, crates, solids } = useMemo(() => {
    const terraces: Solid[] = [];
    const crates: Solid[] = [];
    stations.forEach((s, i) => {
      if (i === 0) return;
      const { x, h } = stationPos.get(s.id)!;
      terraces.push({ x1: x - TERRACE_HALF, x2: x + TERRACE_HALF, top: h });
      const faceX = x - TERRACE_HALF;
      crates.push({ x1: faceX - CRATE_W - 16, x2: faceX - 16, top: (i - 1) * STEP_H + CRATE_H });
    });
    return { terraces, crates, solids: [...terraces, ...crates] };
  }, [stations, stationPos]);

  const stars = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => ({
        left: (i * 97) % 4500,
        top: (i * 61) % 88,
        twinkle: i % 4 === 0,
      })),
    [],
  );

  // deterministic pseudo-random skyline, two parallax layers with lit windows
  const farBuildings = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: i * 190 + ((i * 89) % 110),
        width: 70 + ((i * 53) % 80),
        height: 100 + ((i * 97) % 160),
      })),
    [],
  );
  const nearBuildings = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: i * 330 + ((i * 71) % 160),
        width: 120 + ((i * 37) % 110),
        height: 60 + ((i * 61) % 110),
      })),
    [],
  );

  // physics + camera loop (direct DOM writes; React state only for proximity changes)
  useEffect(() => {
    let raf = 0;
    let lastT = performance.now();
    let frameToggle = 0;

    const step = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      const p = pos.current;

      let dir = 0;
      if (!pausedRef.current) {
        if (keys.current.left) dir -= 1;
        if (keys.current.right) dir += 1;

        // --- horizontal movement with side collision against solids ---
        if (dir !== 0) {
          let newX = Math.max(LEFT_WALL, Math.min(maxX, p.x + dir * SPEED * dt));
          for (const s of solids) {
            if (p.y < s.top - 4 && newX + PLAYER_HALF > s.x1 && newX - PLAYER_HALF < s.x2) {
              newX = dir > 0 ? Math.min(newX, s.x1 - PLAYER_HALF) : Math.max(newX, s.x2 + PLAYER_HALF);
            }
          }
          p.x = newX;
          setMoved(true);
          if (!firedMoveRef.current) {
            firedMoveRef.current = true;
            onFirstMoveRef.current();
          }
          if (!firedWallRef.current && dir < 0 && p.x <= LEFT_WALL) {
            firedWallRef.current = true;
            onLeftWallRef.current();
          }
          if (playerRef.current) playerRef.current.classList.toggle('face-left', dir < 0);
        }

        // --- vertical: gravity, landing on the highest supporting surface ---
        p.vy -= GRAVITY * dt;
        let newY = p.y + p.vy * dt;
        let grounded = false;
        if (p.vy <= 0) {
          let landTop = newY <= 0 ? 0 : -Infinity;
          for (const s of solids) {
            if (p.y >= s.top - 0.01 && newY <= s.top && p.x + PLAYER_HALF > s.x1 && p.x - PLAYER_HALF < s.x2) {
              landTop = Math.max(landTop, s.top);
            }
          }
          if (landTop > -Infinity) {
            newY = landTop;
            p.vy = 0;
            grounded = true;
          }
        }
        p.y = newY;

        if (jumpQueued.current) {
          jumpQueued.current = false;
          if (grounded) {
            p.vy = JUMP_V;
            sfx.jump();
          }
        }

        // walk cycle while moving on the ground
        if (dir !== 0 && grounded) {
          const frame = Math.floor(p.x / 30) % 2;
          if (frame !== frameToggle && spriteRef.current) {
            frameToggle = frame;
            spriteRef.current.style.boxShadow = PLAYER_FRAMES[frame];
          }
        }
        if (playerRef.current) {
          playerRef.current.classList.toggle('walking', dir !== 0 && grounded);
          playerRef.current.classList.toggle('airborne', !grounded);
        }
      }

      // --- camera: horizontal center + smooth vertical follow ---
      const viewportW = viewportRef.current?.clientWidth ?? 800;
      const viewportH = viewportRef.current?.clientHeight ?? 600;
      const camX = Math.max(0, Math.min(worldWidth - viewportW, p.x - viewportW / 2));
      const camYTarget = Math.max(0, p.y - viewportH * 0.3);
      camY.current += (camYTarget - camY.current) * Math.min(1, 10 * dt);
      const cy = camY.current;

      if (worldRef.current) worldRef.current.style.transform = `translate(${-camX}px, ${cy}px)`;
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${p.x - camX - SPRITE_W / 2}px, ${-(p.y - cy)}px)`;
      }
      if (starsRef.current) starsRef.current.style.transform = `translate(${-camX * 0.12}px, ${cy * 0.15}px)`;
      if (farRef.current) farRef.current.style.transform = `translate(${-camX * 0.35}px, ${cy * 0.45}px)`;
      if (nearRef.current) nearRef.current.style.transform = `translate(${-camX * 0.6}px, ${cy * 0.65}px)`;

      // proximity check (must be on the station's platform, not below it)
      let found: string | null = null;
      for (const [id, sp] of stationPos) {
        if (Math.abs(p.x - sp.x) < INTERACT_RANGE && Math.abs(p.y - sp.h) < 60) {
          found = id;
          break;
        }
      }
      if (found !== nearIdRef.current) {
        nearIdRef.current = found;
        setNearId(found);
        if (found) sfx.blip();
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [stationPos, solids, worldWidth, maxX]);

  // keyboard controls
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.current.left = true;
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.current.right = true;
          e.preventDefault();
          break;
        case ' ':
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (!pausedRef.current) jumpQueued.current = true;
          e.preventDefault();
          break;
        case 'e':
        case 'E':
        case 'Enter': {
          if (pausedRef.current) return;
          const id = nearIdRef.current;
          const station = id ? stations.find((s) => s.id === id) : undefined;
          if (station) {
            e.preventDefault();
            onInteract(station);
          }
          break;
        }
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [stations, onInteract]);

  const nearStation = nearId ? stations.find((s) => s.id === nearId) : undefined;

  const press = (key: 'left' | 'right', value: boolean) => () => {
    keys.current[key] = value;
  };

  return (
    <div className="viewport" ref={viewportRef}>
      {/* parallax background layers */}
      <div className="layer" ref={starsRef} aria-hidden="true">
        <div className="stars">
          {stars.map((s, i) => (
            <span
              key={i}
              className={`star${s.twinkle ? ' twinkle' : ''}`}
              style={{ left: s.left, top: `${s.top}%` }}
            />
          ))}
          <div className="moon" />
        </div>
      </div>
      <div className="layer" ref={farRef} aria-hidden="true">
        {farBuildings.map((b, i) => (
          <div key={i} className="bldg far" style={{ left: b.left, width: b.width, height: b.height }} />
        ))}
      </div>
      <div className="layer" ref={nearRef} aria-hidden="true">
        {nearBuildings.map((b, i) => (
          <div key={i} className="bldg near" style={{ left: b.left, width: b.width, height: b.height }} />
        ))}
        <div className="horizon-glow" />
      </div>

      {/* world */}
      <div className="world" ref={worldRef} style={{ width: worldWidth }}>
        <div className="ground" />
        {terraces.map((t, i) => (
          <div
            key={`t${i}`}
            className="terrace"
            style={{ left: t.x1, width: t.x2 - t.x1, height: t.top }}
          />
        ))}
        {crates.map((c, i) => (
          <div
            key={`c${i}`}
            className="crate"
            style={{ left: c.x1, width: c.x2 - c.x1, height: CRATE_H, bottom: GROUND_PX + c.top - CRATE_H }}
          />
        ))}
        {stations.map((s) => {
          const sp = stationPos.get(s.id)!;
          const isNear = nearId === s.id;
          const cls = [
            'station',
            visited.has(s.id) ? 'visited' : '',
            isNear ? 'near' : '',
            s.isFinal ? 'final' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={s.id} className={cls} style={{ left: sp.x, bottom: GROUND_PX + sp.h }}>
              {visited.has(s.id) && <span className="station-check">✔</span>}
              <span className="station-year">{s.year}</span>
              <div className="station-sign">
                {s.sign}
                <br />
                {s.company}
              </div>
              <div className="station-pole" />
              <div className="station-pad" />
            </div>
          );
        })}
        {/* final gate at the very top */}
        <div className="gate" style={{ left: last.x, bottom: GROUND_PX + last.h }} aria-hidden="true">
          <div className="gate-arch">
            NEXT
            <br />
            LEVEL
            <br />
            LOADING…
          </div>
        </div>
      </div>

      {/* player (fixed to viewport, moved via transform) */}
      <div className="player" ref={playerRef}>
        <div className="player-inner">
          <div className="sprite-bob">
            <div className="px" ref={spriteRef} style={{ boxShadow: PLAYER_FRAMES[0] }} />
          </div>
        </div>
      </div>

      {/* interact prompt */}
      {nearStation && !paused && (
        <button className="prompt" onClick={() => onInteract(nearStation)}>
          {isTouch ? 'TAP Ⓐ TO INSPECT' : 'PRESS E TO INSPECT'} · {nearStation.year}
        </button>
      )}

      {/* controls hint until first movement */}
      {!moved && !paused && (
        <div className="hint">
          {isTouch ? (
            <>WALK WITH ◀ ▶ · JUMP WITH Ⓑ<br />INSPECT STATIONS WITH Ⓐ</>
          ) : (
            <>WALK WITH ← → · JUMP WITH SPACE<br />INSPECT STATIONS WITH E</>
          )}
          <br />
          <span style={{ color: 'var(--dim)' }}>CLIMB THE CAREER LADDER — BYTEROCKERS' IS AT THE TOP →</span>
        </div>
      )}

      {/* touch controls */}
      {isTouch && (
        <div className="touch-controls">
          <div className="touch-group">
            <button
              className="touch-btn"
              onTouchStart={press('left', true)}
              onTouchEnd={press('left', false)}
              onTouchCancel={press('left', false)}
              aria-label="Walk left"
            >
              ◀
            </button>
            <button
              className="touch-btn"
              onTouchStart={press('right', true)}
              onTouchEnd={press('right', false)}
              onTouchCancel={press('right', false)}
              aria-label="Walk right"
            >
              ▶
            </button>
          </div>
          <div className="touch-group">
            <button
              className="touch-btn"
              onTouchStart={() => {
                if (!pausedRef.current) jumpQueued.current = true;
              }}
              aria-label="Jump"
            >
              Ⓑ
            </button>
            <button
              className="touch-btn action"
              onClick={() => {
                if (nearStation && !paused) onInteract(nearStation);
              }}
              aria-label="Inspect station"
            >
              Ⓐ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
