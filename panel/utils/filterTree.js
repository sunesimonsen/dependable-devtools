import { state } from "../state.js";

function resolveReference(value) {
  if (!value || typeof value !== "object" || !value.$reference) {
    return value;
  }

  return resolveReference(state().observables[value.$reference]);
}

const objectMatches = (node, term) => {
  for (const [key, value] of Object.entries(node)) {
    const depth = nodeMatches(value, term);
    if (depth != -1) {
      return depth + 1;
    }
  }

  return -1;
};

const nodeMatches = (node, term) => {
  node = resolveReference(node);

  if (node && typeof node === "object") {
    return objectMatches(node, term);
  }

  if (Array.isArray(node)) {
    return Math.min(...node.map((v) => nodeMatches(v, term)));
  }

  if (String(node).toLowerCase().includes(term)) {
    return 0;
  }

  return -1;
};

const filterObject = (node, term) => {
  const result = {};

  const entries = Object.entries(node);

  const containsObjects = entries.some(
    ([_, value]) => value && typeof value === "object"
  );

  for (const [key, value] of entries) {
    const resolverdvalue = resolveReference(value);
    const depth = nodeMatches(resolverdvalue, term);

    if (depth === 0 && containsObjects) {
      return { $expanded: node };
    }

    if (depth > -1) {
      result[key] = filterNode(resolverdvalue, term);
    }
  }

  return result;
};

export const filterNode = (node, term) => {
  node = resolveReference(node);

  if (node && typeof node === "object") {
    return filterObject(node, term);
  }

  if (Array.isArray(node)) {
    const depth = nodeMatches(node, term);
    return node.map((v) => filterNode(v, term)).filter(Boolean);
  }

  return node;
};

export const filterTree = (node, term) =>
  term ? filterNode(node, term.toLowerCase()) : node;
