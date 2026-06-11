import { useEffect, useRef, useState } from 'react';
import type { PageId } from '../App';
import { PLAYER } from '../cvData';

interface Props {
  visitedCount: number;
  totalCount: number;
  page: PageId;
  onTogglePage: (page: PageId) => void;
  soundOn: boolean;
  onToggleSound: () => void;
  musicOn: boolean;
  onToggleMusic: () => void;
}

export default function Hud({
  visitedCount,
  totalCount,
  page,
  onTogglePage,
  soundOn,
  onToggleSound,
  musicOn,
  onToggleMusic,
}: Props) {
  const pct = Math.round((visitedCount / totalCount) * 100);

  // flash the XP bar whenever a new station is collected
  const [flash, setFlash] = useState(false);
  const prevCount = useRef(visitedCount);
  useEffect(() => {
    if (visitedCount > prevCount.current) {
      setFlash(true);
      const t = window.setTimeout(() => setFlash(false), 1100);
      prevCount.current = visitedCount;
      return () => clearTimeout(t);
    }
    prevCount.current = visitedCount;
  }, [visitedCount]);

  return (
    <header className="hud">
      <span className="hud-name">{PLAYER.name}</span>
      <div className="hud-xp">
        <div className="hud-xp-label">
          CAREER XP · {visitedCount}/{totalCount} STATIONS
        </div>
        <div className={`hud-xp-bar${flash ? ' flash' : ''}`}>
          <div className="hud-xp-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <nav className="hud-buttons">
        <a
          className="hud-btn pdf"
          href={PLAYER.cvPdfUrl}
          target="_blank"
          rel="noreferrer"
          title="Skip the game — grab the CV as a PDF"
        >
          📄 CV PDF
        </a>
        <button className={`hud-btn${page === 'character' ? ' active' : ''}`} onClick={() => onTogglePage('character')}>
          CHAR
        </button>
        <button className={`hud-btn${page === 'achievements' ? ' active' : ''}`} onClick={() => onTogglePage('achievements')}>
          ACHIEVEMENTS
        </button>
        <button className={`hud-btn${page === 'contact' ? ' active' : ''}`} onClick={() => onTogglePage('contact')}>
          CONTACT
        </button>
        <button className={`hud-btn${page === 'classic' ? ' active' : ''}`} onClick={() => onTogglePage('classic')}>
          CLASSIC CV
        </button>
        <button className={`hud-btn${musicOn ? ' active' : ''}`} onClick={onToggleMusic} aria-label="Toggle music">
          ♪
        </button>
        <button className="hud-btn" onClick={onToggleSound} aria-label="Toggle sound effects">
          {soundOn ? '🔊' : '🔇'}
        </button>
      </nav>
    </header>
  );
}
