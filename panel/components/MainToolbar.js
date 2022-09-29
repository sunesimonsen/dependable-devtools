import { html } from "@dependable/view";
import { css } from "stylewars";

const styles = css`
  & {
  }
`;

export class MainToolbar {
  render() {
    return html`<div className=${styles}>wat</div>`;
  }
}
