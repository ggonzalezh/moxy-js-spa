import { CollectionsRouteProps } from "../ui/routes/CollectionsRoute";
import { GetCollectionsUseCase } from "../domain/GetCollectionsUseCase";
import { AxiosGetCollectionsRepository } from "../data/AxiosGetCollectionsRepository";
import axios from "axios";
import { CollectionToCollectionViewModelMapper } from "../ui/mapper/CollectionToCollectionViewModelMapper";

export function buildCollectionProps(): CollectionsRouteProps {
  return {
    getCollectionsUseCase: new GetCollectionsUseCase(
      new AxiosGetCollectionsRepository(axios.create({ baseURL: "" }))
    ),
    collectionMapper: new CollectionToCollectionViewModelMapper(),
  };
}
