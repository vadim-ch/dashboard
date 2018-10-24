import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

export const API_URL = 'http://localhost:3000/api';
export const STORAGE_URL = 'http://localhost:3001/';

export const ApiRequestType = {
  Post: 'post',
  Get: 'get',
  Put: 'put',
  Delete: 'delete'
};

export interface IRequest<T> {
  prepareData(): T;
}

export interface IBaseRequest {
  request: Promise<any>;
}

export class ApiRequest<ResponseT> implements IBaseRequest {
  protected _request: AxiosPromise<ResponseT>;
  protected _type: string;
  protected  _props: object;
  protected  _config: object;
  protected  _path: string;
  constructor(requestType: string, path: string, queryOrBodyParams?: object | FormData) {
    this._type = requestType;
    this._props = queryOrBodyParams;
    this._path = path;
    // if (queryOrBodyParams instanceof FormData) {
    //   this._config = {
    //     ...this._config,
    //     headers: {
    //       'content-type': 'multipart/form-data'
    //     }
    //   };
    // }
    axios.defaults.baseURL = API_URL;
  }

  public get request(): Promise<ResponseT> {
    switch (this._type) {
      case ApiRequestType.Post: {
        this._request = axios.post(this._path, this._props, this._config);
        break;
      }
      case ApiRequestType.Get: {
        this._request = axios.get(this._path, {
          params: {
            ...this._props
          }
        });
        break;
      }
      case ApiRequestType.Delete: {
        this._request = axios.delete(this._path, {
          params: {
            ...this._props
          }
        });
        break;
      }
      case ApiRequestType.Put: {
        this._request = axios.put(this._path, this._props, this._config);
        break;
      }
      default: {
        this._request = axios.get(this._path, {
          params: {
            ...this._props
          }
        });
        break;
      }
    }
    return this._request.then(response => response.data);
  }
}
