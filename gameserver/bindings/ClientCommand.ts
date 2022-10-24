// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type {HitObject} from "./HitObject";
import type {HitObjectOverrides} from "./HitObjectOverrides";
import type {TimingPoint} from "./TimingPoint";
import type {Vec2} from "./Vec2";

export type ClientCommand =
  | { type: "cursorPos"; payload: Vec2 }
  | { type: "currentTime"; payload: number }
  | {
    type: "selectHitObject";
    payload: { ids: Array<number>; selected: boolean; unique: boolean };
  }
  | { type: "createHitObject"; payload: HitObject }
  | { type: "updateHitObject"; payload: HitObject }
  | { type: "deleteHitObject"; payload: Array<number> }
  | { type: "createTimingPoint"; payload: TimingPoint }
  | { type: "updateTimingPoint"; payload: TimingPoint }
  | { type: "deleteTimingPoint"; payload: Array<number> }
  | {
    type: "setHitObjectOverrides";
    payload: { id: number; overrides: HitObjectOverrides };
  };
