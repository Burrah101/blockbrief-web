import { MacroEvent } from "./types";

export async function getMacroEvents(): Promise<MacroEvent[]> {
  try {
    return [];
  } catch (error) {
    console.error("Macro:", error);
    return [];
  }
}