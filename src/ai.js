import {} from 'dotenv/config'
import { Configuration, OpenAIApi } from 'openai';
import Prompt from 'prompt-sync';
import TypeWriter from './typewriter.js';

const config = new Configuration({
    apiKey: process.env.API_KEY
});
const openAI = new OpenAIApi(config);

const AI = {
    startChatting: async function startChatting(username = 'Human', model = 'text-davinci-003', responder = 'AI') {
        let conversation = '';
        const input = Prompt();

        while (true) {
            const question = input(`${username}: `);
            if (question.toString().toLowerCase() == 'bye') {
                TypeWriter.write(`\n${responder}: Goodbye!`);
                break;
            }

            conversation += `\n${username}: ` + question;
            TypeWriter.write(`\n${responder}: ...`);

            const response = await this.getResponse(
                model, username, responder, conversation
            );
            conversation += response;
            
            const answer = response + '\n';
            console.log(answer);
        }
    },
    getResponse: async function getResponse(model, username, responder, conversation) {
        const response = await openAI.createCompletion({
            model: model,
            prompt: conversation,
            temperature: 0.9,
            max_tokens: 800,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [` ${username}:`, ` ${responder}:`],
        });
        
        return response.data.choices[0] ? response.data.choices[0].text : 'Failed to understand. Try again.';
    }
}

export default AI;
