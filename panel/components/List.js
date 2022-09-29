import { html } from "@dependable/view";
import { css, classes } from "stylewars";

const itemStyles = css`
  & {
    padding: 0;
    list-style-type: none;
    margin-top: 1px;
    display: flex;
  }

  & > button {
    flex: 1;
    padding: 0 8px;
    line-height: 34px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
  }

  & > button:focus {
    background: #1976d2;
    color: white;
    outline: none;
  }
`;

const selectedStyles = css`
  & > button {
    background: rgb(221, 223, 224);
  }
`;

const listStyles = css`
  & {
    margin: 0;
    padding: 0;
  }
`;

const focus = (element) => element && element.focus();

export class ListItem {
  render({ children, selected, ...rest }) {
    return html`
      <li className=${classes(itemStyles, selected && selectedStyles)}>
        <button ...${rest}>${children}</button>
      </li>
    `;
  }
}

export class List {
  constructor() {
    this.onKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        focus(
          e.target.parentElement?.previousElementSibling?.firstElementChild
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        focus(e.target.parentElement?.nextElementSibling?.firstElementChild);
      }
    };
  }

  render({ children }) {
    return html`
      <nav>
        <ol className=${listStyles} onKeyDown=${this.onKeyDown}>
          ${children}
        </ol>
      </nav>
    `;
  }
}
