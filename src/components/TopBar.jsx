import './TopBar.css';

export default function TopBar({ acorns, stars, level, xp, xpToNext }) {
  const xpPct = Math.min((xp / xpToNext) * 100, 100);

  return (
    <div className="top-bar">
      <div className="top-left">
        <div className="level-badge">{level}</div>
        <div className="town-info">
          <div className="town-label">TOWN LEVEL {level}</div>
          <div className="town-name">Acorn Valley</div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
      </div>
      <div className="top-right">
        <div className="resource">
          <span className="resource-icon">🌰</span>
          <span className="resource-value">{acorns}</span>
        </div>
        <div className="resource">
          <span className="resource-icon">⭐</span>
          <span className="resource-value">{stars}</span>
        </div>
      </div>
    </div>
  );
}
