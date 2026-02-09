# Solar System 3D - Setup Guide

## How to Run
Because this project uses **ES Modules** (import/export), you cannot simply double-click `index.html`. You must run it through a local server.

### Option 1: VS Code Live Server (Recommended)
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html`.
3. Select "Open with Live Server".

### Option 2: Python (If installed)
1. Open a terminal in the project folder.
2. Run: `python -m http.server`
3. Open `http://localhost:8000` in your browser.

### Option 3: Node.js
1. Run `npx serve .` in the terminal.

## Features implemented
- **3D Solar System**: Sun, Planets (Mercury-Neptune), Orbits, Stars.
- **Interactivity**: 
  - Click planets to see info.
  - Orbit/Zoom camera.
  - Slider to change speed.
  - Pause/Play button.
- **Design**: Glassmorphism UI, Responsive layout.
