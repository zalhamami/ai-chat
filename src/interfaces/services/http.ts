export default interface HttpServiceInteface {
    _baseUrl: string | null;
    _authorization: string;
    setBaseUrl(url: string): HttpServiceInteface;
    setAuthorization(key: string): HttpServiceInteface;
    makeRequest(
        resource: string,
        method: HttpMethod,
        body?: any
    ): Promise<any>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'delete';
