const pagePorts = new Map();
const panelPorts = new Set();

const connectPage = (port) => {
  pagePorts.set(port.sender.tab.id, port);

  console.log("connect page", port.sender.tab.id);

  port.onMessage.addListener((message, sender) => {
    console.log("page message", message);
    for (const panelPort of panelPorts) {
      panelPort.postMessage({ ...message, tabId: port.sender.tab.id });
    }
  });

  port.onDisconnect.addListener(() => {
    pagePorts.delete(port.sender.tab.id);
  });
};

const connectPanel = (port) => {
  panelPorts.add(port);
  console.log("connect panel");

  port.onMessage.addListener((message) => {
    console.log("panel message", message);

    const pagePort = pagePorts.get(message.dest);
    pagePort && pagePort.postMessage(message);
  });

  port.onDisconnect.addListener(() => {
    panelPorts.delete(port);
  });
};

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case "page":
      connectPage(port);
      break;
    case "panel":
      connectPanel(port);
      break;
  }
});
