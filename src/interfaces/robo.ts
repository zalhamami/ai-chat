import { CreateCompletionRequest } from 'openai';
import { Prompt } from 'prompt-sync';
import ChatInterface from './chat';

export default interface RoboInterface {
    chat: ChatInterface;
    options: CreateCompletionRequest;
    initContext(): RoboInterface;
    getContext(): string;
    setUser(user: string): RoboInterface;
    setResponder(responder: string): RoboInterface;
    setModel(model: string): RoboInterface;
    setMaxLength(max: number): RoboInterface;
    setOptions(options: CreateCompletionRequest): RoboInterface;
    userMessage(message?: string): string;
    responderMessage(message?: string): string;
    showIntroduction(input: Prompt): void;
    startChatting(): Promise<void>;
    checkIfAnyStopCondition(request: string): Promise<void>;
}
