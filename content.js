const port = chrome.runtime.connect({ name: "page" });

port.postMessage({ type: "pageConnected" });

port.onMessage.addListener((message) => {
  window.postMessage({ ...message, sender: "page" }, "*");
});

const injectScript = (filePath) => {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", filePath);
  (document.head || document.documentElement).appendChild(script);
};

injectScript(chrome.runtime.getURL("dist/plugin.js"));

window.addEventListener("message", (event) => {
  if (event.data.sender === "plugin") {
    console.log(event.data);
    port.postMessage(event.data);
  }
});
