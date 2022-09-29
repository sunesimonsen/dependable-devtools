const titleCase = (text) => text.slice(0, 1).toUpperCase() + text.slice(1);

export class PanelPort {
  postMessage({ type, payload }) {
    this.port.postMessage({
      type,
      dest: chrome.devtools.inspectedWindow.tabId,
      payload,
    });
  }

  startListening(messageTarget) {
    this.port = chrome.runtime.connect({ name: "panel" });

    this.port.onMessage.addListener((message) => {
      if (message.tabId === chrome.devtools.inspectedWindow.tabId) {
        const handlerName = `on${titleCase(message.type)}`;
        const handler = messageTarget[handlerName];
        if (handler) handler.bind(messageTarget)(message.payload);
      }
    });
  }
}
