const objectMatches = (node, term) => {
  for (const [key, value] of Object.entries(node)) {
    if (key.toLowerCase().includes(term)) {
      return 1;
    }

    const depth = nodeMatches(value, term);
    if (depth != -1) {
      return depth + 1;
    }
  }

  return -1;
};

const nodeMatches = (node, term) => {
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

  for (const [key, value] of Object.entries(node)) {
    const depth = nodeMatches(value, term);

    if (depth === 0) {
      return node;
    }

    if (depth > 0) {
      result[key] = filterNode(value, term);
    }
  }

  return result;
};

export const filterNode = (node, term) => {
  if (node && typeof node === "object") {
    return filterObject(node, term);
  }

  if (Array.isArray(node)) {
    return node.map((v) => filterNode(v, term));
  }

  return node;
};

export const filterTree = (node, term) => filterNode(node, term.toLowerCase());
