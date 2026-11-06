import HealthCard from "./HealthCard";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="pulse" aria-hidden="true"></span>
          YOUR DEPLOYMENT, STEP BY STEP
        </p>

        <h1>
          From a push
          <br />
          to a <span>running app.</span>
        </h1>

        <p className="intro">
          This page is served by Flask inside Docker. Follow the
          workflow below to see what happens when code is pushed
          to <code>main</code>.
        </p>

        <a className="primary-link" href="#pipeline">
          Explore the pipeline
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <HealthCard />
    </section>
  );
}

export default Hero;