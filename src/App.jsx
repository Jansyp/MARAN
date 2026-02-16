import { useCallback, useRef } from "react";

const menuSpacingCss = `
header nav ul,
nav ul {
  column-gap: 18px !important;
}

header nav a + a,
nav a + a {
  margin-left: 18px !important;
}

header nav [class*="menu"] > *,
nav [class*="menu"] > * {
  margin-right: 18px !important;
}

header nav [class*="menu"] > *:last-child,
nav [class*="menu"] > *:last-child {
  margin-right: 0 !important;
}
`;

export default function App() {
  const frameRef = useRef(null);

  const applyMenuSpacing = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!doc?.head) {
      return;
    }

    let styleTag = doc.getElementById("menu-spacing-overrides");
    if (!styleTag) {
      styleTag = doc.createElement("style");
      styleTag.id = "menu-spacing-overrides";
      doc.head.appendChild(styleTag);
    }

    styleTag.textContent = menuSpacingCss;
  }, []);

  return (
    <main className="app-root" aria-label="Rathvac replica container">
      <iframe
        ref={frameRef}
        title="Rathvac Replica"
        src="/mirror/index.html"
        className="replica-frame"
        onLoad={applyMenuSpacing}
      />
    </main>
  );
}
