# Wellspan — Patient Monitoring Platform

Real-time, multi-sensor health monitoring and patient safety dashboard.

**Developer note:** the frontend currently reads from static placeholder data in
`src/data/*.js`, served through a mock service layer at `src/services/api.js`. Swap the
body of each function in that file for a real `fetch()` call once a backend and live
sensors are connected — the pages themselves won't need to change.

---

## 1. Setup (Windows PowerShell)

You need [Node.js](https://nodejs.org/) 18+ installed first (`node -v` to check).

Open PowerShell inside the project folder (the one that directly contains `package.json`)
and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Vite will print a local URL, normally `http://localhost:5173`. It should also open
automatically in your default browser.

> Use `npm.cmd` rather than plain `npm` if PowerShell blocks scripts with a
> "running scripts is disabled" error — `.cmd` files aren't affected by that policy.

### Building a static production bundle

```powershell
npm.cmd run build
npm.cmd run preview
```

`npm run build` outputs static files to `dist/`, which you can open with `npm run preview`
or host on Vercel, Netlify, or any static file host.

---

## 2. Common setup errors

| Symptom | Likely cause | Fix |
|---|---|---|
| `'npm' is not recognized...` | Node.js not installed / not on PATH | Install Node.js LTS, restart PowerShell |
| `running scripts is disabled on this system` | PowerShell execution policy | Use `npm.cmd` instead of `npm` |
| `ENOENT ... package.json` | You're `cd`'d into the wrong folder | Run `dir`, find the folder that actually contains `package.json`, `cd` into it |
| Blank page in browser, console shows import errors | Dependencies not installed | Run `npm.cmd install` again in the project folder |
| Port 5173 already in use | Another Vite/dev server running | Close it, or run `npm.cmd run dev -- --port 5174` |
| Charts don't render / blank chart area | `recharts` not installed | Run `npm.cmd install recharts` |
| Styling looks unstyled/broken | `global.css` not imported | Confirm `src/main.jsx` imports `./styles/global.css` |

---

## 3. Project structure

```
wellspan/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # React entry point, router setup
    ├── App.jsx                # Route definitions
    ├── components/            # Reusable UI building blocks
    │   ├── Layout.jsx
    │   ├── Sidebar.jsx
    │   ├── StatusBar.jsx
    │   ├── StatCard.jsx
    │   ├── StatusBadge.jsx
    │   ├── SensorCard.jsx
    │   ├── AlertItem.jsx
    │   ├── TrendChart.jsx
    │   └── StateBox.jsx       # Loading / empty / error states
    ├── pages/                  # One file per main page
    │   ├── Dashboard.jsx
    │   ├── Monitoring.jsx
    │   ├── Alerts.jsx
    │   ├── History.jsx
    │   ├── PlatformStatus.jsx
    │   ├── ModelAnalysis.jsx  # "Predictive Insights" in the nav
    │   └── About.jsx
    ├── data/                   # Static placeholder data (dev-facing notes only)
    │   ├── vitalsData.js
    │   ├── sensorsData.js
    │   ├── alertsData.js
    │   ├── historyData.js
    │   └── platformData.js
    ├── services/
    │   └── api.js              # Service layer — swap for real fetch() calls later
    └── styles/
        ├── tokens.css          # Design tokens (color, type, spacing)
        └── global.css          # Layout + component styles
```

---

## 4. Implemented features

- Responsive layout: fixed sidebar on desktop, slide-out drawer with hamburger button on mobile/tablet
- Dashboard with monitoring status, vitals summary cards, a recent-alerts preview, and a trend chart
- Sensor Monitoring page with a card per sensor (name, parameter, value/unit, freshness,
  source, connection state); a sensor with nothing configured shows "No data available"
  rather than an invented value
- Alerts & Safety Events page with active/previous sections, severity badges, explanations,
  and a working Acknowledge interaction that updates UI state
- History & Analytics page with a time-range filter, two Recharts line charts, a summary
  statistics row (min/avg/max), and a readings table
- Platform Status page with a Chair/Bed mode selector, occupancy/movement/battery
  snapshot, and a sensor connection overview table
- Predictive Insights page that clearly states the model is still calibrating rather than
  fabricating a result, with the full future field layout stubbed out
- About page describing what the platform does and how it works
- Reusable components (cards, badges, tables, buttons) used consistently across pages
- Loading / empty / error states wired through an async service layer
  (`src/services/api.js`) so a real backend can be swapped in later with minimal page changes
- Accessible navigation: keyboard-focusable links/buttons, visible focus outline,
  `aria-live`/`role` attributes on status and alert regions

## 5. Still backed by static placeholder data

- All vitals, sensor readings, alerts, and history values (`src/data/*.js`)
- Dashboard status and "last updated" timestamps
- Platform occupancy, movement, and battery snapshot
- All charts (Recharts, fed from the history generator)

These are internal, developer-facing notes only — nothing in the UI itself labels these
as placeholder data, by design.

## 6. Planned for backend / ML / sensor integration

- Replace each function body in `src/services/api.js` with real `fetch()` calls to a
  Python (Flask/FastAPI) backend, keeping the same function signatures
- Connect MAX30102, temperature, ECG, pressure matrix, occupancy, MPU6050, wheel encoder,
  and current/voltage sensors to the backend
- Train and evaluate a scikit-learn model on collected data, then connect it behind
  `fetchModelAnalysis()`
- Add a database for persisting historical readings and alert history
- Add authentication for multi-user access
- Build the companion mobile app against the same backend API

---

## 7. Pre-demo checklist

- [ ] `npm.cmd install` then `npm.cmd run dev` completes without errors
- [ ] Sidebar navigation works on desktop and the hamburger drawer works on a narrow window
- [ ] Sensor Monitoring page shows all 8 sensors, including the "No data available"
      placeholder for the wheel encoder
- [ ] Alerts page: acknowledging an active alert moves it to "Previous alerts"
- [ ] History page: changing the time range updates both charts and the summary table
- [ ] Platform Status page: switching Chair Mode / Bed Mode updates the selected button state
- [ ] Predictive Insights page shows the "Calibrating" status correctly
- [ ] About page renders correctly
