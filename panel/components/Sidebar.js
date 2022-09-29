import { html } from "@dependable/view";
import { css } from "stylewars";
import { subscribableIds, inspectedId } from "../state.js";
import { List, ListItem } from "./List.js";

const sidebarStyles = css`
  & {
    background: rgb(241, 243, 244);
    border-inline-end: solid 1px rgb(202, 205, 209);
    overflow-y: auto;
  }
`;

class ObservableItem {
  constructor() {
    this.onClick = () => {
      inspectedId(this.props.id);
    };
  }

  render({ id }) {
    return html`
      <${ListItem} selected=${id === inspectedId()} onClick=${this.onClick}>
        ${id}
      <//>
    `;
  }
}

export class Sidebar {
  renderItems() {
    return subscribableIds().map(
      (id) => html`<${ObservableItem} key=${id} id=${id} />`
    );
  }

  render() {
    return html`
      <div className=${sidebarStyles}>
        <${List}>${this.renderItems()}<//>
      </div>
    `;
  }
}
