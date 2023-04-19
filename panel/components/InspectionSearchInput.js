import { html } from "@dependable/view";
import { css } from "stylewars";
import { searchText } from "../state.js";

const styles = css`
  & {
    width: 300px;
    border: thin solid red;
  }
`;

export class InspectionSearchInput {
  constructor() {
    this.onInput = (evt) => {
      searchText(evt.target.value);
    };
  }
  render() {
    return html`
      <label for="search">
        Search:
        <input
          name="search"
          class=${styles}
          .value=${searchText()}
          onInput=${this.onInput}
        />
      </label>
    `;
  }
}
