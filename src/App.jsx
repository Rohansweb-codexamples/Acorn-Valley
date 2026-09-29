import { useGameState } from './hooks/useGameState.js';
import GameBoard from './components/GameBoard.jsx';
import TopBar from './components/TopBar.jsx';
import QuestPanel from './components/QuestPanel.jsx';
import BottomControls from './components/BottomControls.jsx';
import BuildMenu from './components/BuildMenu.jsx';
import './App.css';

export default function App() {
  const game = useGameState();

  return (
    <div className="app">
      <GameBoard
        buildings={game.buildings}
        floaters={game.floaters}
        buildMode={game.buildMode}
        onTileClick={game.placeBuilding}
        onBuildingClick={game.collectBuilding}
      />
      <TopBar
        acorns={game.resources.acorns}
        stars={game.resources.stars}
        level={game.level}
        xp={game.xp}
        xpToNext={game.xpToNext}
      />
      <QuestPanel quests={game.quests} onClaim={game.claimQuest} />
      <BottomControls onBuildClick={() => game.setShowBuildMenu(true)} />
      {game.showBuildMenu && (
        <BuildMenu
          acorns={game.resources.acorns}
          onSelect={(type) => {
            game.setBuildMode(type);
            game.setShowBuildMenu(false);
          }}
          onClose={() => game.setShowBuildMenu(false)}
        />
      )}
      {game.buildMode && (
        <div className="build-mode-banner">
          Tap a grass tile to place your {game.buildMode === 'bakery' ? 'Acorn Bakery' : game.buildMode === 'windmill' ? 'Golden Mill' : 'Sheep Cottage'}
          <button className="cancel-build" onClick={() => game.setBuildMode(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
