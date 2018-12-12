export class LocalStorage<ST> {
  private _name: string;
  constructor(name: string) {
    this._name = name;
    if (typeof window === 'undefined') {
      console.warn('Storage can be used only browser');
    }
  }

  public get item(): ST {
    if (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem(this._name)) {
      return JSON.parse(window.localStorage.getItem(this._name));
    }
    return null;
  }

  public set item(data: ST) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(this._name, JSON.stringify(data));
    }
  }

  public clear(): void {
    if (window && window.localStorage) {
      window.localStorage.setItem(this._name, '');
    }
  }
}
