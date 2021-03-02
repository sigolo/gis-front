import { ConfigObject } from "./types";
interface EnvVariables {
  GEOSERVER_ENDPOINT: string;
  MD_SERVER_ENDPOINT: string;
  CONFIG: ConfigObject | null;
}

const importConfigObject = async (url: string): Promise<ConfigObject> => {
  const configImported = await import(url);
  return configImported.default;
};
export const get_env = async (): Promise<EnvVariables | boolean> => {
  const GEOSERVER_ENDPOINT = process.env.REACT_APP_GEOSERVER_ENDPOINT;
  const MD_SERVER_ENDPOINT = process.env.REACT_APP_MD_SERVER_ENDPOINT;
  const APP_CONFIG = () =>
    process.env.REACT_APP_APP_CONFIG
      ? importConfigObject(process.env.REACT_APP_APP_CONFIG)
      : null;
  const CONFIG = await APP_CONFIG();
  if (!GEOSERVER_ENDPOINT || !MD_SERVER_ENDPOINT || !APP_CONFIG) {
    return false;
  }
  return {
    GEOSERVER_ENDPOINT,
    MD_SERVER_ENDPOINT,
    CONFIG,
  };
};
