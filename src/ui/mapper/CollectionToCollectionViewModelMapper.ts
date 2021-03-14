import { Collection } from "../../domain/model /Collection";
import { CollectionViewModel } from "../model/CollectionViewModel";
import { Mapper } from "../../common/Mapper";

export class CollectionToCollectionViewModelMapper extends Mapper<
  Collection,
  CollectionViewModel
> {
  map(collection: Collection): CollectionViewModel {
    return {
      name: collection.name,
      pathNumber: collection.routes?.length || 0,
    };
  }
}
