import {
  saveSession,
  restoreSession,
  createSnapshot,
} from "@dependable/session";

export const setupLifeStyleIntegration = () => {
  setTimeout(() => {
    if (window.liveStyle) {
      window.liveStyle.reload = () => {
        saveSession();
        window.location.reload();
      };
    }
  }, 500);

  try {
    restoreSession();
    console.log("snapshot", createSnapshot());
  } catch {
    // Ignore
  }
};
