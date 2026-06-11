import type { PageId } from '../App';
import { PLAYER } from '../cvData';

interface Props {
  visitedCount: number;
  totalCount: number;
  page: PageId;
  onTogglePage: (page: PageId) => void;
  soundOn: boolean;
  onToggleSound: () => void;
}

export default function Hud({ visitedCount, totalCount, page, onTogglePage, soundOn, onToggleSound }: Props) {
  const pct = Math.round((visitedCount / totalCount) * 100);
  return (
    <header className="hud">
      <span className="hud-name">{PLAYER.name}</span>
      <div className="hud-xp">
        <div className="hud-xp-label">
          CAREER XP · {visitedCount}/{totalCount} STATIONS
        </div>
        <div className="hud-xp-bar">
          <div className="hud-xp-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <nav className="hud-buttons">
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
        <button className="hud-btn" onClick={onToggleSound} aria-label="Toggle sound">
          {soundOn ? '🔊' : '🔇'}
        </button>
      </nav>
    </header>
  );
}
