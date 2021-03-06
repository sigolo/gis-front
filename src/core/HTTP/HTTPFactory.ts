import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiCall } from "../types";
import { mainStore as store } from "../../state/store";
import { refreshToken } from "../../state/actions";

class HTTPFactory {
  private static instance: HTTPFactory;
  private _clients: { [uuid: string]: AxiosInstance } = {};
  private _current: string;

  private constructor(endpoint: string) {
    if (HTTPFactory.instance && endpoint in this._clients) {
      this._current = endpoint;
      return HTTPFactory.instance;
    }
    this._clients[endpoint] = axios.create({
      baseURL: endpoint,
    });
    this._current = endpoint;
    return HTTPFactory.instance;
  }

  public static getInstance(endpoint: string): HTTPFactory {
    if (!HTTPFactory.instance) {
      HTTPFactory.instance = new HTTPFactory(endpoint);
    }
    if (!(endpoint in HTTPFactory.instance._clients)) {
      HTTPFactory.instance._clients[endpoint] = axios.create({
        baseURL: endpoint,
      });
    }
    HTTPFactory.instance._current = endpoint;
    return HTTPFactory.instance;
  }

  public async request<T>(options: ApiCall): Promise<AxiosResponse<T>> {
    const result = await this._clients[this._current].request<T>(options);
    const newToken = result.headers["token"];
    if (newToken) {
      store.dispatch(refreshToken(newToken) as any);
    }
    return result;
  }
}

export default HTTPFactory;
