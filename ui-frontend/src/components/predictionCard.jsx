export default function PredictionCard({ predictedValue }) {
  return (
    <div className="stats shadow bg-primary text-primary-content">
      <div className="stat">
        <div className="stat-title">Objective</div>
        <div className="stat-value">{predictedValue.toFixed(2)} reps</div>
        <div className="stat-desc text-primary-content/70">
            Based on your last training
        </div>
        
      </div>
    </div>
  );
}