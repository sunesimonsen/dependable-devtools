import { snapshot } from "./snapshot.js";

export class FakePort {
  postMessage(message) {
    switch (message.type) {
      case "connectDevtools":
        this.messageTarget.onStateChanged(snapshot);

        break;
    }
  }

  startListening(messageTarget) {
    this.messageTarget = messageTarget;
    messageTarget.onPageConnected();
  }
}
