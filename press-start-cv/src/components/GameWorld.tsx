import { useEffect, useMemo, useRef, useState } from 'react';
import type { CareerStation } from '../cvData';
import { PLAYER_FRAMES, SPRITE_W } from '../sprites';
import { sfx } from '../audio';

interface Props {
  stations: CareerStation[];
  visited: Set<string>;
  paused: boolean;
  onInteract: (station: CareerStation) => void;
}

const START_X = 140;
const FIRST_STATION_X = 620;
const STATION_GAP = 780;
const SPEED = 300; // px per second
const INTERACT_RANGE = 80;

export default function GameWorld({ stations, visited, paused, onInteract }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const skylineRef = useRef<HTMLDivElement>(null);
  const hillsRef = useRef<HTMLDivElement>(null);

  const pos = useRef(START_X);
  const keys = useRef({ left: false, right: false });
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const [nearId, setNearId] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const nearIdRef = useRef<string | null>(null);
  const isTouch = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );

  const stationX = useMemo(
    () => new Map(stations.map((s, i) => [s.id, FIRST_STATION_X + i * STATION_GAP])),
    [stations],
  );
  const lastStationX = FIRST_STATION_X + (stations.length - 1) * STATION_GAP;
  const worldWidth = lastStationX + 500;
  // keep the player within interact range of the final gate
  const maxX = lastStationX + 70;

  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        left: (i * 97) % worldWidth,
        top: (i * 61) % 55,
        twinkle: i % 4 === 0,
      })),
    [worldWidth],
  );

  // movement + camera loop (direct DOM writes; React state only for proximity changes)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let frameToggle = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!pausedRef.current) {
        let dir = 0;
        if (keys.current.left) dir -= 1;
        if (keys.current.right) dir += 1;
        if (dir !== 0) {
          pos.current = Math.max(60, Math.min(maxX, pos.current + dir * SPEED * dt));
          setMoved(true);
          if (playerRef.current) {
            playerRef.current.classList.toggle('face-left', dir < 0);
          }
          // two-frame walk cycle tied to distance walked
          const frame = Math.floor(pos.current / 26) % 2;
          if (frame !== frameToggle && spriteRef.current) {
            frameToggle = frame;
            spriteRef.current.style.boxShadow = PLAYER_FRAMES[frame];
          }
        }
      }

      const viewportW = viewportRef.current?.clientWidth ?? 800;
      const camera = Math.max(0, Math.min(worldWidth - viewportW, pos.current - viewportW / 2));

      if (worldRef.current) worldRef.current.style.transform = `translateX(${-camera}px)`;
      if (playerRef.current) {
        playerRef.current.style.transform = `translateX(${pos.current - camera - SPRITE_W / 2}px)`;
      }
      if (starsRef.current) starsRef.current.style.transform = `translateX(${-camera * 0.15}px)`;
      if (skylineRef.current) skylineRef.current.style.transform = `translateX(${-camera * 0.4}px)`;
      if (hillsRef.current) hillsRef.current.style.transform = `translateX(${-camera * 0.65}px)`;

      // proximity check
      let found: string | null = null;
      for (const [id, x] of stationX) {
        if (Math.abs(pos.current - x) < INTERACT_RANGE) {
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
  }, [stationX, worldWidth]);

  // keyboard controls
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.current.right = true;
          break;
        case 'e':
        case 'E':
        case 'Enter':
        case ' ': {
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
        </div>
      </div>
      <div className="layer" aria-hidden="true">
        <div className="skyline" ref={skylineRef} />
      </div>
      <div className="layer" aria-hidden="true">
        <div className="hills" ref={hillsRef} />
      </div>

      {/* world */}
      <div className="world" ref={worldRef} style={{ width: worldWidth }}>
        <div className="ground" />
        {stations.map((s) => {
          const x = stationX.get(s.id)!;
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
            <div key={s.id} className={cls} style={{ left: x }}>
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
        {/* final gate behind the last station */}
        <div className="gate" style={{ left: stationX.get(stations[stations.length - 1].id)! }} aria-hidden="true">
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
          <div className="px" ref={spriteRef} style={{ boxShadow: PLAYER_FRAMES[0] }} />
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
            <>WALK WITH ◀ ▶<br />INSPECT STATIONS WITH Ⓐ</>
          ) : (
            <>WALK WITH ← → (OR A/D)<br />INSPECT STATIONS WITH E</>
          )}
          <br />
          <span style={{ color: 'var(--dim)' }}>YOUR CAREER AWAITS ON THE RIGHT →</span>
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
