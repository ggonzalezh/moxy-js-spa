import { Collection } from "./model/Collection";
import { AddCollectionRepository } from "./repository/AddCollectionsRepository";

export class AddCollectionUseCase {
  constructor(
    private readonly addCollectionRepository: AddCollectionRepository
  ) {}

  async execute(collection: Collection): Promise<Collection> {
    return await this.addCollectionRepository.addCollection(collection);
  }
}
