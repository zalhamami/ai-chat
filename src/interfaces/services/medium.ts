import MediumStory from "../medium/story";
import MediumUser from "../medium/user";

export default interface MediumServiceInterface {
    _api: MediumServiceAPI;
    _request(resource: string, method?: string, requestBody?: any): Promise<any>;
    getAPIUrl(): string;
    getAuthorization(): string;
    getUserInfo(): Promise<MediumUser|undefined>;
    postStory(request: MediumStory): Promise<MediumStory|undefined>;
}

interface MediumServiceAPI {
    baseUrl: string | undefined | null;
    version: string | undefined | null;
    accessToken: string | undefined | null;
}
