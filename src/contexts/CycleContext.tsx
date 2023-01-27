import { differenceInSeconds } from "date-fns";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addNewCycleAction,
  interruptCycleAction,
  maskCycleAsFinishedAction,
  updateActiveCycleIdAction,
} from "../reducers/cycles/action";
import { Cycle, cycleReducer } from "../reducers/cycles/reducer";

interface CycleFormData {
  task: string;
  minutesAmount: number;
}

interface CycleContextProps {
  activeCycleId: string | null;
  activeCycle: Cycle | undefined;
  amountSecondPassed: number;
  cycles: Cycle[];
  updateCycleFinished: () => void;
  setSecondsPassed: (time: number) => void;
  updateActiveCycleId: (id: string | null) => void;
  createNewCycle: (data: CycleFormData) => void;
  interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextProps);

export function CycleContextProvide({ children }: PropsWithChildren) {
  const [cyclesState, dispacth] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      )!;

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );
  const { activeCycleId, cycles } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function createNewCycle({ minutesAmount, task }: CycleFormData) {
    const id = (cycles.length + 1).toString();
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };
    dispacth(addNewCycleAction(newCycle));
    setAmountSecondPassed(0);
  }

  function interruptCurrentCycle() {
    dispacth(interruptCycleAction());
    setAmountSecondPassed(0);
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds);
  }

  function updateActiveCycleId() {
    dispacth(updateActiveCycleIdAction());
  }

  function updateCycleFinished() {
    dispacth(maskCycleAsFinishedAction());
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondPassed,
        updateCycleFinished,
        setSecondsPassed,
        updateActiveCycleId,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
