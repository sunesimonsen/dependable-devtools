import { observable, computed } from "@dependable/state";

const isAnonymous = (id) => id.startsWith("$");

export const state = observable(
  { observables: {}, nextId: 0 },
  { id: "state" }
);

export const inspectedId = observable(null, { id: "inspectedId" });

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
    state().observables[inspectedId()] ||
    state().observables[subscribableIds()[0]],
  {
    id: "inspected",
  }
);
