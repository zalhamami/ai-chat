import Prompt, { Prompt as PromptSync } from 'prompt-sync';
import { CreateCompletionRequest } from 'openai';
import ChatInterface from '../interfaces/chat';
import MediumStory from '../interfaces/medium/story';
import OpenAIService from '../services/openai';
import MediumService from './medium';

const Service = {
    async callServiceByRequest(chat: ChatInterface, options: CreateCompletionRequest): Promise<string> {
        const request: string = chat.lastRequest.toLowerCase();

        let message: string;
        if (request.includes('generate image')) {
            message = await OpenAIService.generateImage(request);
        } else if (request.includes('post to medium')) {
            const storyTitle: string = this.getAdditionalInfo('Please give me the article title');
            const storyTags: string = this.getAdditionalInfo('Do you want to add tags?');

            const story: MediumStory = {
                title: storyTitle,
                content: '# ' + storyTitle + '\n' + chat.lastResponse,
                tags: storyTags.split(','),
                contentFormat: 'markdown',
                publishStatus: 'draft'
            };
            
            const posted = await MediumService.postStory(story);
            message = 'Failed when posting to medium :( Please try again.';
            if (posted) {
                message = 'Yash! your article has been posted to medium. Enjoy!';
            }
        } else {
            message = await OpenAIService.getConversation(chat, options);
        }
        
        return message;
    },
    getAdditionalInfo(request: string): string {
        const input: PromptSync = Prompt();
        const val: string = input(`${request}: `);
        console.log('\n');
        return val;
    }
}

export default Service;
