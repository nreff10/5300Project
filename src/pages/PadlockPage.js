import React, { useState } from "react";

const cards = [
  {
    id: 1,
    label: "Valid cert, trusted school portal",
    domain: "https://portal.school-example.edu",
    browser:
      "Padlock shown, certificate chain is valid, domain matches what your school uses.",
    truth:
      "This is what a normal, well-configured login page should look like. HTTPS protects the connection and the domain is the one you expect.",
    takeaway:
      "Safe to use if you got here in a normal way (typing the URL, official bookmark, or school link).",
    safe: true,
  },
  {
    id: 2,
    label: "Broken certificate warning",
    domain: "https://old-login.school-example.edu",
    browser:
      "Full-page warning: the certificate is invalid, expired, or not signed by a trusted authority.",
    truth:
      "The browser cannot prove who it is talking to. This might be a misconfiguration, or an attacker intercepting traffic.",
    takeaway:
      "Do not click through this for logins. Close the tab and contact IT or use a known-good link.",
    safe: false,
  },
  {
    id: 3,
    label: "Lookalike site with padlock",
    domain: "https://school-example-portal.com",
    browser:
      "Padlock is present, certificate is valid, but the domain is not your real school domain.",
    truth:
      "Someone registered a lookalike domain and got a legit certificate. HTTPS protects the attacker’s site too.",
    takeaway:
      "Padlock ≠ trust. Always check the domain name and context, especially if you arrived via an email link.",
    safe: false,
  },
];

const padlockQuestions = [
  {
    prompt:
      "Which of these three login pages is the safest choice to enter your school password on?",
    options: [
      "The one with a broken certificate warning",
      "The lookalike site with a padlock",
      "The official school portal with the expected domain and a valid padlock",
    ],
    correctIndex: 2,
    explanationCorrect:
      "You want the real school domain with a valid certificate. A broken cert or a lookalike domain are both risky.",
    explanationIncorrect:
      "A padlock alone is not enough, and broken certificates are a red flag. The safest option is the official portal with the correct domain and a valid certificate.",
  },
  {
    prompt: "What does the browser padlock actually guarantee?",
    options: [
      "That the website is honest and safe",
      "That your connection is encrypted to whatever domain is in the address bar",
      "That the site has no viruses or scams",
      "That every link on the page is safe to click",
    ],
    correctIndex: 1,
    explanationCorrect:
      "The padlock means the connection is encrypted to that domain and the certificate checks out. It doesn’t guarantee the site’s intentions.",
    explanationIncorrect:
      "The padlock is about an encrypted, authenticated connection to a domain. It does not prove the site is harmless or perfectly safe.",
  },
  {
    prompt:
      "You see a big full-page certificate warning when visiting a login page. What’s the best move?",
    options: [
      "Click through the warning so you can log in anyway",
      "Ignore it this time; warnings usually don’t matter",
      "Stop, close the tab, and try a known-good link or contact IT",
      "Disable HTTPS in your browser so the warning goes away",
    ],
    correctIndex: 2,
    explanationCorrect:
      "A serious certificate warning means the browser can’t verify the site. That’s a sign to back out and use a trusted link or ask for help.",
    explanationIncorrect:
      "Clicking through or disabling security features turns off the protections TLS gives you. It’s safer to back out and find a trusted way to reach the site.",
  },
];

function PadlockPage() {
  const [choiceId, setChoiceId] = useState(null);
  const [feedbackChoice, setFeedbackChoice] = useState("");

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackQuiz, setFeedbackQuiz] = useState("");
  const [nextWarning, setNextWarning] = useState("");

  const currentQ = padlockQuestions[currentQIndex];

  const handleSubmitChoice = () => {
    if (choiceId == null) return;
    const chosen = cards.find((c) => c.id === choiceId);
    if (chosen.safe) {
      setFeedbackChoice(
        "Nice choice. The only site here that’s reasonable to log into is the official portal with the expected domain and a valid certificate."
      );
    } else if (choiceId === 3) {
      setFeedbackChoice(
        "This is a common trap: a valid padlock on a fake domain. HTTPS can protect attackers’ sites too. The domain is your main clue."
      );
    } else {
      setFeedbackChoice(
        "If the browser shows a big certificate warning, treat it as a red light—especially for logins. Don’t click through just to “get to the page.”"
      );
    }
  };

  const handleCheckQuizAnswer = () => {
    if (selectedOption === null) return;
    setNextWarning("");

    const correct = selectedOption === currentQ.correctIndex;
    if (correct) {
      setFeedbackQuiz("✅ " + currentQ.explanationCorrect);
      if (currentQIndex + 1 < padlockQuestions.length) {
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
    const lastIndex = padlockQuestions.length - 1;
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
        <h1>Padlock Myths</h1>
        <p>
          Many people think “padlock = safe.” In this module you’ll learn what
          the browser padlock really promises, where it can still mislead you,
          and how to spot risky login pages before you type a password.
        </p>
      </header>

      <section className="module-hero">
        <div className="module-hero-layout">
          <div className="module-hero-left">
            <div className="module-hero-tag">Module 3 • Padlock Myths</div>
            <h2>Read the address bar like a pro</h2>
            <p>
              HTTPS is great at protecting the <strong>connection</strong>, but
              it can’t tell you whether the <strong>site itself</strong> is
              honest. This module helps you separate “encrypted” from
              “trustworthy,” using school-style login pages as concrete
              examples.
            </p>
            <ul className="module-hero-list">
              <li>See the difference between “no HTTPS,” warnings, and padlocks.</li>
              <li>
                Learn why a padlock on a fake domain is still dangerous for your
                password.
              </li>
              <li>
                Practice choosing the safest login page when some options look
                pretty convincing.
              </li>
            </ul>
          </div>

          <div className="module-hero-right">
            <div className="padlock-visual">
              <p className="padlock-visual-title">Common address bar states</p>
              <div className="padlock-lock-row">
                <div className="padlock-lock-card padlock-lock-bad">
                  <div className="padlock-lock-icon">🔓</div>
                  <div className="padlock-lock-label">No HTTPS</div>
                  <p className="padlock-lock-caption">
                    Connection is not encrypted. Anyone on the path could read
                    what you send.
                  </p>
                </div>
                <div className="padlock-lock-card padlock-lock-warning">
                  <div className="padlock-lock-icon">⚠️</div>
                  <div className="padlock-lock-label">Cert warning</div>
                  <p className="padlock-lock-caption">
                    Browser can’t verify the site’s identity. Treat this as a
                    hard stop for logins.
                  </p>
                </div>
                <div className="padlock-lock-card padlock-lock-good">
                  <div className="padlock-lock-icon">🔒</div>
                  <div className="padlock-lock-label">Padlock</div>
                  <p className="padlock-lock-caption">
                    Connection is encrypted to <strong>that domain</strong>. You
                    still need to check the name.
                  </p>
                </div>
              </div>
              <p className="padlock-visual-note">
                Myth: “If there’s a padlock, the site is safe.” <br />
                Reality: The padlock means your connection is private, not that
                the site is trustworthy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Padlock quick guide</h2>
        <p className="panel-subtitle">
          Use these rules of thumb whenever you’re about to type a password,
          especially after clicking an email link.
        </p>

        <div className="panel-body panel-body-split">
          <div>
            <h3>Check the domain, not just the icon</h3>
            <p>
              Attackers can register domains that <em>look</em> right at a
              glance, like <code>school-example-portal.com</code> instead of{" "}
              <code>portal.school-example.edu</code>. They can also get valid
              certificates, so the padlock shows up even on fake sites.
            </p>
            <p>
              Train yourself to read the core part of the name: the piece right
              before <code>.com</code>, <code>.edu</code>, etc. That’s usually
              who you’re really talking to.
            </p>
          </div>
          <div>
            <h3>Take warnings seriously</h3>
            <p>
              A full-page certificate warning is your browser saying, “I can’t
              vouch for this site.” That might be a misconfigured server, but it
              could also be a sign someone is intercepting your traffic.
            </p>
            <p>
              For anything involving logins, treat that warning like a red
              light: back out, use a known-good bookmark, or ask IT for help.
            </p>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Compare these login pages</h2>
        <p className="panel-subtitle">
          Imagine these are three different “school portal” login pages. Click
          the one you’d actually use to log in, then check your answer.
        </p>
        <div className="card-grid">
          {cards.map((card) => (
            <button
              key={card.id}
              className={`card selectable-card ${
                choiceId === card.id ? "selectable-card-active" : ""
              }`}
              onClick={() => setChoiceId(card.id)}
            >
              <h3>{card.label}</h3>
              <p className="domain">{card.domain}</p>
              <p className="muted">{card.browser}</p>
              <p className="truth">
                <strong>Behind the scenes:</strong> {card.truth}
              </p>
              <p className="takeaway">
                <strong>Takeaway:</strong> {card.takeaway}
              </p>
            </button>
          ))}
        </div>
        <button className="btn small" onClick={handleSubmitChoice}>
          Check my choice
        </button>
        {feedbackChoice && <p className="quiz-feedback">{feedbackChoice}</p>}
      </section>

      <section className="panel quiz-panel">
        <div className="quiz-header-line">
          <h2>Padlock quiz</h2>
          <div className="quiz-progress">
            Question {currentQIndex + 1} of {padlockQuestions.length}
          </div>
        </div>
        <p className="panel-subtitle">
          Answer these questions to check what the padlock does—and does
          not—tell you.
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
            Unlocked: {unlockedCount} / {padlockQuestions.length} questions
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
              disabled={currentQIndex === padlockQuestions.length - 1}
            >
              Next ▶
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default PadlockPage;
