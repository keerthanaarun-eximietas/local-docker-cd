
interface PipelineStep {
  number: string;
  title: string;
  tag: string;
  description: string;
  command: string;
}

const steps: PipelineStep[] = [
  {
    number: "01",
    title: "Check out the code",
    tag: "GitHub Actions",
    description: "The self-hosted runner gets the latest repository files.",
    command: "actions/checkout@v4",
  },
  {
    number: "02",
    title: "Build the image",
    tag: "Docker",
    description:
      "Docker packages the Flask app and its dependencies into an image.",
    command: "docker build -t local-cd-demo:latest .",
  },
  {
    number: "03",
    title: "Remove the old container",
    tag: "Replace",
    description:
      "The existing container is removed so the new version can use its name and port.",
    command: "docker rm -f local-cd-demo",
  },
  {
    number: "04",
    title: "Start the new version",
    tag: "Deploy",
    description:
      "A container runs in the background. Host port 5000 forwards to port 5000 in the container.",
    command:
      "docker run -d --name local-cd-demo --restart unless-stopped -p 5000:5000 local-cd-demo:latest",
  },
  {
    number: "05",
    title: "Verify the deployment",
    tag: "Smoke test",
    description:
      "After a short wait, the runner requests the app. A failed request makes the workflow fail.",
    command: "curl -f http://localhost:5000",
  },
];

function PipelineSteps() {
  return (
    <section className="pipeline-section" id="pipeline">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE CURRENT WORKFLOW</p>
          <h2>Five steps to deploy</h2>
        </div>

        <div className="trigger-chip">
          <span aria-hidden="true">↳</span> Trigger: push to{" "}
          <code>main</code>
        </div>
      </div>

      <ol className="pipeline">
        {steps.map((step) => (
          <li className="pipeline-step" key={step.number}>
            <span className="step-number">{step.number}</span>

            <div className="step-content">
              <div className="step-title">
                <h3>{step.title}</h3>
                <span className="step-tag">{step.tag}</span>
              </div>

              <p>{step.description}</p>

              <code className="command">{step.command}</code>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default PipelineSteps;
