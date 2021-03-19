import { GetCollectionsUseCase } from "../domain/GetCollectionsUseCase";
import axios from "axios";
import { CollectionToCollectionViewModelMapper } from "../ui/context/mapper/CollectionToCollectionViewModelMapper";
import { AxiosAddPathRepository } from "../data/AxiosAddPathRepository";
import { AddPathUseCase } from "../domain/AddPathUseCase";
import { GetCollectionByIdUseCase } from "../domain/GetCollectionByIdUseCase";
import { AxiosGetCollectionByNameRepository } from "../data/AxiosGetCollectionByNameRepository";
import { createCollectionProvider, createPathProvider } from "../ui/context";
import { AxiosGetCollectionsRepository } from "../data/AxiosGetCollectionsRepository";
import { AddCollectionUseCase } from "../domain/AddCollectionUseCase";
import { AxiosAddCollectionRepository } from "../data/AxiosAddCollectionRepository";
import { AxiosDeleteCollectionRepository } from "../data/AxiosDeleteCollectionRepository";
import { DeleteCollectionUseCase } from "../domain/DeleteCollectionUseCase";

const axiosInstance = axios.create({ baseURL: "" });

export const CollectionProvider = createCollectionProvider({
  getCollectionsUseCase: new GetCollectionsUseCase(
    new AxiosGetCollectionsRepository(axiosInstance)
  ),
  addCollectionUseCase: new AddCollectionUseCase(
    new AxiosAddCollectionRepository(axiosInstance)
  ),
  deleteCollectionUseCase: new DeleteCollectionUseCase(
    new AxiosDeleteCollectionRepository(axiosInstance)
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
