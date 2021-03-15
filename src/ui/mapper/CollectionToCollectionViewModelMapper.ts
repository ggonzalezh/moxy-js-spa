import { Collection } from "../../domain/model/Collection";
import { CollectionViewModel } from "../model/CollectionViewModel";
import { Mapper } from "../../common/Mapper";
import { Mock } from "../../domain/model/Path";

export class CollectionToCollectionViewModelMapper extends Mapper<
  Collection,
  CollectionViewModel
> {
  map(collection: Collection): CollectionViewModel {
    return {
      name: collection.name,
      paths: collection.paths?.map((path) => {
        switch (path.type) {
          case "mock":
            const mock = path as Mock;

            return {
              id: mock.id,
              collection: mock.collection,
              type: mock.type,
              path: mock.path,
              method: mock.method,
              responseBody: mock.responseBody,
              contentType: mock.contentType,
              encoded: mock.encoded,
            };
          case "proxy":
            return {
              id: path.id,
              collection: path.collection,
              type: path.type,
              path: path.path,
              method: path.method,
            };
        }
      }),
      pathNumber: collection.paths?.length || 0,
    };
  }
}
