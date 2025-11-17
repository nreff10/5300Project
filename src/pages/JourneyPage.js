import React, { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Type the URL (Application layer)",
    layer: "Application (HTTPS)",
    text: [
      "You enter https://example.com and click “Log in.”",
      "The browser builds an HTTP request that will eventually carry your username and password.",
      "At this point, the login form exists only inside your browser — nothing has gone on the wire.",
    ],
  },
  {
    id: 2,
    title: "Find the server (DNS lookup)",
    layer: "DNS + Internet (IP)",
    text: [
      "The browser asks DNS to translate example.com into an IP address.",
      "DNS replies with the address of the web server.",
      "We’re still not sending your credentials — just looking up where to go.",
    ],
  },
  {
    id: 3,
    title: "Open a TCP connection",
    layer: "Transport (TCP)",
    text: [
      "Your device and the server perform the TCP 3-way handshake to set up a reliable connection.",
      "They agree on sequence numbers so that packets can be ordered and retransmitted if lost.",
      "The TCP connection is like a reliable pipe, but not encrypted yet.",
    ],
  },
  {
    id: 4,
    title: "Negotiate TLS (secure tunnel)",
    layer: "TLS over TCP",
    text: [
      "Over that TCP pipe, the browser and server perform the TLS 1.3 handshake.",
      "The server proves its identity with a certificate; both sides agree on fresh keys.",
      "After this finishes successfully, they have an encrypted tunnel ready to use.",
    ],
  },
  {
    id: 5,
    title: "Send the login (encrypted HTTP)",
    layer: "Encrypted HTTP (HTTPS)",
    text: [
      "Only now does the browser actually send your username and password.",
      "The login travels as encrypted HTTPS data. Devices on the path can see that traffic exists, but not what it says.",
      "The server decrypts it and checks your credentials.",
    ],
  },
];

const journeyQuestions = [
  {
    prompt:
      "In which step does your password first leave your computer and travel across the network?",
    options: [
      "Step 1 – typing the URL",
      "Step 2 – DNS lookup",
      "Step 3 – TCP handshake",
      "Step 4 – TLS negotiation",
      "Step 5 – encrypted HTTP login",
    ],
    correctIndex: 4,
    explanationCorrect:
      "Your password only goes on the wire in Step 5, after TLS has created the encrypted tunnel.",
    explanationIncorrect:
      "Earlier steps are about preparing the request, looking up the server, or setting up TCP/TLS. The password isn’t sent until the encrypted HTTPS request in Step 5.",
  },
  {
    prompt:
      "Which layer’s main job is to use IP addresses to get packets between devices across the Internet?",
    options: [
      "Application layer",
      "Transport layer (TCP)",
      "Internet layer (IP)",
      "Link layer (Wi-Fi / Ethernet)",
    ],
    correctIndex: 2,
    explanationCorrect:
      "The Internet layer (IP) is responsible for addressing and routing packets between networks.",
    explanationIncorrect:
      "The Internet layer (IP) is the one that cares about IP addresses and routing. The other layers focus on apps, reliability, or the local link.",
  },
  {
    prompt:
      "Why does the browser bother to do a TLS handshake before sending your login information?",
    options: [
      "To make the page load prettier fonts",
      "To build an encrypted tunnel and verify the server’s identity first",
      "To speed up the Wi-Fi connection",
      "To compress your password and make it smaller",
    ],
    correctIndex: 1,
    explanationCorrect:
      "TLS creates an encrypted tunnel and checks the server’s identity so your login is protected in transit.",
    explanationIncorrect:
      "The goal of TLS is to create an encrypted, authenticated tunnel. Things like fonts, Wi-Fi speed, or compression are not the main purpose.",
  },
];

function JourneyPage() {
  const [activeId, setActiveId] = useState(1);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [nextWarning, setNextWarning] = useState("");

  const active = steps.find((s) => s.id === activeId);
  const currentQ = journeyQuestions[currentQIndex];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setNextWarning("");

    const correct = selectedOption === currentQ.correctIndex;
    if (correct) {
      setFeedback("✅ " + currentQ.explanationCorrect);
      if (currentQIndex + 1 < journeyQuestions.length) {
        setUnlockedCount(Math.max(unlockedCount, currentQIndex + 2));
      }
    } else {
      setFeedback("❌ " + currentQ.explanationIncorrect);
    }
  };

  const goPrev = () => {
    if (currentQIndex === 0) return;
    setCurrentQIndex((idx) => idx - 1);
    setSelectedOption(null);
    setFeedback("");
    setNextWarning("");
  };

  const goNext = () => {
    const lastIndex = journeyQuestions.length - 1;
    if (currentQIndex === lastIndex) return;

    if (currentQIndex >= unlockedCount - 1) {
      setNextWarning("complete the question before moving on");
      return;
    }

    setCurrentQIndex((idx) => idx + 1);
    setSelectedOption(null);
    setFeedback("");
    setNextWarning("");
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Login Journey</h1>
        <p>
          See where your password travels when you click “Log in,” which layers
          touch it along the way, and when HTTPS actually starts protecting it.
        </p>
      </header>

      <section className="module-hero">
        <div className="module-hero-layout">
          <div className="module-hero-left">
            <div className="module-hero-tag">Module 1 • Login Journey</div>
            <h2>Follow your login down the TCP/IP stack</h2>
            <p>
              This module zooms in on a single everyday action: typing a
              password into a login form. You’ll see how that login is turned
              into packets, which layers touch it, and at which point it’s
              actually protected by HTTPS.
            </p>
            <ul className="module-hero-list">
              <li>
                Trace your login from browser → Wi-Fi → Internet → website.
              </li>
              <li>
                Connect each step to a layer name (Application, TCP, IP, Link).
              </li>
              <li>
                Decide who can see your password before and after TLS is set up.
              </li>
            </ul>
          </div>

          <div className="module-hero-right">
            <div className="path-diagram">
              <div className="diagram-node">
                <div className="diagram-node-label">🧑‍💻 Browser</div>
                <div className="diagram-node-caption">
                  You type <code>https://…</code> and click “Log in.”
                </div>
              </div>
              <div className="diagram-arrow">▼</div>
              <div className="diagram-node">
                <div className="diagram-node-label">
                  📶 Wi-Fi / local network
                </div>
                <div className="diagram-node-caption">
                  Packets hop onto your home / campus network.
                </div>
              </div>
              <div className="diagram-arrow">▼</div>
              <div className="diagram-node">
                <div className="diagram-node-label">🌐 Internet routers</div>
                <div className="diagram-node-caption">
                  IP addresses guide packets across the Internet.
                </div>
              </div>
              <div className="diagram-arrow">▼</div>
              <div className="diagram-node diagram-node-final">
                <div className="diagram-node-label">🏢 Website server</div>
                <div className="diagram-node-caption">
                  After TLS is in place, it sees your login in plaintext.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Step-by-step view</h2>
        <p className="panel-subtitle">
          Click a step to see what the browser is doing, which layer you’re in,
          and who can see what at that moment.
        </p>
        <div className="panel-body panel-body-split">
          <div className="step-list">
            {steps.map((step) => (
              <button
                key={step.id}
                className={`step ${
                  step.id === activeId ? "step-active" : ""
                }`}
                onClick={() => setActiveId(step.id)}
              >
                <span className="step-number">{step.id}</span>
                <div className="step-text">
                  <div className="step-title">{step.title}</div>
                  <div className="step-layer">{step.layer}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="step-detail">
            <h3>{active.title}</h3>
            {active.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <div className="chip-row">
              <span className="chip">Layer: {active.layer}</span>
              {active.id < 4 ? (
                <span className="chip chip-warning">
                  Login data: <strong>not sent yet</strong>
                </span>
              ) : active.id === 4 ? (
                <span className="chip chip-warning">
                  Login data: <strong>still waiting</strong> – secure tunnel
                  first.
                </span>
              ) : (
                <span className="chip chip-safe">
                  Login data: <strong>encrypted in transit</strong>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="panel quiz-panel">
        <div className="quiz-header-line">
          <h2>Check your understanding</h2>
          <div className="quiz-progress">
            Question {currentQIndex + 1} of {journeyQuestions.length}
          </div>
        </div>
        <p className="panel-subtitle">
          Answer each question. Getting one right unlocks the next.
        </p>

        <p>{currentQ.prompt}</p>
        <div className="quiz-options">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              className={`quiz-option ${
                idx === selectedOption ? "quiz-option-active" : ""
              }`}
              onClick={() => setSelectedOption(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
        <button className="btn small" onClick={handleCheckAnswer}>
          Check my answer
        </button>
        {feedback && <p className="quiz-feedback">{feedback}</p>}
        {nextWarning && <p className="quiz-warning">{nextWarning}</p>}

        <div className="quiz-nav">
          <div className="quiz-progress">
            Unlocked: {unlockedCount} / {journeyQuestions.length} questions
          </div>
          <div className="quiz-nav-buttons">
            <button
              className="btn small"
              onClick={goPrev}
              disabled={currentQIndex === 0}
            >
              ◀ Previous
            </button>
            <button
              className="btn small"
              onClick={goNext}
              disabled={currentQIndex === journeyQuestions.length - 1}
            >
              Next ▶
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default JourneyPage;
