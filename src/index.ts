import dotenv from 'dotenv';
dotenv.config();

import { CreateCompletionRequest } from 'openai';
import Prompt, { Prompt as PromptSync } from 'prompt-sync';
import RoboInterface from './interfaces/robo';
import TypeWriter from './utils/typewriter';
import Service from './services';
import Utils from './utils';

const Robo: RoboInterface = {
    chat: {
        user: 'Human',
        responder: 'Robo',
        context: '',
        conversation: '',
        lastRequest: ''
    },
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
    initContext(): RoboInterface {
        this.chat.context = `The following is a conversation with
            an AI assistant named ${this.chat.responder}. The assistant
            is helpful, creative, clever, and very friendly.\n`;
        return this;
    },
    getContext(): string {
        return this.chat.context;
    },
    setUser(user: string): RoboInterface {
        this.chat.user = user;
        return this;
    },
    setResponder(responder: string): RoboInterface {
        this.chat.responder = responder;
        return this;
    },
    setModel(model: string): RoboInterface {
        this.options.model = model;
        return this;
    },
    setMaxLength(max: number): RoboInterface {
        this.options.max_tokens = max;
        return this;
    },
    setOptions(options: CreateCompletionRequest): RoboInterface {
        Object.assign(this.options, options);
        return this;
    },
    userMessage(message: string = ''): string {
        return `${this.chat.user}: ${message}`;
    },
    responderMessage(message: string = ''): string {
        return `${this.chat.responder}: ${message}`;
    },
    showIntroduction(input: PromptSync): void {
        console.log(
            this.responderMessage(`Hi! I'm ${this.chat.responder}, your personal assistant. Please enter your name to start :) \n`)
        );
        const name: string = input(`Your name: `);
        if (name !== '') {
            this.chat.user = name;
        }
        console.log(
            this.responderMessage(`Hi, ${this.chat.user}! How can I help you?\n`)
        );
    },
    async startChatting(): Promise<void> {
        const input: PromptSync = Prompt();
        this.showIntroduction(input);
        
        this.chat.conversation = this.initContext().getContext();
        const preReply: string = '\n' + this.responderMessage();

        let response: string;
        while (true) {
            this.chat.lastRequest = input(this.userMessage());
            await this.checkIfAnyStopCondition(this.chat.lastRequest);

            TypeWriter.write(preReply);
            this.chat.conversation += '\n' +
                this.userMessage(this.chat.lastRequest) + preReply;

            response = await Service.callServiceByRequest(this.chat, this.options);
            this.chat.conversation += response;
            
            console.log(response + '\n');
        }
    },
    async checkIfAnyStopCondition(request: string): Promise<void> {
        if (['bye', 'stop', 'exit'].includes(request.toLowerCase())) {
            TypeWriter.write('\n' + this.responderMessage('Goodbye!'));
            await Utils.sleep(1500);
            process.exit();
        }
    }
    
}

export default Robo;
