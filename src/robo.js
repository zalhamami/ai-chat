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
    context: '',
    options: {
        model: 'text-davinci-003',
        prompt: '',
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: []
    },
    initContext: function () {
        this.context = `The following is a conversation with an AI assistant named ${this.responder}. The assistant is helpful, creative, clever, and very friendly.\n`;
        return this;
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
    userMessage: function (message = '') {
        return `${this.user}: ${message}`;
    },
    responderMessage: function (message = '') {
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
        
        let conversation = this.initContext().context;
        const preReply = '\n' + this.responderMessage();
        while (true) {
            const request = input(`${this.user}: `);
            const cleanRequest = request.toString().toLowerCase();
            if (cleanRequest == 'bye') {
                TypeWriter.write('\n' + this.responderMessage('Goodbye!'));
                break;
            }

            TypeWriter.write(preReply);
            conversation += '\n' + this.userMessage(request) + preReply;

            let response;
            if (cleanRequest.includes('generate image')) {
                response = await this.generateImage(request);
            } else {
                response = await this.getResponse(conversation);
            }
            conversation += response;
            
            console.log(response + '\n');
        }
    },
    getResponse: async function (conversation) {
        this.options.prompt = conversation;
        this.options.stop = [` ${this.user}:`, ` ${this.responder}:`];
        
        try {
            const response = await openAI.createCompletion(this.options);
            return response.data.choices[0] ? response.data.choices[0].text : 'Failed to understand. Try again.';
        } catch (err) {
            return err;
        }
    },
    generateImage: async function (request, size = '256x256') {
        try {
            const response = await openAI.createImage({
                n: 1,
                prompt: request,
                size: size
            });
            return response.data.data[0] ? response.data.data[0].url : '';
        } catch (err) {
            return err;
        }
    }
}

export default Robo;
