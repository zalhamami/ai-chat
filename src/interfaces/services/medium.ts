import MediumStory from "../medium/story";
import MediumUser from "../medium/user";
import { HttpMethod } from "./http";

export default interface MediumServiceInterface {
    _api: MediumServiceAPI;
    _request(
        resource: string,
        method?: HttpMethod,
        requestBody?: any): Promise<any>;
    getAPIUrl(): string;
    getAccessToken(): string;
    getUserInfo(): Promise<MediumUser|undefined>;
    postStory(request: MediumStory): Promise<MediumStory|undefined>;
}

interface MediumServiceAPI {
    baseUrl: string | undefined | null;
    version: string | undefined | null;
    accessToken: string | undefined | null;
}
