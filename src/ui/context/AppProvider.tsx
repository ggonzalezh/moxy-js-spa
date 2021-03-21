import { AxiosErrorInterceptor } from "../../common/AxiosErrorInterceptor";
import React, { createContext, useEffect } from "react";
import { message } from "antd";

export interface IAppContext {}

export interface IAppDependencies {
  errorInterceptor: AxiosErrorInterceptor;
}

export const createAppProvider = ({
  errorInterceptor,
}: IAppDependencies): React.FC => ({ children }) => {
  useEffect(() => {
    errorInterceptor.subscribe((error: any) => {
      console.error(error);
      return message.error(
        error.response?.data?.message || error.message || "Unexpected error"
      );
    });
  }, []);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const AppContext = createContext<IAppContext>({});
