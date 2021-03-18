import { GetCollectionsUseCase } from "../domain/GetCollectionsUseCase";
import axios from "axios";
import { CollectionToCollectionViewModelMapper } from "../ui/context/mapper/CollectionToCollectionViewModelMapper";
import { AxiosAddPathRepository } from "../data/AxiosAddPathRepository";
import { AddPathUseCase } from "../domain/AddPathUseCase";
import { GetCollectionByIdUseCase } from "../domain/GetCollectionByIdUseCase";
import { AxiosGetCollectionByNameRepository } from "../data/AxiosGetCollectionByNameRepository";
import { createCollectionProvider, createPathProvider } from "../ui/context";
import { AxiosGetCollectionsRepository } from "../data/AxiosGetCollectionsRepository";

const axiosInstance = axios.create({ baseURL: "" });

export const CollectionProvider = createCollectionProvider({
  getCollectionsUseCase: new GetCollectionsUseCase(
    new AxiosGetCollectionsRepository(axiosInstance)
  ),
  collectionMapper: new CollectionToCollectionViewModelMapper(),
});

export const PathProvider = createPathProvider({
  addPathUseCase: new AddPathUseCase(new AxiosAddPathRepository(axiosInstance)),
  getCollectionByIdUseCase: new GetCollectionByIdUseCase(
    new AxiosGetCollectionByNameRepository(axiosInstance)
  ),
  collectionMapper: new CollectionToCollectionViewModelMapper(),
});
