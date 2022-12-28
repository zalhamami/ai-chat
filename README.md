# Robo
A personal assistant, built with Typescript, Node.js and Open AI

## Requirements
- **NPM (Node Package Manager)**. [Installation Guide](https://kinsta.com/blog/how-to-install-node-js/)
- **OpenAI API Key**. [Get API Key](https://beta.openai.com/account/api-keys)

## Installation
For automatic installation, just simply run the `install.sh` file.
```bash
> ./install.sh
```
However, if you prefer manual installation, you can run:
```bash
# Install typescript
> npm install -g typescript

# Install the necessary packages
> npm install

# Copy the env from example
> cp .env.example .env
```

Lastly, put your OpenAI API Key in the `.env` file.

## Start the application
1. Create `app.ts` in the root folder and put the code below:
```javascript
import Robo from './src';

Robo.startChatting();
```
2. Run `npm start robo` in console.
3. Enjoy!
