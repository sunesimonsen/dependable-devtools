import { setupLifeStyleIntegration } from "./lifeStyleIntegration.js";
import { subscribables, addStateListener } from "@dependable/state";
import { createSnapshot, diffSnapshots } from "@dependable/session";
import { debounce } from "debounce";

let lastSnapshot;

const signalStateChanged = debounce(() => {
  const currentSnapshot = createSnapshot();

  const snapshotDiff = diffSnapshots(lastSnapshot || {}, currentSnapshot);

  lastSnapshot = currentSnapshot;

  window.postMessage({
    sender: "plugin",
    type: "stateChanged",
    payload: snapshotDiff,
  });
}, 200);

const handlers = {
  connectDevtools: () => {
    addStateListener(signalStateChanged);
    signalStateChanged();
  },
};

window.addEventListener("message", (event) => {
  if (event.data.sender === "page") {
    console.log(event.data);
    const handler = handlers[event.data.type];
    if (handler) handler(event.data.payload);
  }
});

setupLifeStyleIntegration();
