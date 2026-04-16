# Modern Todo Card

A modern, functional, and aesthetically pleasing Todo Card implemented in vanilla HTML, CSS, and JavaScript. 

## What changed from Stage 0 (React/Vite version)
- **Tech Stack Migration**: Completely transitioned from a React, TypeScript, and Vite boilerplate to a lightweight Vanilla HTML, CSS, and JavaScript setup.
- **State Management**: Removed React hooks (`useState`, `useEffect`). Replaced with centralized JavaScript variables, DOM manipulation, and `localStorage` integration.
- **Styling**: Migrated from utility-first CSS (Tailwind) to standard Vanilla CSS (`style.css`), relying heavily on CSS Custom Properties (`:root` variables) for maintaining consistent theming and design tokens.
- **Inline Editing**: Built an inline edit form that exactly mirrors the display view, allowing users to toggle seamlessly between reading and editing modes without navigating to a new page or modal.

## New Design Decisions
- **Dark Mode Aesthetic**: A rich dark background with slate borders and subtle glassmorphic hover states to make the interface feel premium and deep.
- **Dynamic Micro-Interactions**: Smooth scale transitions on buttons, color transitions on hover, and an animated checkmark when toggling task completion.
- **Expandable Descriptions**: Implemented an automatic text-truncation feature in JS. Descriptions exceeding a specific length receive an inline "Show more" / "Show less" toggle rather than overflowing.
- **Color-Coded Statuses & Priorities**: Utilized low-opacity backgrounds with vibrant text (`rgba` values) to construct elegant pill-shaped badges that intuitively display the current priority and status.

## Known Limitations
- **Single Task Support**: The application logic and local storage currently manage a single Todo object rather than an array of multiple tasks.
- **Static Tags**: The `#work` and `#personal` tags are currently hardcoded for demonstration purposes and cannot be manipulated through the edit form.
- **Incomplete Delete Action**: Clicking the delete button simply triggers a browser popup (`alert("Delete clicked")`) and does not actively erase the task from `localStorage` or the DOM.
- **Completion Sync**: The application effectively toggles between "Pending" and "Done" statuses using the main checkbox, but intermediate statuses like "In Progress" require broader UI support to trigger natively.

## Accessibility Notes
- **Semantic Structure**: Meaningful use of HTML5 tags like `<article>`, `<main>`, `<time>`, and `<label>` ensures strong base accessibility readability.
- **Screen Reader Support (`.sr-only`)**: The native checkbox input (`type="checkbox"`) is visually hidden using an `.sr-only` utility class, allowing assistive technologies to still interpret it while giving room for a fully customized visual SVG replacement.
- **Aria Labels**: Crucial icon-only or functionally distinctive buttons (e.g., Edit, Delete, Save, Cancel) include `aria-label` attributes to clarify their purpose to screen readers.
- **Contrast Ratios**: The dark theme (`#0f1117` base with slate greys) has been balanced carefully to ensure readable text contrast based on modern aesthetic UI principles.
- **Testability**: Extensive use of `data-testid` attributes facilitates predictable accessibility and e2e functional testing without relying on brittle relative DOM selectors.
