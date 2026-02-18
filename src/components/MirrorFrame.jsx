import { useCallback, useRef } from "react";
import { MENU_SPACING_CSS } from "../constants/menuSpacingCss";

const MIRROR_ENTRY_URL = "/mirror/index.html";
const MENU_SPACING_STYLE_ID = "menu-spacing-overrides";

function ensureStyleTag(doc) {
  let styleTag = doc.getElementById(MENU_SPACING_STYLE_ID);

  if (!styleTag) {
    styleTag = doc.createElement("style");
    styleTag.id = MENU_SPACING_STYLE_ID;
    doc.head.appendChild(styleTag);
  }

  return styleTag;
}

function syncMirrorRoute(frameWindow, targetPath) {
  if (!frameWindow || !targetPath) {
    return;
  }

  if (frameWindow.location.pathname === targetPath) {
    return;
  }

  frameWindow.history.replaceState(frameWindow.history.state, "", targetPath);
  frameWindow.dispatchEvent(new frameWindow.PopStateEvent("popstate"));
}

export default function MirrorFrame({ targetPath }) {
  const frameRef = useRef(null);

  const handleLoad = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    const frameWindow = frame?.contentWindow;

    if (!doc?.head) {
      return;
    }

    const styleTag = ensureStyleTag(doc);
    styleTag.textContent = MENU_SPACING_CSS;
    syncMirrorRoute(frameWindow, targetPath);
  }, [targetPath]);

  return (
    <main className="app-root" aria-label="Rathvac replica container">
      <iframe
        ref={frameRef}
        title="Rathvac Replica"
        src={MIRROR_ENTRY_URL}
        className="replica-frame"
        onLoad={handleLoad}
      />
    </main>
  );
}
