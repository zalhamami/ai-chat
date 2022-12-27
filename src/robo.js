import {} from 'dotenv/config';
import { Configuration, OpenAIApi } from 'openai';
import Prompt from 'prompt-sync';
import TypeWriter from './helpers/typewriter.js';

const config = new Configuration({
    apiKey: process.env.API_KEY
});
const openAI = new OpenAIApi(config);

const Robo = {
    user: 'Human',
    responder: 'Robo',
    options: {
        model: 'text-davinci-003',
        prompt: '',
        temperature: 0.9,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: []
    },
    setUser: function (user) {
        this.user = user;
        return this;
    },
    setResponder: function (responder) {
        this.responder = responder;
        return this;
    },
    setModel: function (model) {
        this.options.model = model;
        return this;
    },
    setMaxLength: function (max) {
        return this.options.max_tokens = max;
        return thisl
    },
    setOptions: function (options) {
        Object.assign(this.options, options);
        return this;
    },
    userMessage: function (message) {
        return `${this.user}: ${message}`;
    },
    responderMessage: function (message) {
        return `${this.responder}: ${message}`;
    },
    showIntroduction: function (input) {
        console.log(
            this.responderMessage(`Hi! I'm ${this.responder}, your personal assistant. Please enter your name to start :) \n`)
        );
        const name = input(`Your name: `);
        if (name !== '') {
            this.user = name;
        }
        console.log(
            this.responderMessage(`Hi, ${this.user}! How can I help you?\n`)
        );
    },
    startChatting: async function () {
        const input = Prompt();
        this.showIntroduction(input);
        
        let conversation = '';
        while (true) {
            const question = input(`${this.user}: `);
            if (question.toString().toLowerCase() == 'bye') {
                TypeWriter.write('\n' + this.responderMessage('Goodbye!'));
                break;
            }

            conversation += '\n' + this.userMessage(question);
            TypeWriter.write('\n' + this.responderMessage('....'));

            const response = await this.getResponse(conversation);
            conversation += response;
            
            console.log(response + '\n');
        }
    },
    getResponse: async function (conversation) {
        this.options.prompt = conversation;
        this.options.stop = [` ${this.user}:`, ` ${this.responder}:`];
        
        const response = await openAI.createCompletion(this.options);
        return response.data.choices[0] ? response.data.choices[0].text : 'Failed to understand. Try again.';
    }
}

export default Robo;
