import { CollectionsRouteProps } from "../ui/routes/CollectionsRoute";
import { GetCollectionsUseCase } from "../domain/GetCollectionsUseCase";
import { AxiosGetCollectionsRepository } from "../data/AxiosGetCollectionsRepository";
import axios from "axios";
import { CollectionToCollectionViewModelMapper } from "../ui/mapper/CollectionToCollectionViewModelMapper";
import { PathsRouteProps } from "../ui/routes/PathsRoute";
import { AxiosAddPathRepository } from "../data/AxiosAddPathRepository";
import { AddPathUseCase } from "../domain/AddPathUseCase";
import { GetCollectionByNameUseCase } from "../domain/GetCollectionByNameUseCase";
import { AxiosGetCollectionByNameRepository } from "../data/AxiosGetCollectionByNameRepository";

const axiosInstance = axios.create({ baseURL: "" });

export function buildCollectionProps(): CollectionsRouteProps {
  return {
    getCollectionsUseCase: new GetCollectionsUseCase(
      new AxiosGetCollectionsRepository(axiosInstance)
    ),
    collectionMapper: new CollectionToCollectionViewModelMapper(),
  };
}

export function buildPathProps(): PathsRouteProps {
  return {
    addPathUseCase: new AddPathUseCase(
      new AxiosAddPathRepository(axiosInstance)
    ),
    getCollectionByNameUseCase: new GetCollectionByNameUseCase(
      new AxiosGetCollectionByNameRepository(axiosInstance)
    ),
    collectionMapper: new CollectionToCollectionViewModelMapper(),
  };
}
