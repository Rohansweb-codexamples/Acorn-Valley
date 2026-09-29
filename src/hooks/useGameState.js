import { useState, useEffect, useCallback } from 'react';
import {
  BUILDING_TYPES,
  INITIAL_BUILDINGS,
  INITIAL_QUESTS,
  TILE_MAP,
} from '../data/gameData.js';

export function useGameState() {
  const [resources, setResources] = useState({ acorns: 483, stars: 23 });
  const [level, setLevel] = useState(7);
  const [xp, setXp] = useState(120);
  const [xpToNext, setXpToNext] = useState(200);
  const [buildings, setBuildings] = useState(INITIAL_BUILDINGS);
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [buildMode, setBuildMode] = useState(null);
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [floaters, setFloaters] = useState([]);
  const [collectCount, setCollectCount] = useState(0);

  // Production tick — check buildings every second
  useEffect(() => {
    const interval = setInterval(() => {
      setBuildings((prev) =>
        prev.map((b) => {
          if (b.ready) return b;
          const def = BUILDING_TYPES[b.type];
          const elapsed = (Date.now() - b.lastProduced) / 1000;
          if (elapsed >= def.productionRate) {
            return { ...b, ready: true };
          }
          return b;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addFloater = useCallback((text, col, row, color) => {
    const id = Date.now() + Math.random();
    setFloaters((prev) => [...prev, { id, text, col, row, color }]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 2000);
  }, []);

  const collectBuilding = useCallback(
    (buildingId) => {
      const building = buildings.find((b) => b.id === buildingId);
      if (!building || !building.ready) return;
      const def = BUILDING_TYPES[building.type];

      setResources((prev) => ({
        ...prev,
        acorns: prev.acorns + def.productionAmount,
      }));

      setXp((prev) => {
        const newXp = prev + def.xp;
        if (newXp >= xpToNext) {
          setLevel((l) => l + 1);
          setXpToNext((t) => Math.floor(t * 1.4));
          return newXp - xpToNext;
        }
        return newXp;
      });

      setBuildings((prev) =>
        prev.map((b) =>
          b.id === buildingId
            ? { ...b, ready: false, lastProduced: Date.now() }
            : b
        )
      );

      setCollectCount((c) => c + 1);
      addFloater(`+${def.productionAmount}`, building.col, building.row, '#F4B942');
    },
    [buildings, xpToNext, addFloater]
  );

  // Update quest progress when collectCount changes
  useEffect(() => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'q2' && q.status === 'active') {
          const progress = Math.min(collectCount, q.target);
          if (progress >= q.target) {
            return { ...q, progress, status: 'ready' };
          }
          return { ...q, progress };
        }
        return q;
      })
    );
  }, [collectCount]);

  const placeBuilding = useCallback(
    (col, row) => {
      if (!buildMode) return null;
      const def = BUILDING_TYPES[buildMode];
      if (resources.acorns < def.cost) return 'insufficient';

      // Check tile is grass and empty
      if (TILE_MAP[row]?.[col] !== 'G') return 'invalid';
      if (buildings.some((b) => b.col === col && b.row === row)) return 'occupied';

      setResources((prev) => ({
        ...prev,
        acorns: prev.acorns - def.cost,
      }));

      setBuildings((prev) => [
        ...prev,
        {
          id: `b${Date.now()}`,
          type: buildMode,
          col,
          row,
          lastProduced: Date.now(),
          ready: false,
        },
      ]);

      setXp((prev) => {
        const newXp = prev + def.xp;
        if (newXp >= xpToNext) {
          setLevel((l) => l + 1);
          setXpToNext((t) => Math.floor(t * 1.4));
          return newXp - xpToNext;
        }
        return newXp;
      });

      addFloater(`-${def.cost}`, col, row, '#FF6B6B');
      setBuildMode(null);
      return 'success';
    },
    [buildMode, resources.acorns, buildings, xpToNext, addFloater]
  );

  const claimQuest = useCallback(
    (questId) => {
      const quest = quests.find((q) => q.id === questId);
      if (!quest || quest.claimed || quest.status !== 'ready') return;
      setResources((prev) => ({
        acorns: prev.acorns + quest.reward.acorns,
        stars: prev.stars + quest.reward.stars,
      }));
      setQuests((prev) =>
        prev.map((q) =>
          q.id === questId ? { ...q, claimed: true, status: 'claimed' } : q
        )
      );
      addFloater(`+${quest.reward.stars}⭐ +${quest.reward.acorns}🌰`, 5, 5, '#FFD700');
    },
    [quests, addFloater]
  );

  return {
    resources,
    level,
    xp,
    xpToNext,
    buildings,
    quests,
    floaters,
    buildMode,
    showBuildMenu,
    collectBuilding,
    placeBuilding,
    claimQuest,
    setBuildMode,
    setShowBuildMenu,
  };
}
