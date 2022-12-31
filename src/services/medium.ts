import MediumStory from "../interfaces/medium/story";
import MediumUser from "../interfaces/medium/user";
import { HttpMethod } from "../interfaces/services/http";
import MediumServiceInterface from "../interfaces/services/medium";
import HttpService from "./http";

const MediumService: MediumServiceInterface = {
    _api: {
        baseUrl: process.env.MEDIUM_API_URL,
        version: process.env.MEDIUM_API_VERSION,
        accessToken: process.env.MEDIUM_INTEGRATION_TOKEN
    },
    getAPIUrl(): string {
        return `${this._api.baseUrl}/${this._api.version}/`;
    },
    getAccessToken(): string {
        return `Bearer ${this._api.accessToken}`;
    },
    async _request(resource: string, method: HttpMethod = 'GET', requestBody?: any): Promise<any> {
        return await HttpService
            .setBaseUrl(this.getAPIUrl())
            .setAuthorization(this.getAccessToken())
            .makeRequest(
                resource, method, requestBody
            );
    },
    async getUserInfo(): Promise<MediumUser|undefined> {
        const user = await this._request('me');
        if (!user) return;

        return {
            id: user.data.id,
            name: user.data.name,
            username: user.data.username,
            url: user.data.url,
            imageUrl: user.data.imageUrl
        };
    },
    async postStory(request: MediumStory): Promise<MediumStory|undefined> {
        const user: MediumUser | undefined = await this.getUserInfo();
        if (!user) return;

        const story = await this._request(`users/${user.id}/posts`, 'POST', request as object);
        if (!story) return;

        return {
            title: story.data.title,
            content: story.data.content,
            url: story.data.url,
            canonicalUrl: story.data.canonicalUrl,
            authorId: story.data.authorId,
            publishStatus: story.data.publishStatus,
            publishedAt: story.data.publishedAt,
            license: story.data.license,
            licenseUrl: story.data.licenseUrl,
            tags: story.data.tags
        };
    }
}

export default MediumService;
