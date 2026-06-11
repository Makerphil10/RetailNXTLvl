import { useEffect } from 'react';
import type { CareerStation } from '../cvData';
import { PLAYER } from '../cvData';

interface Props {
  station: CareerStation;
  onClose: () => void;
  onContact: () => void;
}

export default function StationModal({ station, onClose, onContact }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const mailto = `mailto:${PLAYER.email}?subject=${encodeURIComponent(
    'Next Level: Marketing Manager @ ByteRockers’ Games',
  )}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal pixel-panel"
        role="dialog"
        aria-modal="true"
        aria-label={station.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-kicker">
          {station.isFinal ? '⭐ FINAL LEVEL' : 'QUEST LOG'} · {station.period} · {station.location}
        </div>
        <h2 className="modal-title">{station.title}</h2>
        <div className="modal-meta">{station.company}</div>
        <p className="modal-quest">“{station.quest}”</p>
        <ul>
          {station.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {station.loot && <div className="modal-loot">★ {station.loot} ★</div>}
        <div className="modal-actions">
          {station.isFinal ? (
            <>
              <a className="pixel-btn primary" href={mailto}>
                ✉ Apply / Say Hi
              </a>
              <button className="pixel-btn" onClick={onContact}>
                Contact Info
              </button>
              <button className="pixel-btn" onClick={onClose}>
                Keep Exploring
              </button>
            </>
          ) : (
            <button className="pixel-btn primary" onClick={onClose}>
              Continue ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
