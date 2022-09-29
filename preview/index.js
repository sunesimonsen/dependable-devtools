import { html, render } from "@dependable/view";
import { Root } from "../panel/components/Root.js";
import { Api } from "../panel/api.js";
import { FakePort } from "./FakePort.js";

const fakePort = new FakePort();
const api = new Api({ port: fakePort });

fakePort.startListening(api);

render(html`<${Root} />`, document.body, { api });
