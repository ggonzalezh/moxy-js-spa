import { Collection } from "../../../domain/model/Collection";
import { CollectionViewModel } from "../model/CollectionViewModel";
import { Mapper } from "../../../common/Mapper";
import { Mock } from "../../../domain/model/Path";

export class CollectionToCollectionViewModelMapper extends Mapper<
  Collection,
  CollectionViewModel
> {
  map(collection: Collection): CollectionViewModel {
    return {
      id: collection.id,
      name: collection.name,
      paths: collection.paths.map((route) => {
        switch (route.type) {
          case "mock":
            const mock = route as Mock;

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
              id: route.id,
              collection: route.collection,
              type: route.type,
              path: route.path,
              method: route.method,
            };
          default:
            return {
              id: route.id,
              collection: route.collection,
              type: route.type,
              path: route.path,
              method: route.method,
            };
        }
      }),
      pathNumber: collection.paths?.length || 0,
    };
  }
}
