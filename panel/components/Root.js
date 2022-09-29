import { html } from "@dependable/view";
import { css } from "stylewars";
import { Sidebar } from "./Sidebar.js";
import { MainPanel } from "./MainPanel.js";

const styles = css`
  & {
    flex: 1;
    display: grid;
    grid-template-columns: 300px 1fr;
  }
`;

export class Root {
  render({ children }) {
    return html`
      <div className=${styles}>
        <${Sidebar} />
        <${MainPanel} />
      </div>
    `;
  }
}
