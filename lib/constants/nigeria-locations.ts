import { getByState, getStates } from "nigeria-lga-data";

export interface NigeriaLocationOption {
  value: string;
  label: string;
}

export interface NigeriaLga {
  id: string;
  name: string;
  state: string;
}

const stateNames = getStates();

export const NIGERIA_STATE_NAMES: readonly string[] = Object.freeze([
  ...stateNames,
]);

export const NIGERIA_STATE_OPTIONS: readonly NigeriaLocationOption[] =
  Object.freeze(
    NIGERIA_STATE_NAMES.map((state) => ({ value: state, label: state })),
  );

const lgasByState = new Map<string, readonly NigeriaLga[]>(
  NIGERIA_STATE_NAMES.map((state) => [
    state,
    Object.freeze(
      getByState(state).map(({ id, name, state: lgaState }) =>
        Object.freeze({ id, name, state: lgaState }),
      ),
    ),
  ]),
);

const allLgas = Object.freeze(Array.from(lgasByState.values()).flat());
const lgasById = new Map(allLgas.map((lga) => [lga.id, lga]));
const EMPTY_LGAS: readonly NigeriaLga[] = Object.freeze([]);

export const NIGERIA_STATE_COUNT = NIGERIA_STATE_NAMES.length;
export const NIGERIA_LGA_COUNT = allLgas.length;

export function isNigeriaState(value: string): boolean {
  return lgasByState.has(value);
}

export function getLgasForState(state: string): readonly NigeriaLga[] {
  return lgasByState.get(state) ?? EMPTY_LGAS;
}

export function getLgaById(id: string): NigeriaLga | undefined {
  return lgasById.get(id);
}

export function isLgaInState(state: string, lgaId: string): boolean {
  return lgasById.get(lgaId)?.state === state;
}
