import { Path } from "./Path";

export interface Collection {
  id: string;
  name: string;
  paths?: Path[];
}
