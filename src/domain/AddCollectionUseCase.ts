import { Collection } from "./model/Collection";
import { AddCollectionRepository } from "./repository/AxiosAddCollectionsRepository";

export class AddCollectionUseCase {
  constructor(
    private readonly addCollectionRepository: AddCollectionRepository
  ) {}

  async execute(collection: Collection): Promise<Collection> {
    return await this.addCollectionRepository.addCollection(collection);
  }
}
