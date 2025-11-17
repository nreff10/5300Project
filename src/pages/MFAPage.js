import React, { useState } from "react";

const methods = [
  {
    id: 1,
    name: "Password only",
    description:
      "Single shared secret that can be reused, guessed, or stolen if you type it into a fake site.",
    phishing: "Very easy to phish.",
    notes:
      "Acceptable only for low-risk accounts. Not enough for important school or financial logins.",
  },
  {
    id: 2,
    name: "Password + SMS code",
    description:
      "A one-time code is texted to your phone. An attacker needs both your password and the code.",
    phishing:
      "Still phishable: you can be tricked into typing the code into a fake page.",
    notes:
      "Better than password-only. A reasonable first MFA step, but not the strongest.",
  },
  {
    id: 3,
    name: "Password + authenticator app code",
    description:
      "Time-based codes from an app (like Google Authenticator or Authy). Harder to intercept than SMS.",
    phishing:
      "Still phishable if you type the code into the attacker’s page in real time.",
    notes:
      "Good everyday MFA, but still not resistant to phishing when you’re tricked into using it on the wrong site.",
  },
  {
    id: 4,
    name: "Password + security key / passkey (WebAuthn)",
    description:
      "Browser talks to a hardware key or built-in passkey. It signs a challenge that is bound to the real site’s domain.",
    phishing:
      "Designed to resist phishing: the key will not sign in to a lookalike domain.",
    notes:
      "Best option for protecting important accounts like email, school, or bank logins where available.",
  },
];

const scenarios = [
  {
    id: "home",
    label: "Normal school login on your own laptop",
    recommended: 3,
    explanation:
      "On your own laptop, an authenticator app (or security key if offered) gives strong protection without too much friction.",
  },
  {
    id: "shared",
    label: "Logging in on a shared library computer",
    recommended: 4,
    explanation:
      "On a shared machine, a phishing-resistant option like a security key or passkey is ideal. If that’s not available, log out fully and avoid saving passwords.",
  },
  {
    id: "phishy",
    label: "You clicked a link in a strange email",
    recommended: 4,
    explanation:
      "In a high-risk situation, phishing-resistant MFA is uniquely powerful. Even if you click a fake link, the key should refuse to sign for the wrong domain.",
  },
];

const mfaQuestions = [
  {
    prompt:
      "Which method is easiest for an attacker to steal if you accidentally type it into a fake login page?",
    options: [
      "Password only",
      "Password + SMS code",
      "Password + authenticator app code",
      "Password + security key / passkey",
    ],
    correctIndex: 0,
    explanationCorrect:
      "A plain password is a single shared secret. If you give it to a fake site once, the attacker can reuse it.",
    explanationIncorrect:
      "All shared secrets can be stolen, but a simple password alone is the easiest target—no second factor at all.",
  },
  {
    prompt:
      "Which method is **designed** to resist phishing by refusing to work on the wrong website?",
    options: [
      "Password only",
      "Password + SMS code",
      "Password + authenticator app code",
      "Password + security key / passkey (WebAuthn)",
    ],
    correctIndex: 3,
    explanationCorrect:
      "Security keys and passkeys use public-key cryptography bound to the real site’s domain, so they won’t sign in to a lookalike site.",
    explanationIncorrect:
      "Security keys / passkeys are the methods specifically designed to resist phishing by being tied to the real domain.",
  },
  {
    prompt:
      "If a site only supports one of these today and it protects an important account (like email), which is usually the best you can pick?",
    options: [
      "Password only",
      "Password + SMS code",
      "Password + authenticator app code",
      "Password + security key / passkey",
    ],
    correctIndex: 2,
    explanationCorrect:
      "If you can’t use security keys yet, an authenticator app code is typically stronger than SMS codes or password-only.",
    explanationIncorrect:
      "Security keys are best when available. If they aren’t an option, app-based codes are generally stronger than SMS or password-only.",
  },
];

function MFAPage() {
  const [selectedMethodId, setSelectedMethodId] = useState(4);
  const [scenarioId, setScenarioId] = useState("home");

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackQuiz, setFeedbackQuiz] = useState("");
  const [nextWarning, setNextWarning] = useState("");

  const selectedMethod = methods.find((m) => m.id === selectedMethodId);
  const selectedScenario = scenarios.find((s) => s.id === scenarioId);
  const scenarioRecommended = methods.find(
    (m) => m.id === selectedScenario.recommended
  );
  const currentQ = mfaQuestions[currentQIndex];

  const handleCheckQuizAnswer = () => {
    if (selectedOption === null) return;
    setNextWarning("");

    const correct = selectedOption === currentQ.correctIndex;
    if (correct) {
      setFeedbackQuiz("✅ " + currentQ.explanationCorrect);
      if (currentQIndex + 1 < mfaQuestions.length) {
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
    const lastIndex = mfaQuestions.length - 1;
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
        <h1>MFA Choices</h1>
        <p>
          HTTPS protects your connection, but it can’t stop you from handing
          your password to a fake site. This module compares common login
          methods and shows which ones actually help if someone tries to phish
          you.
        </p>
      </header>

      <section className="module-hero">
        <div className="module-hero-layout">
          <div className="module-hero-left">
            <div className="module-hero-tag">Module 4 • MFA Choices</div>
            <h2>Stacking factors to protect your account</h2>
            <p>
              A password is “something you know.” MFA (multi-factor
              authentication) adds other categories like “something you have”
              (your phone or security key) or “something you are” (biometrics).
              Not all combinations are equal—some are still easy to trick out of
              you, while others are built to resist phishing.
            </p>
            <ul className="module-hero-list">
              <li>
                See how common MFA methods line up from weakest to strongest.
              </li>
              <li>
                Learn which options are still vulnerable if you click a
                realistic phishing link.
              </li>
              <li>
                Practice choosing the right method for everyday logins vs.
                high-risk situations.
              </li>
            </ul>
          </div>

          <div className="module-hero-right">
            <div className="mfa-visual">
              <p className="mfa-visual-title">
                Strength vs. phishing resistance
              </p>
              <div className="mfa-strength-list">
                <div className="mfa-strength-row">
                  <span className="mfa-strength-dot mfa-weak" />
                  <span className="mfa-strength-label">Password only</span>
                  <span className="mfa-strength-note">
                    Single secret, easy to steal
                  </span>
                </div>
                <div className="mfa-strength-row">
                  <span className="mfa-strength-dot mfa-medium" />
                  <span className="mfa-strength-label">
                    Password + SMS one-time code
                  </span>
                  <span className="mfa-strength-note">
                    Better, but attackers can still trick you into sharing codes
                  </span>
                </div>
                <div className="mfa-strength-row">
                  <span className="mfa-strength-dot mfa-strong" />
                  <span className="mfa-strength-label">
                    Password + app-based code
                  </span>
                  <span className="mfa-strength-note">
                    Stronger than SMS; still phishable in real time
                  </span>
                </div>
                <div className="mfa-strength-row">
                  <span className="mfa-strength-dot mfa-best" />
                  <span className="mfa-strength-label">
                    Password + security key / passkey
                  </span>
                  <span className="mfa-strength-note">
                    Phishing-resistant: tied to the real site’s domain
                  </span>
                </div>
              </div>
              <p className="mfa-visual-note">
                Goal: move important accounts as far down this list as your
                sites will let you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Authentication methods</h2>
        <p className="panel-subtitle">
          Click a method to learn how it works and how well it handles phishing.
        </p>
        <div className="panel-body panel-body-split">
          <div className="mfa-list">
            {methods.map((m) => (
              <button
                key={m.id}
                className={`mfa-option ${
                  m.id === selectedMethodId ? "mfa-option-active" : ""
                }`}
                onClick={() => setSelectedMethodId(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>
          <div className="mfa-detail">
            <h3>{selectedMethod.name}</h3>
            <p>{selectedMethod.description}</p>
            <p className="muted">
              <strong>Phishing resistance:</strong> {selectedMethod.phishing}
            </p>
            <p className="note">
              <strong>In practice:</strong> {selectedMethod.notes}
            </p>
          </div>
        </div>
      </section>

      <section className="panel quiz-panel">
        <div className="quiz-header-line">
          <h2>MFA quiz</h2>
          <div className="quiz-progress">
            Question {currentQIndex + 1} of {mfaQuestions.length}
          </div>
        </div>
        <p className="panel-subtitle">
          See how these methods compare when an attacker tries to phish you.
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
        <button className="btn small" onClick={handleCheckQuizAnswer}>
          Check my answer
        </button>
        {feedbackQuiz && <p className="quiz-feedback">{feedbackQuiz}</p>}
        {nextWarning && <p className="quiz-warning">{nextWarning}</p>}

        <div className="quiz-nav">
          <div className="quiz-progress">
            Unlocked: {unlockedCount} / {mfaQuestions.length} questions
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
              disabled={currentQIndex === mfaQuestions.length - 1}
            >
              Next ▶
            </button>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Pick the right method for the situation</h2>
        <label className="panel-subtitle" htmlFor="scenario-select">
          Choose a situation and see which method is recommended.
        </label>
        <select
          id="scenario-select"
          className="scenario-select"
          value={scenarioId}
          onChange={(e) => setScenarioId(e.target.value)}
        >
          {scenarios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <p className="quiz-feedback">
          <strong>Recommended:</strong> {scenarioRecommended.name}
        </p>
        <p className="note">{selectedScenario.explanation}</p>
      </section>
    </section>
  );
}

export default MFAPage;
