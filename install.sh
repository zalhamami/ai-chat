#!/bin/bash
echo
echo "[Install] Robo"
echo

echo "Installing all packages.."
npm install --unsafe-perm=true --allow-root
echo

echo "Initialize environment.."
cp .env.example .env
echo

echo "Setup finished"
echo "Next step:"
echo "1. Get OpenAI API Key here: https://beta.openai.com/account/api-keys"
echo "2. Put your API Key in the .env file"
echo