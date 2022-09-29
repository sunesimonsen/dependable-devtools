import { html, render } from "@dependable/view";
import { Root } from "./components/Root.js";
import { Api } from "./api.js";
import { PanelPort } from "./PanelPort.js";

const port = new PanelPort();

const api = new Api({ port });

port.startListening(api);
api.connectDevtools();

render(html`<${Root} />`, document.body, {
  api,
});
