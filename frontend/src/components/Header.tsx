// import "./Header.css";

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Local Docker CD home">
        <span className="brand-mark" aria-hidden="true">CD</span>
        <span>
          Local Docker <strong>CD</strong>
        </span>
      </a>

      <a
        className="github-link"
        href="https://github.com/keerthanaarun-eximietas/local-docker-cd"
        target="_blank"
        rel="noreferrer"
      >
        Repository <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default Header;