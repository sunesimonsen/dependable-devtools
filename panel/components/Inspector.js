import { html } from "@dependable/view";
import { css } from "stylewars";
import { observable } from "@dependable/state";
import { state } from "../state.js";

const numberStyles = css`
  & {
    color: var(--json-color-number);
  }
`;

class NumberInspector {
  render({ value }) {
    return html`<span className=${numberStyles}>${String(value)}</span>`;
  }
}

const stringStyles = css`
  & {
    color: var(--json-color-string);
  }
`;

class StringInspector {
  render({ value }) {
    return html`
      <span className=${stringStyles}>${JSON.stringify(value)}</span>
    `;
  }
}

const booleanStyles = css`
  & {
    color: var(--json-color-boolean);
  }
`;

class BooleanInspector {
  render({ value }) {
    return html`<span className=${booleanStyles}>${String(value)}</span>`;
  }
}

const undefinedStyles = css`
  & {
    color: var(--json-color-undefined);
  }
`;

class UndefinedInspector {
  render({ value }) {
    return html`<span className=${undefinedStyles}>${String(value)}</span>`;
  }
}

const nullStyles = css`
  & {
    color: var(--json-color-null);
  }
`;

class NullInspector {
  render({ value }) {
    return html`<span className=${nullStyles}>${String(value)}</span>`;
  }
}

const symbolStyles = css`
  & {
    color: var(--json-color-symbol);
  }
`;

class SymbolInspector {
  render({ value }) {
    return html`<span className=${symbolStyles}>${String(value)}</span>`;
  }
}

class FunctionInspector {
  render({ value }) {
    return html`<span>function ${value.name}() { ... }</span>`;
  }
}

const objectPropertyStyles = css`
  & {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 5px 20px;
    margin: 0;
  }

  & > dt {
    color: var(--json-color-key);
    text-align: end;
  }

  & > dt:after {
    content: ":";
  }

  & > dd {
    margin: 0;
  }

  & > dd > details[open] > .collapsible-body {
    padding: 10px 20px;
  }

  & > dd > details > summary {
    cursor: pointer;
  }
`;

const keysToLabel = (keys) =>
  keys.length > 5 ? [...keys.slice(0, 5), "..."].join(", ") : keys.join(", ");

const objectToSummary = (value) => {
  if (Array.isArray(value)) {
    return `Array[${value.length}]`;
  } else {
    return `Object { ${keysToLabel(Object.keys(value))} }`;
  }
};

class CollapsibleKeyValue {
  constructor({ expanded = false }) {
    this.expanded = observable(expanded);
    this.onToggle = (event) => {
      this.expanded(event.target.open);
    };
  }

  renderDetails() {
    return html`
      <div class="collapsible-body">
        <${ObjectInspector} value=${this.props.value} />
      </div>
    `;
  }

  render({ key, value }) {
    return html`
      <dt>${key}</dt>
      <dd>
        <details open=${this.expanded()} onToggle=${this.onToggle}>
          <summary>${objectToSummary(value)}</summary>
          ${this.expanded() && this.renderDetails()}
        </details>
      </dd>
    `;
  }
}

class KeyValue {
  render({ key, value }) {
    return html`
      <dt>${key}</dt>
      <dd><${AnyInspector} value=${value} /></dd>
    `;
  }
}

function resolveReference(value) {
  if (!value || typeof value !== "object" || !value.$reference) {
    return value;
  }

  return resolveReference(state().observables[value.$reference]);
}

class Entries {
  render({ entries }) {
    return entries.map(([key, value]) => {
      const expanded = value.$expanded;
      if (expanded) {
        value = expanded;
      }
      const resolvedValue = resolveReference(value);

      if (
        !resolvedValue ||
        typeof resolvedValue !== "object" ||
        Object.keys(resolvedValue).length === 0
      ) {
        return html`<${KeyValue} key=${key} value=${resolvedValue} />`;
      } else {
        return html`
          <${CollapsibleKeyValue}
            expanded=${expanded}
            key=${key}
            value=${resolvedValue}
          />
        `;
      }
    });
  }
}

const showMoreStyles = css`
  & {
    background: none;
    padding: 0;
    display: inline;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    color: #555;
  }

  &:hover {
    color: black;
  }
`;

class ObjectInspector {
  constructor() {
    this.shown = observable(50, { id: "ObjectInspector.shown" });

    this.showMore = () => {
      this.shown(this.shown() + 50);
    };
  }

  renderShowMore() {
    return html`
      <button class=${showMoreStyles} onClick=${this.showMore}>
        Show more
      </button>
    `;
  }

  render({ value }) {
    const entries = Object.entries(this.props.value);
    const isShowMoreVisible = entries.length > this.shown();

    return html`
      <dl className=${objectPropertyStyles}>
        <${Entries} entries=${entries.slice(0, this.shown())} />
      </dl>
      ${isShowMoreVisible && this.renderShowMore()}
    `;
  }
}

class EmptyObjectInspector {
  render() {
    return html`{}`;
  }
}

class EmptyArrayInspector {
  render() {
    return html`[]`;
  }
}

class AnyInspector {
  render({ value }) {
    const type = typeof value;

    switch (type) {
      case "number":
      case "bigint":
        return html`<${NumberInspector} value=${value} />`;
      case "string":
        return html`<${StringInspector} value=${value} />`;
      case "boolean":
        return html`<${BooleanInspector} value=${value} />`;
      case "undefined":
        return html`<${UndefinedInspector} value=${value} />`;
      case "symbol":
        return html`<${SymbolInspector} value=${value} />`;
      case "function":
        return html`<${FunctionInspector} value=${value} />`;
      case "object":
        if (!value) {
          return html`<${NullInspector} value=${value} />`;
        }

        if (value.$expanded) {
          value = value.$expanded;
        }

        if (value.$reference) {
          return html`<${AnyInspector} value=${resolveReference(value)} />`;
        }

        if (Object.keys(value).length === 0) {
          if (Array.isArray(value)) {
            return html`<${EmptyArrayInspector} />`;
          } else {
            return html`<${EmptyObjectInspector} />`;
          }
        }

        return html`<${ObjectInspector} value=${value} />`;
      default:
        return html`<${UnknownInspector} value=${value} />`;
    }
  }
}

const theme = css`
  & {
    --json-color-key: #032f62;
    --json-color-comment: #6a737d;
    --json-color-string: #d73a49;
    --json-color-number: #005cc5;
    --json-color-boolean: #6f42c1;
    --json-color-undefined: #6f42c1;
    --json-color-null: #6f42c1;
    --json-color-symbol: black;
  }
`;

export class Inspector {
  render({ value }) {
    return html`
      <div className=${theme}>
        <${AnyInspector} value=${resolveReference(value)} />
      </div>
    `;
  }
}
