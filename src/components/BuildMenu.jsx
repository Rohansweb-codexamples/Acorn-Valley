import { BUILDING_TYPES } from '../data/gameData.js';
import './BuildMenu.css';

export default function BuildMenu({ acorns, onSelect, onClose }) {
  const entries = Object.entries(BUILDING_TYPES);

  return (
    <div className="build-menu-overlay" onClick={onClose}>
      <div className="build-menu" onClick={(e) => e.stopPropagation()}>
        <div className="build-menu-header">
          <h2>Build &amp; Shop</h2>
          <button className="build-menu-close" onClick={onClose}>✕</button>
        </div>
        <div className="build-menu-acorns">
          <span className="icon-acorn" /> {acorns} acorns available
        </div>
        <div className="build-menu-grid">
          {entries.map(([key, def]) => {
            const affordable = acorns >= def.cost;
            return (
              <button
                key={key}
                className={`build-card ${affordable ? '' : 'build-card-disabled'}`}
                onClick={() => affordable && onSelect(key)}
                disabled={!affordable}
              >
                <div className="build-card-image">
                  <img src={def.image} alt={def.name} draggable={false} />
                </div>
                <div className="build-card-info">
                  <div className="build-card-name">{def.name}</div>
                  <div className="build-card-desc">{def.description}</div>
                  <div className="build-card-cost">
                    <span className="icon-acorn" /> {def.cost}
                  </div>
                  <div className="build-card-prod">
                    Produces {def.productionAmount} acorns / {def.productionRate}s
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
