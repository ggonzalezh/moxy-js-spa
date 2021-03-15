import { GetCollectionByNameRepository } from "./repository/GetCollectionByNameRepository";
import { Collection } from "./model /Collection";

export class GetCollectionByNameUseCase {
  constructor(
    private readonly getCollectionsRepository: GetCollectionByNameRepository
  ) {}

  async execute(name: string): Promise<Collection> {
    return await this.getCollectionsRepository.getCollectionByName(name);
  }
}
