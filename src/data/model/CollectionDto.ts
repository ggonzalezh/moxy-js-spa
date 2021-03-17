import { PathDto } from "./PathDto";

export interface CollectionDto {
  id: string;
  name: string;
  routes?: PathDto[];
}
