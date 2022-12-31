import {
    Configuration,
    OpenAIApi,
    CreateCompletionRequest,
    CreateImageRequestSizeEnum
} from 'openai';
import ChatInterface from '../interfaces/chat';
import OpenAIServiceInterface from '../interfaces/services/openai';

const config: Configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
});
const openAI: OpenAIApi = new OpenAIApi(config);

const OpenAIService: OpenAIServiceInterface = {
    async getConversation(chat: ChatInterface, options: CreateCompletionRequest): Promise<string> {
        options.prompt = chat.conversation;
        options.stop = [` ${chat.user}:`, ` ${chat.responder}:`];
        
        try {
            const response = await openAI.createCompletion(options);
            if (response.data.choices.length === 0 ||
                response.data.choices[0].text === undefined) {
                return 'Failed to understand. Try again.';
            }
            return response.data.choices[0].text;
        } catch (err: any) {
            return err;
        }
    },
    async generateImage(request: string, size: CreateImageRequestSizeEnum = '256x256'): Promise<string> {
        try {
            const response = await openAI.createImage({
                n: 1,
                prompt: request,
                size: size
            });
            if (response.data.data.length === 0 ||
                response.data.data[0].url === undefined) {
                return '';
            }
            return response.data.data[0].url;
        } catch (err: any) {
            return err;
        }
    }
}

export default OpenAIService;
