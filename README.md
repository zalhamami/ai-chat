# Robo
Built with Node.js and Open AI

## Requirements
- NPM Installed. Here is an installation guide https://kinsta.com/blog/how-to-install-node-js/
- OpenAI API Key. Get here https://beta.openai.com/account/api-keys

## Installation
For automatic installation, just simply run the `install.sh` file.
```bash
> ./install.sh
```
However, if you prefer manual installation, you can run:
```bash
# Install the necessary packages
> npm install

# Copy the env from example
> cp .env.example .env
```

Lastly, put your OpenAI API Key in the `.env` file.

## Start the application.
1. Create `app.js` in the root folder and put the code below:
```javascript
import Robo from './src/robo.js';

Robo.startChatting();
```
2. Run `npm start` in console.
3. Enjoy!
