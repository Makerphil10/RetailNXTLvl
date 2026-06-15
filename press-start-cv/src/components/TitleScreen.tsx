import { useEffect, useMemo } from 'react';
import { PLAYER, TARGET } from '../cvData';

interface Props {
  hasProgress: boolean;
  onStart: () => void;
  onNewGame: () => void;
  onClassic: () => void;
}

export default function TitleScreen({ hasProgress, onStart, onNewGame, onClassic }: Props) {
  // Enter / Space / Gamepad-style start
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStart]);

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 90}%`,
        twinkle: i % 3 === 0,
      })),
    [],
  );

  return (
    <div className="title-screen">
      <div className="title-stars" aria-hidden="true">
        {stars.map((s, i) => (
          <span key={i} className={`star${s.twinkle ? ' twinkle' : ''}`} style={{ left: s.left, top: s.top, position: 'absolute' }} />
        ))}
      </div>

      <div className="title-kicker">
        SPECIAL EDITION — BUILT FOR THE {TARGET.studio.toUpperCase()} {TARGET.role.toUpperCase()} QUEST
      </div>

      <h1 className="title-logo">
        PHIL GEBHARDT
        <br />
        PRESS START
      </h1>

      <div className="title-sub">AN INTERACTIVE CV</div>

      <p className="title-tagline">
        {PLAYER.class} · {PLAYER.tagline} Walk the whole quest line — from EA SPORTS FIFA events
        through global adidas rollouts to indie game launches on Steam.
      </p>

      <div className="title-menu">
        <button className="pixel-btn primary" onClick={onStart}>
          ▶ {hasProgress ? 'Continue' : 'Start Game'}
        </button>
        {hasProgress && (
          <button className="pixel-btn" onClick={onNewGame}>
            ✦ New Game (reset progress)
          </button>
        )}
        <button className="pixel-btn" onClick={onClassic}>
          🕹️ Classic CV (no gameplay)
        </button>
        <a className="pixel-btn" href={PLAYER.cvPdfUrl} target="_blank" rel="noreferrer">
          📄 CV as PDF (no clicking at all)
        </a>
      </div>

      <div className="title-press blink">PRESS ENTER TO START</div>

      <div className="title-footer">
        © 2026 Philipp Gebhardt · No ads. No microtransactions. 100% organic marketing experience.
      </div>
    </div>
  );
}
