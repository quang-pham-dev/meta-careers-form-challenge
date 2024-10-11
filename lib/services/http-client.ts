type Request = {
  endpoint: string;
  configOptions?: RequestInit;
};

type TPostRequest<T> = Request & {
  body: T;
};

type TPutRequest<T> = Request & {
  body: T;
};

type TDeleteRequest<T> = Request & {
  body?: T;
};

export class HttpClient {
  private baseApi: string;

  constructor(baseUrl: string) {
    this.baseApi = baseUrl;
  }

  async request<T>({ endpoint, configOptions }: Request): Promise<T> {
    const res = await fetch(this.baseApi + endpoint, configOptions);

    if (!res?.ok) {
      throw new Error(`An error has occurred: ${res?.statusText}`);
    }

    const contentType = res.headers.get('Content-Type') || '';
    let result: T;

    if (contentType.includes('application/json')) {
      result = await res.json();
    } else {
      result = (await res.text()) as unknown as T;
    }

    return result;
  }

  async getRequest<T>({ endpoint, configOptions }: Request): Promise<T> {
    const options: RequestInit = {
      method: 'GET',
      ...configOptions,
    };

    return this.request<T>({ endpoint, configOptions: options });
  }

  async postRequest<T, K>({
    endpoint,
    body,
    configOptions,
  }: TPostRequest<T>): Promise<K> {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...configOptions,
    };

    return this.request({ endpoint, configOptions: options });
  }

  async putRequest<T, K>({
    endpoint,
    body,
    configOptions,
  }: TPutRequest<T>): Promise<K> {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...configOptions,
    };

    return this.request<K>({ endpoint, configOptions: options });
  }

  async deleteRequest<T, K>({
    endpoint,
    body,
    configOptions,
  }: TDeleteRequest<T>): Promise<K> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...configOptions,
    };

    return this.request<K>({ endpoint, configOptions: options });
  }
}
