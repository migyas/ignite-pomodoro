import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MASK_CURRENT_CYCLE_AS_FINISHED = "MASK_CURRENT_CYCLE_AS_FINISHED",
  UPDATE_ACTIVE_CYCLE_ID = "UPDATE_ACTIVE_CYCLE_ID",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  };
}

export function updateActiveCycleIdAction() {
  return {
    type: ActionTypes.UPDATE_ACTIVE_CYCLE_ID,
  };
}

export function maskCycleAsFinishedAction() {
  return {
    type: ActionTypes.MASK_CURRENT_CYCLE_AS_FINISHED,
  };
}
