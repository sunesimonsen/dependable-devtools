import { observable, computed } from "@dependable/state";
import { filterTree } from "./utils/filterTree.js";

const isAnonymous = (id) => id.startsWith("$");

export const state = observable(
  { observables: {}, nextId: 0 },
  { id: "state" }
);

export const inspectedId = observable(null, { id: "inspectedId" });
export const searchText = observable("", { id: "searchText" });

export const subscribableIds = computed(
  () =>
    Object.keys(state().observables)
      .filter((id) => !isAnonymous(id))
      .sort(),
  {
    id: "subscribableIds",
  }
);

export const inspected = computed(
  () =>
    filterTree(
      state().observables[inspectedId()] ||
        state().observables[subscribableIds()[0]],
      searchText()
    ),
  {
    id: "inspected",
  }
);
