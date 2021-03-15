import { AxiosInstance } from "axios";
import { Collection } from "../domain/model /Collection";
import { CollectionDto } from "./model/CollectionDto";
import { GetCollectionByNameRepository } from "../domain/repository/GetCollectionByNameRepository";

export class AxiosGetCollectionByNameRepository
  implements GetCollectionByNameRepository {
  private readonly path = "/collections/";

  constructor(private readonly axios: AxiosInstance) {}

  async getCollectionByName(name: string): Promise<Collection> {
    let { data } = await this.axios.get<CollectionDto>(`${this.path}${name}`);
    return data;
  }
}
