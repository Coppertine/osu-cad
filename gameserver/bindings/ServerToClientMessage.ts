// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type {ServerCommand} from "./ServerCommand";

export interface ServerToClientMessage {
  responseId: string | null;
  command: ServerCommand;
}