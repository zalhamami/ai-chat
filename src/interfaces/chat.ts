export default interface ChatInterface {
    user: string;
    responder: string;
    context: string;
    conversation: string;
    lastRequest: string;
    lastResponse?: string;
}
