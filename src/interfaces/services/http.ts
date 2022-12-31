export default interface HttpServiceInteface {
    _baseUrl: string | null;
    _authorization: string;
    setBaseUrl(url: string): HttpServiceInteface;
    setAuthorization(key: string): HttpServiceInteface;
    makeRequest(
        resource: string,
        method: string,
        body?: any
    ): Promise<T>;
}
