import { html } from "@dependable/view";
import { css } from "stylewars";
import { InspectionSearchInput } from "./InspectionSearchInput.js";

const styles = css`
  & {
    padding: 10px;
  }
`;

export class MainToolbar {
  render() {
    return html`
      <div className=${styles}>
        <${InspectionSearchInput} />
      </div>
    `;
  }
}
