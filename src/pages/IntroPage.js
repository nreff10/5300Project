import React from "react";
import { Link } from "react-router-dom";

function IntroPage() {
  return (
    <section className="page">
      {/* HERO SECTION */}
      <section className="hero-layout">
        <div className="hero-text intro">
          <div className="hero-badge">
            <span className="hero-dot" />
            Student-friendly walkthrough of HTTPS logins
          </div>

          <h1>
            What really happens when you{" "}
            <span className="highlight">log in to a website?</span>
          </h1>

          <p>
            When you open a site like <code>https://school-portal.com</code> and
            log in, it feels simple: type your username and password, click “Log
            in,” and wait a second. This website breaks that moment into four
            short modules you can explore at your own pace.
          </p>

          <div className="hero-buttons">
            <Link className="btn primary" to="/journey">
              Start with the Login Journey
            </Link>
            <Link className="btn ghost" to="/handshake">
              Jump to TLS Handshake
            </Link>
          </div>
        </div>

        {/* visual */}
        <div className="hero-visual">
          <div className="hero-glow" />
          <div className="hero-card hero-card-top">
            <div className="hero-card-icon">🌐</div>
            <div className="hero-card-title">Login request</div>
            <div className="hero-card-caption">
              Browser builds a message with your username and password.
            </div>
          </div>
          <div className="hero-card hero-card-middle">
            <div className="hero-card-icon">🧊</div>
            <div className="hero-card-title">TLS tunnel</div>
            <div className="hero-card-caption">
              Keys are agreed and traffic is wrapped in encryption.
            </div>
          </div>
          <div className="hero-card hero-card-bottom">
            <div className="hero-card-icon">🔐</div>
            <div className="hero-card-title">Secure session</div>
            <div className="hero-card-caption">
              The server checks your login over a private connection.
            </div>
          </div>
        </div>
      </section>

      {/* BACKGROUND SECTION */}
      <section className="panel background-panel">
        <div className="background-header-row">
          <div>
            <h2>Background: What’s going on behind that “Log in” button?</h2>
            <p className="panel-subtitle">
              No prior networking knowledge needed. Skim this section once, then
              use the modules to deepen each idea.
            </p>
          </div>
          <div className="background-tag-row">
            <span className="background-pill">TCP/IP layers</span>
            <span className="background-pill">HTTPS / TLS</span>
            <span className="background-pill">Authentication &amp; MFA</span>
          </div>
        </div>

        <div className="background-columns">
          {/* left column */}
          <div className="background-column">
            <div className="background-block">
              <h3>1. Your login is just a message</h3>
              <p>
                When you click <strong>“Log in”</strong>, your browser creates a
                message that says something like: “Here is this student’s name
                and password, please check them.” On its own this is just text,
                like a note you could write on a piece of paper.
              </p>
              <p>
                To send that note across the Internet, computers follow sets of
                rules called <strong>protocols</strong>. They describe how to
                cut the message into pieces, number those pieces, send them, and
                put them back together.
              </p>
            </div>

            <div className="background-block">
              <h3>2. Layers = envelopes around the message</h3>
              <p>
                Before the login leaves your computer, it gets wrapped in
                several “envelopes.” Each layer adds its own info:
              </p>
              <ul className="background-list">
                <li>
                  <strong>Application layer</strong>: “This is a website login
                  for school-portal.com.”
                </li>
                <li>
                  <strong>Transport layer (TCP)</strong>: “Deliver these pieces
                  in order, and resend if any are lost.”
                </li>
                <li>
                  <strong>Internet layer (IP)</strong>: “Send this to this
                  server address.”
                </li>
                <li>
                  <strong>Link layer (Wi-Fi / cable)</strong>: “Turn bits into
                  radio waves or electrical signals on this local network.”
                </li>
              </ul>
              <p>
                Together these layers are often called the{" "}
                <strong>TCP/IP model</strong>.
              </p>
            </div>

            <div className="background-block">
              <h3>3. Why we need HTTPS / TLS</h3>
              <p>
                By default, those envelopes are not secret. A person on the same
                Wi-Fi, or somewhere along the path, could read what’s inside —
                including your password.
              </p>
              <p>
                <strong>HTTPS</strong> solves that by adding an extra security
                layer called <strong>TLS</strong>. TLS builds an encrypted
                “tunnel” between your browser and the website so outsiders see
                scrambled data instead of your real login.
              </p>
            </div>

            <div className="background-block">
              <h3>4. Proving it’s really you: authentication</h3>
              <p>
                Even with a secure tunnel, the website needs to know who you
                are. That process is called <strong>authentication</strong>.
              </p>
              <p>
                The simplest version is a password (something you know). Modern
                sites often add extra steps like texted codes, app codes, or
                security keys — called{" "}
                <strong>multi-factor authentication (MFA)</strong>. Some MFA
                methods are easy to trick out of people; others (like security
                keys) are built to resist phishing.
              </p>
            </div>
          </div>

          {/* right column */}
          <div className="background-column background-visual">
            <div className="background-card">
              <h4>TCP/IP “envelope” stack</h4>
              <p className="background-card-subtitle">
                The same login, seen at different layers.
              </p>
              <div className="layer-stack">
                <div className="layer-box">
                  <div className="layer-title">Website &amp; Apps</div>
                  <div className="layer-caption">
                    Login form, username, password, “Log in” button.
                  </div>
                </div>
                <div className="layer-box">
                  <div className="layer-title">Reliable Conversation (TCP)</div>
                  <div className="layer-caption">
                    Makes sure packets arrive and are re-ordered correctly.
                  </div>
                </div>
                <div className="layer-box">
                  <div className="layer-title">Internet Addresses (IP)</div>
                  <div className="layer-caption">
                    Uses IP addresses to reach the correct server.
                  </div>
                </div>
                <div className="layer-box">
                  <div className="layer-title">Wi-Fi / Cable</div>
                  <div className="layer-caption">
                    Turns bits into radio waves or signals on a wire.
                  </div>
                </div>
              </div>
            </div>

            <div className="background-card">
              <h4>HTTPS tunnel</h4>
              <p className="background-card-subtitle">
                What changes when you add the “S” in HTTPS.
              </p>
              <div className="tunnel-card">
                <p>
                  TLS wraps your login in a protective “tube” between your
                  browser and the real site. People on the path can see that{" "}
                  <em>something</em> is being sent, but not the contents.
                </p>
                <div className="tunnel-legend">
                  <span className="legend-dot legend-plain" />
                  <span>Plain HTTP: easy to read</span>
                </div>
                <div className="tunnel-legend">
                  <span className="legend-dot legend-encrypted" />
                  <span>HTTPS/TLS: scrambled to outsiders</span>
                </div>
              </div>
            </div>

            <div className="background-card">
              <h4>Authentication examples</h4>
              <p className="background-card-subtitle">
                All of these can sit on top of HTTPS.
              </p>
              <div className="mfa-strip">
                <div className="mfa-badges">
                  <span className="mfa-badge">Password only</span>
                  <span className="mfa-badge">Password + SMS code</span>
                  <span className="mfa-badge">Password + app code</span>
                  <span className="mfa-badge mfa-strong">
                    Password + security key
                  </span>
                </div>
                <p className="mfa-note">
                  Different methods give different levels of protection. The MFA
                  module lets you compare them in real scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE CARDS */}
      <section className="panel panel-intro-grid">
        <ModuleCard
          title="Login Journey"
          slug="/journey"
          description="Follow a login request down through the TCP/IP layers and decide who can see what at each step."
        />
        <ModuleCard
          title="TLS 1.3 Handshake"
          slug="/handshake"
          description="Animate how the secure tunnel is set up before your password ever leaves the browser."
        />
        <ModuleCard
          title="Padlock Myths"
          slug="/padlock"
          description="Inspect browser padlocks and domains, then choose which sites you’d actually trust with a login."
        />
        <ModuleCard
          title="MFA Choices"
          slug="/mfa"
          description="Compare login methods and see which ones really help against phishing in different situations."
        />
      </section>
    </section>
  );
}

function ModuleCard({ title, description, slug }) {
  return (
    <article className="card intro-card">
      <h2>{title}</h2>
      <p className="muted">{description}</p>
      <Link className="btn small" to={slug}>
        Open module
      </Link>
    </article>
  );
}

export default IntroPage;
