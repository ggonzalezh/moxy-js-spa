import { Collection } from "../model/Collection";

export interface GetCollectionByNameRepository {
  getCollectionByName(name: string): Promise<Collection>;
}
