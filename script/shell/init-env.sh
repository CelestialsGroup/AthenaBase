#!/bin/bash
DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
ROOT="$DIR/../.."

apt update

# Git
git_version=$(git --version)
echo -e "\033[32m${git_version}\033[0m"

# Golang
golang_version=$(go version)
echo -e "\033[32m${golang_version}\033[0m"

# Node
echo -e "\033[32mCheck whether node is installed...\033[0m"
if command -v node >/dev/null 2>&1; then
    echo -e "\033[32mNode is installed.\033[0m"
else
    echo -e "\033[33mNode is not installed.\033[0m"
    git clone https://github.com/nvm-sh/nvm.git
    ./nvm/install.sh
    rm -rf nvm
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    nvm install $(cat webapp/.nvmrc) && nvm use $(cat webapp/.nvmrc) && npm install -g yarn && npm install -g eslint
fi
node_version=$(node --version)
echo -e "\033[32mNode version: ${node_version}\033[0m"

echo "Restart this terminal."