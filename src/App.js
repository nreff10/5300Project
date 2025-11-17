// src/App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import JourneyPage from "./pages/JourneyPage";
import HandshakePage from "./pages/HandshakePage";
import PadlockPage from "./pages/PadlockPage";
import MFAPage from "./pages/MFAPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="brand">
          <Link to="/">Track the Attack</Link>
        </div>
        <div className="nav-links">
          <Link to="/journey">Login Journey</Link>
          <Link to="/handshake">TLS Handshake</Link>
          <Link to="/padlock">Padlock Myths</Link>
          <Link to="/mfa">MFA Choices</Link>
        </div>
      </nav>

      <main className="main">
        <Routes>
          {/* Intro is the default page */}
          <Route path="/" element={<IntroPage />} />

          {/* Other modules */}
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/handshake" element={<HandshakePage />} />
          <Route path="/padlock" element={<PadlockPage />} />
          <Route path="/mfa" element={<MFAPage />} />

          {/* Fallback: anything unknown → Intro */}
          <Route path="*" element={<IntroPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
