import { PathViewModel } from "./PathViewModel";

export interface CollectionViewModel {
  id: string;
  name: string;
  paths?: PathViewModel[];
  pathNumber: number;
}
