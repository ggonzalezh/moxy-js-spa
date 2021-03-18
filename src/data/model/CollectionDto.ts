import { PathDto } from "./PathDto";

export interface CollectionDto {
  id: string;
  name: string;
  paths: PathDto[];
}
