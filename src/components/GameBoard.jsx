import { useMemo } from 'react';
import {
  TILE_MAP,
  TILE_COLORS,
  TILE_W,
  TILE_H,
  GRID_SIZE,
  tileToScreen,
  INITIAL_CHARACTERS,
  DECORATIONS,
  BUILDING_TYPES,
} from '../data/gameData.js';
import './GameBoard.css';

export default function GameBoard({
  buildings,
  floaters,
  buildMode,
  onTileClick,
  onBuildingClick,
}) {
  const tiles = useMemo(() => {
    const list = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const type = TILE_MAP[row][col];
        const { x, y } = tileToScreen(col, row);
        list.push({ col, row, type, x, y, key: `${col}-${row}` });
      }
    }
    return list;
  }, []);

  return (
    <div className="game-board">
      <div className="board-inner">
        {/* Tiles */}
        {tiles.map((tile) => {
          const colors = TILE_COLORS[tile.type] || TILE_COLORS.G;
          const canBuild =
            buildMode &&
            tile.type === 'G' &&
            !buildings.some((b) => b.col === tile.col && b.row === tile.row);
          return (
            <div
              key={tile.key}
              className={`tile tile-${tile.type.toLowerCase()} ${canBuild ? 'tile-buildable' : ''}`}
              style={{
                left: `calc(50% + ${tile.x}px)`,
                top: `calc(50% + ${tile.y}px)`,
                zIndex: tile.col + tile.row,
                '--tile-top': colors.top,
                '--tile-bottom': colors.bottom,
                '--tile-edge': colors.edge,
              }}
              onClick={
                buildMode ? () => onTileClick(tile.col, tile.row) : undefined
              }
            />
          );
        })}

        {/* Decorations */}
        {DECORATIONS.map((deco, i) => {
          const { x, y } = tileToScreen(deco.col, deco.row);
          return (
            <div
              key={`deco-${i}`}
              className="deco"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y + TILE_H / 2}px)`,
                fontSize: `${deco.size}px`,
                zIndex: (deco.col + deco.row) * 10 + 1,
              }}
            >
              {deco.emoji}
            </div>
          );
        })}

        {/* Buildings */}
        {buildings.map((building) => {
          const def = BUILDING_TYPES[building.type];
          const { x, y } = tileToScreen(building.col, building.row);
          return (
            <div
              key={building.id}
              className={`building ${building.ready ? 'building-ready' : ''}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y + TILE_H / 2}px)`,
                zIndex: (building.col + building.row) * 10 + 5,
              }}
              onClick={() => onBuildingClick(building.id)}
            >
              <img src={def.image} alt={def.name} draggable={false} />
              {building.ready && (
                <div className="ready-indicator">
                  <span className="ready-icon">🌰</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Characters */}
        {INITIAL_CHARACTERS.map((char) => {
          const { x, y } = tileToScreen(char.col, char.row);
          return (
            <div
              key={char.id}
              className={`character char-${char.type}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y + TILE_H / 2}px)`,
                width: `${char.size}px`,
                height: `${char.size}px`,
                zIndex: (char.col + char.row) * 10 + 8,
              }}
            >
              <img src={char.image} alt={char.type} draggable={false} />
            </div>
          );
        })}

        {/* Floaters (collection animations) */}
        {floaters.map((f) => {
          const { x, y } = tileToScreen(f.col, f.row);
          return (
            <div
              key={f.id}
              className="floater"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                color: f.color,
                zIndex: 9999,
              }}
            >
              {f.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
