import { html } from "@dependable/view";
import { css } from "stylewars";
import { InspectorPanel } from "./InspectorPanel.js";
import { MainToolbar } from "./MainToolbar.js";

const styles = css`
  & {
    background: white;
  }
`;

export class MainPanel {
  render() {
    return html`
      <div className=${styles}>
        <${MainToolbar} />
        <${InspectorPanel} />
      </div>
    `;
  }
}
