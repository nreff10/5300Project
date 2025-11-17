# Track the Attack: HTTPS, TLS, and Safer Logins

This project is an interactive teaching website designed for students with little or no networking background.  
It walks learners through what actually happens when you log in to a website, how HTTPS/TLS protects (and sometimes doesn’t protect) your data, and how different authentication methods change your risk.

Live site: **https://track-the-attack.netlify.app/**

---

## 1. How to Build and Run Locally

### Prerequisites

- Node.js (LTS recommended, e.g. 18+)
- npm (comes with Node)

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/nreff10/5300Project.git
cd 5300Project
npm install

npm start

```
This starts the app in development mode.
Open http://localhost:3000
 in your browser to view it.

The page will reload automatically when you edit files. Lint errors will appear in the console.

### Create a production build

```bash
npm run build
```

## 2. How to Deploy

This project is currently deployed using Netlify, but the build can be hosted by any static site provider.

### Netlify (drag-and-drop) deployment

In the Netlify UI, create a new site using “Deploy with drag & drop”.

Drag the build/ folder into the drop area.

Netlify will upload the files and provide a live URL

## 3. How to Access the Current Site

The latest deployed version of the project is available at:

https://track-the-attack.netlify.app/

No login is required.

The site should work on any modern browser (desktop, tablet, or phone).

Navigation between modules is available via the top navigation bar:

- Intro
- Login Journey
- TLS Handshake
- Padlock Myths
- MFA Choices

If the site appears blank or broken, try hard-refreshing (Ctrl+F5 / Cmd+Shift+R) to clear cached assets.

## 4. Organization of the Website
This is a React single-page application built with Create React App and React Router. The structure is:

## Top-level structure

src/App.js
Sets up:
- The global layout (navigation bar + main content area)
- Routes for each page (Intro, Journey, Handshake, Padlock, MFA)

src/App.css
Shared styling for:
- Layout (full-page sections, panels, grids)
- Typography and colors
- uiz UI elements and buttons

src/pages/
Contains one React component per module:

- IntroPage.js
High-level background on TCP/IP layers, HTTPS/TLS, and authentication.
Visual overview of the modules and how they fit together.
Cards linking to each module.

- JourneyPage.js
“Login journey” through the TCP/IP stack.
Explains who can see what at different stages (device, network, server).
Includes an interactive quiz where questions unlock sequentially.

- HandshakePage.js
Focuses on the TLS handshake.
Breaks down steps like ClientHello, ServerHello, certificate exchange, and key setup.
Uses visuals and spacing to clarify the timeline.
Includes a multi-question quiz with feedback and “complete before moving on” checks.

- PadlockPage.js
Explores common “padlock myths” (e.g., padlock ≠ automatically safe).
Compares different URL/address bar states (HTTP, HTTPS, mixed content, suspicious domains).
Provides concrete examples of what is and isn’t guaranteed by the padlock.
Includes a quiz to reinforce correct mental models.

- MFAPage.js
Compares multiple MFA options (password-only, SMS codes, app-based OTP, hardware keys, etc.).
Discusses phishing resistance, usability, and appropriate use-cases.
Interactive comparison UI plus a quiz to check understanding.

Interactive quizzes
Each module includes a small quiz system with these features:
- Questions are shown one at a time.
- You must answer the current question correctly before moving to the next.
- Buttons allow next/previous question navigation.
All quiz logic is encapsulated within each module’s page component.