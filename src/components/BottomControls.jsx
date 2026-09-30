import './BottomControls.css';

export default function BottomControls({ onBuildClick }) {
  return (
    <div className="bottom-controls">
      <div className="control-pill">
        <button className="control-btn control-btn-main" onClick={onBuildClick}>
          BUILD &amp; SHOP
        </button>
      </div>
    </div>
  );
}
