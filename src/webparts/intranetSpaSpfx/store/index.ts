import { WebPartContext } from "@microsoft/sp-webpart-base";
import { create } from "zustand";

type State = {
  context: WebPartContext | null;
};

type Action = {
  updateContext: (context: State["context"]) => void;
};

export const useZustandStore = create<State & Action>((set) => ({
  context: null,

  updateContext: (newContext) => set({ context: newContext }),
}));
