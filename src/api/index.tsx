import React from "react";
import axios, { AxiosInstance } from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});

interface ApiInterface {
  client: AxiosInstance;
}

const ApiContext = React.createContext<ApiInterface | undefined>(undefined);

export const ApiProvider = ({ children }) => {
  const [apiClient, setApi] = React.useState<AxiosInstance>(() => client);

  return (
    <ApiContext.Provider value={{ client: apiClient }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error("Api Context is unavailable");
  }
  return context;
};
