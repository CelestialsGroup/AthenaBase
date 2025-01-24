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
echo -e "\033[32mNode Version: ${node_version}\033[0m"

# Visual Studio Code Extension
VSCODE_EXTENSIONS=(
	"bradlc.vscode-tailwindcss"
	"dbaeumer.vscode-eslint"
	"golang.go"
	"ms-vscode.vscode-typescript-next"
)
if command -v code &> /dev/null; then
    vscode_version=$(code --version)
    echo -e "\033[32mVisual Studio Code Version: ${vscode_version}\033[0m"
	VSCODE_INSTALLED_EXTENSIONS=$(code --list-extensions)
	
	for EXTENSION in "${VSCODE_EXTENSIONS[@]}"; do
		if echo "$VSCODE_INSTALLED_EXTENSIONS" | grep -q "$EXTENSION"; then
			echo -e "\033[32m$EXTENSION is installed.\033[0m"
		else
			echo -e "\033[33m$EXTENSION is not installed.\033[0m"
			code --install-extension "$EXTENSION"
			if [ $? -eq 0 ]; then
				echo -e "\033[32m$EXTENSION install successfully.\033[0m"
			else
				echo -e "\033[31m$EXTENSION install failed.\033[0m"
			fi
		fi
	done
fi

echo -e "\033[33mRestart this terminal.\033[0m"