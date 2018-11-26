import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

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
  protected  _formData: boolean;
  constructor(requestType: string, path: string, queryOrBodyParams?: object, formData: boolean = false) {
    this._type = requestType;
    this._props = queryOrBodyParams;
    this._path = path;
    this._formData = formData;
    // if (queryOrBodyParams instanceof FormData) {
    //   this._config = {
    //     ...this._config,
    //     headers: {
    //       'content-type': 'multipart/form-data'
    //     }
    //   };
    // }
    this._config = {

      credentials: 'same-origin'
    };
    axios.defaults.baseURL = API_URL;
  }

  public get request(): Promise<ResponseT> {
    switch (this._type) {
      case ApiRequestType.Post: {
        this._request = axios.post(this._path, this.prepareRequestData(this._props, this._formData), this._config);
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
        this._request = axios.put(this._path, this.prepareRequestData(this._props, this._formData), this._config);
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

  private prepareRequestData(data: object, formData: boolean): FormData | object {
    try {
      return formData ? this.createFormData(data) : data;
    } catch (e) {
      console.error('prepare request data error:', e);
    }
  }

  private createFormData(data: object): FormData {
    const formData = new FormData();
    for (const key in data) {
      if (!Array.isArray(data[key])) {
        formData.append(key, data[key]);
      } else {
        data[key].forEach(val => formData.append(`${key}[]`, val));
      }
    }
    return formData;
  }
}
