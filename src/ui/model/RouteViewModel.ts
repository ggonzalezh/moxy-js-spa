export interface RouteViewModel {
  id?: string;
  collection: string;
  type: string;
  path: string;
  method: string;
}

export interface MockViewModel extends RouteViewModel {
  type: "mock";
  responseBody: string;
  contentType: string;
  encoded: boolean;
}

export interface ProxyViewModel extends RouteViewModel {
  type: "proxy";
  target: string;
}
