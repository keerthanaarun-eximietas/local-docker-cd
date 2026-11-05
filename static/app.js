const statusMessage = document.querySelector("#health-status");
const statusDot = document.querySelector("#status-dot");
const checkButton = document.querySelector("#check-health");

async function checkHealth() {
  checkButton.disabled = true;
  statusDot.className = "status-dot checking";
  statusMessage.textContent = "Checking the Flask health endpoint…";

  try {
    const response = await fetch("/health", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Health check returned HTTP ${response.status}`);
    }

    const health = await response.json();
    if (health.status !== "ok") {
      throw new Error("The app reported an unhealthy status");
    }

    statusDot.className = "status-dot healthy";
    statusMessage.textContent = `${health.service} is responding.`;
  } catch (error) {
    statusDot.className = "status-dot unhealthy";
    statusMessage.textContent = "The app health check failed. Check the container logs.";
  } finally {
    checkButton.disabled = false;
  }
}

checkButton.addEventListener("click", checkHealth);
checkHealth();
