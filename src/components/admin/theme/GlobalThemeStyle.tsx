import React from "react";

const GlobalThemeStyle: React.FC = () => (
  <style>{`
    body {
      background: var(--bg-base);
      color: var(--text-primary);
      transition: background-color 180ms ease, color 180ms ease;
    }

    /* Surfaces */
    .themed-card {
      background: var(--bg-card);
      border-color: var(--border-color);
    }

    .themed-sidebar {
      background: var(--bg-sidebar);
      border-color: var(--border-color);
    }

    .themed-header {
      background: var(--bg-header);
      border-color: var(--border-color);
    }

    .themed-input {
      background: var(--bg-input);
      border-color: var(--border-color);
      color: var(--text-primary);
    }

    .themed-hover:hover {
      background: var(--bg-hover);
    }

    .themed-border {
      border-color: var(--border-color);
    }

    .themed-divide > * + * {
      border-color: var(--border-color);
    }

    .themed-surface-subtle {
      background: var(--bg-subtle);
    }

    /* Typography
       themed-subtle is intentionally a text utility because it is used
       on labels, helper text and icons throughout the interface. */
    .themed-text {
      color: var(--text-primary);
    }

    .themed-secondary {
      color: var(--text-secondary);
    }

    .themed-muted,
    .themed-subtle {
      color: var(--text-muted);
    }

    /* Form controls */
    .input-themed,
    .themed-input-control {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      border-radius: 0.75rem;
      transition:
        border-color 160ms ease,
        box-shadow 160ms ease,
        background-color 160ms ease;
    }

    .input-themed::placeholder,
    .themed-input-control::placeholder {
      color: var(--text-muted);
      opacity: 1;
    }

    .input-themed:focus,
    .themed-input-control:focus {
      outline: none;
      border-color: var(--accent-400);
      box-shadow: 0 0 0 2px var(--accent-400);
    }

    .input-themed:disabled,
    .themed-input-control:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    select.input-themed option,
    select.themed-input-control option {
      background: var(--bg-card);
      color: var(--text-primary);
    }

    /* Accent system */
    .accent-bg {
      background: var(--accent-600);
    }

    .accent-bg-hover:hover {
      background: var(--accent-700);
    }

    .accent-text {
      color: var(--accent-600);
    }

    .accent-text-hover:hover {
      color: var(--accent-700);
    }

    .accent-bg-soft {
      background: var(--accent-50);
    }

    .accent-bg-soft-dark {
      background: var(--accent-100);
    }

    .accent-border {
      border-color: var(--accent-500);
    }

    .accent-ring:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--accent-400);
    }

    .accent-badge {
      background: var(--accent-100);
      color: var(--accent-700);
    }

    .accent-icon-bg {
      background: var(--accent-50);
      color: var(--accent-600);
    }

    .accent-nav-active {
      background: var(--accent-900);
      color: #fff;
    }

    .accent-shadow {
      box-shadow: 0 10px 30px -5px var(--accent-shadow);
    }

    /* Tables and progress elements */
    .table-row-hover:hover {
      background: var(--bg-hover);
    }

    .milestone-card {
      background: var(--accent-900);
    }

    .milestone-progress {
      background: var(--accent-400);
    }

    /* Consistent keyboard focus for interactive elements */
    button:focus-visible,
    a:focus-visible,
    [role="button"]:focus-visible {
      outline: 2px solid var(--accent-400);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      body,
      .input-themed,
      .themed-input-control {
        transition: none;
      }
    }
  `}</style>
);

export default GlobalThemeStyle;
