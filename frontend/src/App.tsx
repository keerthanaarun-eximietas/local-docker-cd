
import Header from "./components/Header";
import Hero from "./components/Hero";
import PipelineSteps from "./components/PipelineSteps";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <PipelineSteps />

        <section className="scope-note" aria-labelledby="scope-title">
          <span className="scope-icon" aria-hidden="true">
            i
          </span>

          <div>
            <h2 id="scope-title">
              What this pipeline does—and doesn’t do
            </h2>

            <p>
              It deploys to the machine running your self-hosted Actions
              runner. It does not currently run a test suite, publish an
              image to a registry, deploy to a cloud provider, or roll
              back automatically if the new container fails. The Actions
              tab shows the result of each workflow run.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
