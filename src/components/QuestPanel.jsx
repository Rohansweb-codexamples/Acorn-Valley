import './QuestPanel.css';

export default function QuestPanel({ quests, onClaim }) {
  const visibleQuests = quests.filter((q) => !q.claimed);

  if (visibleQuests.length === 0) return null;

  return (
    <div className="quest-panel">
      {visibleQuests.map((quest) => (
        <div key={quest.id} className="quest-card">
          <div className="quest-avatar">
            <img src={quest.character} alt={quest.characterName} draggable={false} />
          </div>
          <div className="quest-content">
            <div className="quest-title">{quest.title}</div>
            <div className="quest-task">{quest.task}</div>
            {quest.status === 'active' && quest.target && (
              <div className="quest-progress">
                <div className="quest-progress-bar">
                  <div
                    className="quest-progress-fill"
                    style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  />
                </div>
                <span className="quest-progress-text">
                  {quest.progress}/{quest.target}
                </span>
              </div>
            )}
          </div>
          {quest.status === 'ready' && (
            <button
              className="quest-claim"
              onClick={() => onClaim(quest.id)}
            >
              <span className="quest-claim-check">✓</span>
              <span className="quest-claim-text">Ready!</span>
            </button>
          )}
          {quest.status === 'active' && (
            <div className="quest-reward-preview">
              🌰{quest.reward.acorns} ⭐{quest.reward.stars}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
