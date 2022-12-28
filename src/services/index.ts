import { CreateCompletionRequest } from 'openai';
import ChatInterface from '../interfaces/chat';
import OpenAIService from '../services/openai';

const Service = {
    async callServiceByRequest(chat: ChatInterface, options: CreateCompletionRequest): Promise<string> {
        const request: string = chat.lastRequest.toLowerCase();

        let message: string;
        if (request.includes('generate image')) {
            message = await OpenAIService.generateImage(request);
        } else {
            message = await OpenAIService.getConversation(chat, options);
        }
        
        return message;
    }
}

export default Service;
