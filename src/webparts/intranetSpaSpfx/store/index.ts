import { WebPartContext } from "@microsoft/sp-webpart-base";
import { create } from "zustand";

type State = {
  context: WebPartContext | null;
  urlSite: string;
};

type Action = {
  updateContext: (context: State["context"]) => void;
};

export const useZustandStore = create<State & Action>((set) => ({
  context: null,
  urlSite: "https://1s5y8.sharepoint.com/sites/SPA-Example",

  updateContext: (newContext) => set({ context: newContext }),
}));
