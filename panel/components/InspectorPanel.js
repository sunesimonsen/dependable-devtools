import { html } from "@dependable/view";
import { css } from "stylewars";
import { Inspector } from "./Inspector.js";
import { inspected } from "../state.js";

const styles = css`
  & {
    padding: 30px;
  }
`;

export class InspectorPanel {
  render() {
    return html`
      <div className=${styles}>
        <${Inspector} value=${inspected()} />
      </div>
    `;
  }
}
