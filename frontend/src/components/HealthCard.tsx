import { useCallback, useEffect, useState } from "react";

type HealthStatus = "checking" | "healthy" | "unhealthy";

interface HealthResponse {
  status: string;
  service: string;
}

function HealthCard() {
  const [status, setStatus] = useState<HealthStatus>("checking");
  const [message, setMessage] = useState(
    "Checking the Flask health endpoint..."
  );
  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsChecking(true);
    setStatus("checking");
    setMessage("Checking the Flask health endpoint...");

    try {
      const response = await fetch("/health", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Health check returned HTTP ${response.status}`);
      }

      const health: HealthResponse = await response.json();

      if (health.status !== "ok") {
        throw new Error("The app reported an unhealthy status");
      }

      setStatus("healthy");
      setMessage(`${health.service} is responding.`);
    } catch {
      setStatus("unhealthy");
      setMessage(
        "The app health check failed. Check the container logs."
      );
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    void checkHealth();
  }, [checkHealth]);

  return (
    <aside className="runtime-card" aria-labelledby="runtime-title">
      <div className="card-heading">
        <div>
          <p className="card-label">APPLICATION HEALTH</p>
          <h2 id="runtime-title">Is the app responding?</h2>
        </div>

        <span
          className={`status-dot ${status}`}
          aria-hidden="true"
        />
      </div>

      <p className="health-status" role="status" aria-live="polite">
        {message}
      </p>

      <div className="runtime-details">
        <div>
          <span>Health endpoint</span>
          <code>GET /health</code>
        </div>

        <div>
          <span>Container port</span>
          <code>5000</code>
        </div>
      </div>

      <button
        className="check-button"
        type="button"
        onClick={() => void checkHealth()}
        disabled={isChecking}
      >
        Check again <span aria-hidden="true">↻</span>
      </button>

      <p className="health-note">
        This checks the app only. Workflow success is shown in GitHub Actions.
      </p>
    </aside>
  );
}

export default HealthCard;