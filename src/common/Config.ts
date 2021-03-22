import { GetCollectionsUseCase } from "../domain/GetCollectionsUseCase";
import axios, { AxiosInstance } from "axios";
import { CollectionToCollectionViewModelMapper } from "../ui/context/mapper/CollectionToCollectionViewModelMapper";
import { AxiosAddPathRepository } from "../data/AxiosAddPathRepository";
import { AddPathUseCase } from "../domain/AddPathUseCase";
import { GetCollectionByIdUseCase } from "../domain/GetCollectionByIdUseCase";
import { AxiosGetCollectionByNameRepository } from "../data/AxiosGetCollectionByNameRepository";
import { createCollectionProvider, createPathProvider } from "../ui/context";
import { AxiosGetCollectionsRepository } from "../data/AxiosGetCollectionsRepository";
import { SaveCollectionUseCase } from "../domain/SaveCollectionUseCase";
import { AxiosAddCollectionRepository } from "../data/AxiosAddCollectionRepository";
import { AxiosDeleteCollectionRepository } from "../data/AxiosDeleteCollectionRepository";
import { DeleteCollectionUseCase } from "../domain/DeleteCollectionUseCase";
import { createAppProvider } from "../ui/context/AppProvider";
import { AxiosErrorInterceptor } from "./AxiosErrorInterceptor";
import { PathFormViewModelToPathMapper } from "../ui/context/mapper/PathFormViewModelToPathMapper";
import { AxiosUpdateCollectionRepository } from "../data/AxiosUpdateCollectionRepository";

const axiosInstance: AxiosInstance = axios.create({ baseURL: "" });

export const CollectionProvider = createCollectionProvider({
  getCollectionsUseCase: new GetCollectionsUseCase(
    new AxiosGetCollectionsRepository(axiosInstance)
  ),
  addCollectionUseCase: new SaveCollectionUseCase(
    new AxiosAddCollectionRepository(axiosInstance),
    new AxiosUpdateCollectionRepository(axiosInstance)
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
  pathFormMapper: new PathFormViewModelToPathMapper(),
});

export const AppProvider = createAppProvider({
  errorInterceptor: new AxiosErrorInterceptor(axiosInstance),
});
