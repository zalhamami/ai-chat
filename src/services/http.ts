import axios from "axios";
import HttpServiceInteface from "../interfaces/services/http";

const HttpService: HttpServiceInteface = {
    _baseUrl: null,
    _authorization: '',
    setBaseUrl(url: string): HttpServiceInteface {
        this._baseUrl = url;
        return this;
    },
    setAuthorization(key: string): HttpServiceInteface {
        this._authorization = key;
        return this;
    },
    async makeRequest(resource: string, method: string = 'GET', requestBody?: any): Promise<any> {
        try {
            const response = await axios({
                    url: this._baseUrl + resource,
                    method,
                    data: requestBody,
                    headers: {
                        'Authorization': this._authorization,
                    }
                }
            )
            return await response.data;
        } catch (err: any) {
            console.log(err.response.data);
        }
    }
}

export default HttpService;
