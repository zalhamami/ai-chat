import { request } from "http";
import { HttpMethod } from "../interfaces/services/http";
import HttpService from "./http";

const UnsplashService = {
    _api: {
        baseUrl: process.env.UNSPLASH_API_URL, 
        accessToken: process.env.UNSPLASH_API_ACCESS_KEY
    },

    getAPIUrl(): string {
        return `${this._api.baseUrl}/`;
    },

    async _request(resource: string, method: HttpMethod = 'GET', requestBody?: any): Promise<any> {
        return await HttpService
            .setBaseUrl(this.getAPIUrl())
            .makeRequest(
                resource, method, requestBody
            );
    },

    bulidRequest(path: string, query: string): string{
        return `${path}?query=${query}&client_id=${this._api.accessToken}`
    },

    async getPhoto(query: string) {
        const resource = this.bulidRequest('search/photos', query);
        const photo = await this._request(resource);

        if (!photo) return;
        if (photo.results.length === 0) return;
        const response =  {
            id: photo.results[0].id,
            description: photo.results[0].description,
            alt_description: photo.results[0].alt_description,
            url: photo.results[0].url,
            links: photo.results[0].links
        };

        console.log(response);
        
    }
}


export default UnsplashService;