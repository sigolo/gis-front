import config from "react-global-configuration";
import { get_env } from "./env";
import { ConfigObject } from "./types";

export const fetchConfig = async () => {
  const env = await get_env();
  if (env && env.CONFIG) {
    const conf = Object.assign(env.CONFIG);
    try {
      config.set(conf);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const getConfig = (): ConfigObject => {
  return config.get();
};

export default getConfig;
