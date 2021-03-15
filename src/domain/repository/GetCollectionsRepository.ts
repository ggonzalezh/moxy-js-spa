import { Collection } from "../model /Collection";

export interface GetCollectionsRepository {
  getCollections(): Promise<Collection[]>;
  getCollectionByName(name: string): Promise<Collection>;
}
