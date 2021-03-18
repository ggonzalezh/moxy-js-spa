export interface PathViewModel {
  id?: string;
  collection: string;
  type: string;
  path: string;
  method: string;
}

export interface MockViewModel extends PathViewModel {
  type: "mock";
  responseBody: string;
  contentType: string;
  encoded: boolean;
}

export interface ProxyViewModel extends PathViewModel {
  type: "proxy";
  target: string;
}
