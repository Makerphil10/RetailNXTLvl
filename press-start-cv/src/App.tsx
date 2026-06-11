import { useCallback, useEffect, useRef, useState } from 'react';
import TitleScreen from './components/TitleScreen';
import GameWorld from './components/GameWorld';
import Hud from './components/Hud';
import StationModal from './components/StationModal';
import { AchievementsPage, CharacterPage, ClassicCvPage, ContactPage } from './components/Pages';
import { ACHIEVEMENTS, BONUS_ACHIEVEMENTS, STATIONS, type CareerStation } from './cvData';
import { setMuted, sfx } from './audio';

export type PageId = 'character' | 'achievements' | 'contact' | 'classic' | null;

const STORAGE_KEY = 'press-start-cv-progress-v1';

interface Progress {
  visited: string[];
  unlocked: string[];
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Progress;
  } catch {
    /* fresh start */
  }
  return { visited: [], unlocked: [] };
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState<PageId>(null);
  const [activeStation, setActiveStation] = useState<CareerStation | null>(null);
  const [visited, setVisited] = useState<Set<string>>(() => new Set(loadProgress().visited));
  const [unlocked, setUnlocked] = useState<Set<string>>(() => new Set(loadProgress().unlocked));
  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const toastTimer = useRef<number | null>(null);
  // refs mirror the sets so unlock logic stays out of state updaters (StrictMode-safe)
  const unlockedRef = useRef(unlocked);
  const visitedRef = useRef(visited);

  useEffect(() => {
    setMuted(!soundOn);
  }, [soundOn]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ visited: [...visited], unlocked: [...unlocked] } satisfies Progress),
    );
  }, [visited, unlocked]);

  // Drain the achievement toast queue one toast at a time
  useEffect(() => {
    if (toastQueue.length === 0 || toastTimer.current !== null) return;
    toastTimer.current = window.setTimeout(() => {
      toastTimer.current = null;
      setToastQueue((q) => q.slice(1));
    }, 3200);
    return () => {
      if (toastTimer.current !== null) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, [toastQueue]);

  const unlock = useCallback((ids: string[]) => {
    const fresh = ids.filter((id) => !unlockedRef.current.has(id));
    if (fresh.length === 0) return;
    unlockedRef.current = new Set([...unlockedRef.current, ...fresh]);
    setUnlocked(unlockedRef.current);
    sfx.unlock();
    setToastQueue((q) => [...q, ...fresh]);
  }, []);

  const handleInteract = useCallback(
    (station: CareerStation) => {
      sfx.open();
      setActiveStation(station);
      if (visitedRef.current.has(station.id)) return;
      visitedRef.current = new Set([...visitedRef.current, station.id]);
      setVisited(visitedRef.current);
      const ids = [station.achievementId, ...(BONUS_ACHIEVEMENTS[station.id] ?? [])];
      if (visitedRef.current.size === STATIONS.length) ids.push('completionist');
      unlock(ids);
    },
    [unlock],
  );

  const handleFirstMove = useCallback(() => unlock(['first-steps']), [unlock]);
  const handleLeftWall = useCallback(() => unlock(['wrong-way']), [unlock]);

  const handleStart = useCallback(() => {
    sfx.start();
    setStarted(true);
  }, []);

  const togglePage = useCallback((next: PageId) => {
    sfx.blip();
    setPage((current) => (current === next ? null : next));
  }, []);

  const toast = toastQueue.length > 0 ? ACHIEVEMENTS.find((a) => a.id === toastQueue[0]) : null;

  if (!started) {
    return (
      <div className="crt">
        <TitleScreen onStart={handleStart} onClassic={() => { setStarted(true); setPage('classic'); }} />
      </div>
    );
  }

  return (
    <div className="crt">
      <div className="game-screen">
        <Hud
          visitedCount={visited.size}
          totalCount={STATIONS.length}
          page={page}
          onTogglePage={togglePage}
          soundOn={soundOn}
          onToggleSound={() => setSoundOn((s) => !s)}
        />
        <GameWorld
          stations={STATIONS}
          visited={visited}
          paused={activeStation !== null || page !== null}
          onInteract={handleInteract}
          onFirstMove={handleFirstMove}
          onLeftWall={handleLeftWall}
        />
      </div>

      {activeStation && (
        <StationModal
          station={activeStation}
          onClose={() => setActiveStation(null)}
          onContact={() => {
            setActiveStation(null);
            setPage('contact');
          }}
        />
      )}

      {page === 'character' && <CharacterPage onClose={() => setPage(null)} />}
      {page === 'achievements' && <AchievementsPage unlocked={unlocked} onClose={() => setPage(null)} />}
      {page === 'contact' && <ContactPage onClose={() => setPage(null)} />}
      {page === 'classic' && <ClassicCvPage onClose={() => setPage(null)} />}

      {toast && (
        <div className="toast" role="status">
          <span className="toast-icon">{toast.icon}</span>
          <div>
            <div className="toast-label">ACHIEVEMENT UNLOCKED</div>
            <div className="toast-title">{toast.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
