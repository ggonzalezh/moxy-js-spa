import { PathViewModel } from "./PathViewModel";

export interface CollectionViewModel {
  name: string;
  paths?: PathViewModel[];
  pathNumber: number;
}
