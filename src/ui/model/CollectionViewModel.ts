import { RouteViewModel } from "./RouteViewModel";

export interface CollectionViewModel {
  name: string;
  routes?: RouteViewModel[];
  pathNumber: number;
}
