import { html } from "@dependable/view";
import { css } from "stylewars";
import { inspected } from "../state.js";
import { Inspector } from "./Inspector.js";
import { MainToolbar } from "./MainToolbar.js";

const styles = css`
  & {
    background: white;
    padding: 30px;
  }
`;

export class MainPanel {
  render() {
    return html`
      <div className=${styles}>
        <${MainToolbar} />
        <${Inspector} value=${inspected()} />
      </div>
    `;
  }
}
