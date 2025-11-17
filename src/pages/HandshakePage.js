import React, { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Client hello",
    simple:
      "The browser says “hi,” offers TLS versions and cipher suites, and sends random data to help build keys later.",
    technical:
      "ClientHello carries the TLS version, a random nonce, supported cipher suites, extensions (like SNI, ALPN), and key share parameters for ephemeral key exchange.",
  },
  {
    id: 2,
    title: "Server hello + certificate",
    simple:
      "The server picks options, sends its certificate, and proves which domain it claims to be.",
    technical:
      "ServerHello picks a cipher suite and key share. The server then sends its X.509 certificate chain and extensions so the client can validate the domain and trust path.",
  },
  {
    id: 3,
    title: "Key agreement",
    simple:
      "Browser and server combine their key material to agree on a shared secret. The secret never travels on the wire.",
    technical:
      "Using ECDHE or a similar scheme, both sides compute a shared secret, which feeds into the TLS 1.3 key schedule to derive traffic keys with forward secrecy.",
  },
  {
    id: 4,
    title: "Finished messages",
    simple:
      "Both sides send short messages that prove they derived the same keys from everything so far.",
    technical:
      "ClientFinished and ServerFinished are MACed over the handshake transcript with the derived keys. If either check fails, the handshake is aborted.",
  },
  {
    id: 5,
    title: "Encrypted application data",
    simple:
      "The tunnel is live. Your login form and other HTTP data now travel inside encrypted TLS records.",
    technical:
      "HTTP requests and responses are fragmented into TLS records and protected with AEAD (e.g., AES-GCM or ChaCha20-Poly1305) using the application traffic keys.",
  },
];

const handshakeQuestions = [
  {
    prompt: "What is the main goal of the TLS handshake?",
    options: [
      "To speed up your Wi-Fi connection",
      "To pick nicer fonts for the website",
      "To agree on encryption keys and verify the server before sending sensitive data",
      "To compress images so they download faster",
    ],
    correctIndex: 2,
    explanationCorrect:
      "The handshake sets up shared keys and authenticates the server, so later data (like logins) can be sent securely.",
    explanationIncorrect:
      "The key purpose of the handshake is to agree on encryption keys and verify the server’s identity, not fonts, Wi-Fi speed, or image compression.",
  },
  {
    prompt:
      "Which part of the handshake lets the browser check that it’s really talking to the right website?",
    options: [
      "The random numbers",
      "The server’s certificate",
      "The Finished messages",
      "The encrypted application data",
    ],
    correctIndex: 1,
    explanationCorrect:
      "The server’s certificate contains the domain name and a signature from a trusted authority, letting the browser verify who it’s talking to.",
    explanationIncorrect:
      "The browser uses the server’s certificate (plus trusted certificate authorities) to verify the site’s identity.",
  },
  {
    prompt:
      "If the TLS handshake completes successfully and you’re on the real site, who can read your password as it crosses the network?",
    options: [
      "Anyone on the same Wi-Fi",
      "Only your browser and the website’s server",
      "Your ISP and anyone in between",
      "Every router on the path",
    ],
    correctIndex: 1,
    explanationCorrect:
      "With a proper TLS tunnel, the password is encrypted in transit. Only your browser and the destination server can see it in plaintext.",
    explanationIncorrect:
      "With HTTPS/TLS, devices on the path can see that traffic exists but not the contents of your password; it’s only readable at your browser and the destination server.",
  },
];

function HandshakePage() {
  const [phaseId, setPhaseId] = useState(1);
  const [technicalMode, setTechnicalMode] = useState(false);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackQuiz, setFeedbackQuiz] = useState("");
  const [nextWarning, setNextWarning] = useState("");

  const phase = phases.find((p) => p.id === phaseId);
  const currentQ = handshakeQuestions[currentQIndex];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setNextWarning("");

    const correct = selectedOption === currentQ.correctIndex;
    if (correct) {
      setFeedbackQuiz("✅ " + currentQ.explanationCorrect);
      if (currentQIndex + 1 < handshakeQuestions.length) {
        setUnlockedCount(Math.max(unlockedCount, currentQIndex + 2));
      }
    } else {
      setFeedbackQuiz("❌ " + currentQ.explanationIncorrect);
    }
  };

  const goPrev = () => {
    if (currentQIndex === 0) return;
    setCurrentQIndex((idx) => idx - 1);
    setSelectedOption(null);
    setFeedbackQuiz("");
    setNextWarning("");
  };

  const goNext = () => {
    const lastIndex = handshakeQuestions.length - 1;
    if (currentQIndex === lastIndex) return;

    if (currentQIndex >= unlockedCount - 1) {
      setNextWarning("complete the question before moving on");
      return;
    }

    setCurrentQIndex((idx) => idx + 1);
    setSelectedOption(null);
    setFeedbackQuiz("");
    setNextWarning("");
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>TLS Handshake</h1>
        <p>
          See how your browser and a website quietly build an encrypted tunnel
          before any password is sent, and how certificates help you avoid
          impostor sites.
        </p>
      </header>

      <section className="module-hero">
        <div className="module-hero-layout">
          <div className="module-hero-left">
            <div className="module-hero-tag">Module 2 • TLS Handshake</div>
            <h2>Build the HTTPS tunnel step by step</h2>
            <p>
              In the previous module you saw where your login travels. Here you
              zoom in on the moment just before that: the TLS 1.3 handshake. It
              looks like “nothing is happening,” but under the hood your browser
              is picking algorithms, checking certificates, and negotiating
              fresh keys.
            </p>
            <ul className="module-hero-list">
              <li>
                See how ClientHello and ServerHello start the conversation.
              </li>
              <li>
                Connect certificates to the padlock and the site’s real domain.
              </li>
              <li>
                Understand when the tunnel is ready and why your login waits
                until that point.
              </li>
            </ul>
          </div>

          <div className="module-hero-right">
            <div className="handshake-flow">
              <div className="handshake-flow-row">
                <div className="handshake-endpoint">
                  <div className="handshake-endpoint-icon">🧑‍💻</div>
                  <div className="handshake-endpoint-label">Browser</div>
                </div>
                <div className="handshake-lock">
                  <span className="handshake-lock-icon">🔓</span>
                  <span className="handshake-lock-label">Before handshake</span>
                </div>
                <div className="handshake-endpoint">
                  <div className="handshake-endpoint-icon">🏢</div>
                  <div className="handshake-endpoint-label">Server</div>
                </div>
              </div>

              <div className="handshake-flow-steps">
                <span className="handshake-badge">
                  1. ClientHello ➝ capabilities
                </span>
                <span className="handshake-badge">
                  2. ServerHello + cert ➝ identity
                </span>
                <span className="handshake-badge">
                  3. Keys + Finished ➝ shared secret
                </span>
              </div>

              <div className="handshake-flow-row handshake-flow-row-final">
                <div className="handshake-endpoint">
                  <div className="handshake-endpoint-icon">🧑‍💻</div>
                  <div className="handshake-endpoint-label">Browser</div>
                </div>
                <div className="handshake-lock handshake-lock-secure">
                  <span className="handshake-lock-icon">🔐</span>
                  <span className="handshake-lock-label">After handshake</span>
                </div>
                <div className="handshake-endpoint">
                  <div className="handshake-endpoint-icon">🏢</div>
                  <div className="handshake-endpoint-label">Server</div>
                </div>
              </div>

              <p className="handshake-flow-note">
                Only after the lock is “closed” does your browser send the login
                inside encrypted HTTPS records.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header-row">
          <h2>Handshake timeline</h2>
          <label className="toggle">
            <input
              type="checkbox"
              checked={technicalMode}
              onChange={() => setTechnicalMode((v) => !v)}
            />
            <span className="toggle-label">
              {technicalMode ? "Technical" : "Student-friendly"} view
            </span>
          </label>
        </div>
        <p className="panel-subtitle">
          Move through the phases to see what each side sends and why it
          matters. In student mode you get plain language; technical mode shows
          the protocol view.
        </p>

        <div className="handshake-timeline">
          {phases.map((p) => (
            <button
              key={p.id}
              className={`bubble ${p.id === phaseId ? "bubble-active" : ""}`}
              onClick={() => setPhaseId(p.id)}
            >
              {p.id}
            </button>
          ))}
        </div>

        <div className="handshake-detail">
          <h3>
            {phase.id}. {phase.title}
          </h3>
          <p>{technicalMode ? phase.technical : phase.simple}</p>
          <p className="note">
            Your password does <strong>not</strong> appear until the final
            phase: encrypted application data. The whole point of the handshake
            is to get good keys and verify the server before sending anything
            sensitive.
          </p>
        </div>
      </section>

      <section className="panel quiz-panel">
        <div className="quiz-header-line">
          <h2>Check your understanding</h2>
          <div className="quiz-progress">
            Question {currentQIndex + 1} of {handshakeQuestions.length}
          </div>
        </div>
        <p className="panel-subtitle">
          Answer each question about what the handshake is doing and why it
          happens before your login is sent.
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
        {feedbackQuiz && <p className="quiz-feedback">{feedbackQuiz}</p>}
        {nextWarning && <p className="quiz-warning">{nextWarning}</p>}

        <div className="quiz-nav">
          <div className="quiz-progress">
            Unlocked: {unlockedCount} / {handshakeQuestions.length} questions
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
              disabled={currentQIndex === handshakeQuestions.length - 1}
            >
              Next ▶
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default HandshakePage;
