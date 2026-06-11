import type { ReactNode } from 'react';
import { ACHIEVEMENTS, INVENTORY, PLAYER, SKILLS, STATIONS, TARGET } from '../cvData';

function Page({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="page">
      <button className="pixel-btn page-close" onClick={onClose}>
        ✕ Close
      </button>
      <div className="page-inner">{children}</div>
    </div>
  );
}

export function CharacterPage({ onClose }: { onClose: () => void }) {
  return (
    <Page onClose={onClose}>
      <h2>CHARACTER SHEET</h2>
      <p>
        <strong>{PLAYER.name}</strong> — Class: {PLAYER.class}
        <br />
        {PLAYER.subtitle}
        <br />
        <span style={{ color: 'var(--dim)' }}>{PLAYER.location}</span>
      </p>

      <h3>SKILL STATS</h3>
      {SKILLS.map((s) => (
        <div className="stat-row" key={s.name}>
          <span className="stat-name">{s.name}</span>
          <div className="stat-bar" role="img" aria-label={`${s.name}: ${s.level} of 10`}>
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`stat-cell${i < s.level ? ' on' : ''}`} />
            ))}
          </div>
        </div>
      ))}

      <h3>INVENTORY</h3>
      <div className="inv-grid">
        {INVENTORY.map((item) => (
          <div className="inv-item" key={item.name}>
            <span className="inv-icon">{item.icon}</span>
            <div>
              <div className="inv-name">{item.name}</div>
              <div className="inv-note">{item.note}</div>
            </div>
          </div>
        ))}
      </div>

      <h3>LANGUAGES</h3>
      <p>{PLAYER.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}</p>

      <h3>SIDE QUESTS</h3>
      <p>{PLAYER.interests.join(' · ')}</p>
    </Page>
  );
}

export function AchievementsPage({ unlocked, onClose }: { unlocked: Set<string>; onClose: () => void }) {
  return (
    <Page onClose={onClose}>
      <h2>ACHIEVEMENTS</h2>
      <div className="ach-progress">
        {unlocked.size}/{ACHIEVEMENTS.length} unlocked — walk the level to find the rest.
      </div>
      <div className="ach-grid">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <div className={`ach-card ${isUnlocked ? 'unlocked' : 'locked'}`} key={a.id}>
              <span className="ach-icon">{isUnlocked ? a.icon : '🔒'}</span>
              <div>
                <div className="ach-title">{isUnlocked ? a.title : '???'}</div>
                <div className="ach-desc">{isUnlocked ? a.description : 'Keep exploring to unlock.'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

export function ContactPage({ onClose }: { onClose: () => void }) {
  const mailto = `mailto:${PLAYER.email}?subject=${encodeURIComponent(
    `Next Level: ${TARGET.role} @ ${TARGET.studio}`,
  )}`;
  return (
    <Page onClose={onClose}>
      <h2>READY PLAYER TWO?</h2>
      <div className="pixel-panel contact-card">
        <div className="big">
          {PLAYER.name}
          <br />
          {PLAYER.class}
        </div>
        <div className="contact-lines">
          <div>📧 {PLAYER.email}</div>
          <div>📱 {PLAYER.phone}</div>
          <div>📍 {PLAYER.location}</div>
        </div>
        <div className="modal-actions" style={{ justifyContent: 'center' }}>
          <a className="pixel-btn primary" href={mailto}>
            ✉ Send Message
          </a>
          <a className="pixel-btn" href={PLAYER.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="pixel-btn" href={PLAYER.classicCvUrl} target="_blank" rel="noreferrer">
            Classic CV Site
          </a>
        </div>
        <p style={{ marginTop: 20, color: 'var(--dim)' }}>
          Co-op invites from {TARGET.studio} ({TARGET.city}) receive priority matchmaking. 🚀
        </p>
      </div>
    </Page>
  );
}

export function ClassicCvPage({ onClose }: { onClose: () => void }) {
  return (
    <Page onClose={onClose}>
      <h2>CLASSIC CV</h2>
      <div className="classic">
        <p style={{ marginBottom: 18 }}>
          <strong>{PLAYER.name}</strong> — {PLAYER.class}
          <br />
          {PLAYER.subtitle}
          <br />
          {PLAYER.email} · {PLAYER.phone} · {PLAYER.location}
          <br />
          <a href={PLAYER.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>{' '}
          ·{' '}
          <a href={PLAYER.classicCvUrl} target="_blank" rel="noreferrer">
            philgebhardtcv.netlify.app
          </a>
        </p>

        {[...STATIONS]
          .reverse()
          .filter((s) => !s.isFinal)
          .map((s) => (
            <div className="job" key={s.id}>
              <div className="job-title">{s.title}</div>
              <div className="job-meta">
                {s.company} · {s.location} · {s.period}
              </div>
              <ul>
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}

        <h3>LANGUAGES & INTERESTS</h3>
        <p>
          {PLAYER.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}
          <br />
          {PLAYER.interests.join(' · ')}
        </p>
      </div>
    </Page>
  );
}
