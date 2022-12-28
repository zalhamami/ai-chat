import {
    CreateCompletionRequest,
    CreateImageRequestSizeEnum
} from 'openai';
import ChatInterface from './chat';

export default interface OpenAIServiceInterface {
    getConversation(
        chat: ChatInterface,
        options: CreateCompletionRequest): Promise <string> ;
    generateImage(request: string, size ? : CreateImageRequestSizeEnum): Promise <string> ;
}
