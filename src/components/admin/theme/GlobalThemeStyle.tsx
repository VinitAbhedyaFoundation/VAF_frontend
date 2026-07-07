import React from "react";

const GlobalThemeStyle: React.FC = () => (
  <style>{`
    body { background: var(--bg-base); color: var(--text-primary); }

    .themed-card      { background: var(--bg-card); border-color: var(--border-color); }
    .themed-sidebar   { background: var(--bg-sidebar); border-color: var(--border-color); }
    .themed-header    { background: var(--bg-header); border-color: var(--border-color); }
    .themed-input     { background: var(--bg-input); border-color: var(--border-color); color: var(--text-primary); }
    .themed-text      { color: var(--text-primary); }
    .themed-muted     { color: var(--text-muted); }
    .themed-secondary { color: var(--text-secondary); }
    .themed-subtle    { background: var(--bg-subtle); }
    .themed-hover:hover { background: var(--bg-hover); }
    .themed-border    { border-color: var(--border-color); }
    .themed-divide > * + * { border-color: var(--border-color); }

    .accent-bg        { background: var(--accent-600); }
    .accent-bg-hover:hover { background: var(--accent-700); }
    .accent-text      { color: var(--accent-600); }
    .accent-text-hover:hover { color: var(--accent-700); }
    .accent-bg-soft   { background: var(--accent-50); }
    .accent-bg-soft-dark { background: var(--accent-100); }
    .accent-border    { border-color: var(--accent-500); }
    .accent-ring:focus { outline: none; box-shadow: 0 0 0 2px var(--accent-400); }
    .accent-badge     { background: var(--accent-100); color: var(--accent-700); }
    .accent-icon-bg   { background: var(--accent-50); color: var(--accent-600); }
    .accent-nav-active { background: var(--accent-900); color: #fff; }
    .accent-shadow    { box-shadow: 0 10px 30px -5px var(--accent-shadow); }

    .table-row-hover:hover { background: var(--bg-hover); }

    .input-themed {
      background: var(--bg-input);
      border-color: var(--border-color);
      color: var(--text-primary);
    }

    .input-themed:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--accent-400);
      border-color: var(--accent-400);
    }

    .input-themed::placeholder {
      color: var(--text-muted);
    }

    select.input-themed option {
      background: var(--bg-card);
      color: var(--text-primary);
    }

    .milestone-card {
      background: var(--accent-900);
    }

    .milestone-progress {
      background: var(--accent-400);
    }
  `}</style>
);

export default GlobalThemeStyle;