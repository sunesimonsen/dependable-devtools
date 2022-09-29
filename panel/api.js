import { state, inspected, inspectedId, subscribableIds } from "./state.js";
import { applySnapshotDiff } from "@dependable/session";

export class Api {
  constructor({ port }) {
    this.port = port;
  }

  connectDevtools() {
    this.port.postMessage({
      type: "connectDevtools",
    });
  }

  onStateChanged(snapshotDiff) {
    const currentSnapshot = state() || {};

    state(applySnapshotDiff(currentSnapshot, snapshotDiff));
  }

  inspect(subscribableId) {
    inspected(subscribableId);
  }

  onPageConnected() {
    this.connectDevtools();
  }
}
