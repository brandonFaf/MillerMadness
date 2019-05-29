#!/bin/bash
sleep 5s
killall node
cd ~/Desktop/code/MillerMadness
result=$(git pull)
#if [[ ! $result =~ "up-to-date" ]]
#then
#       npm run build
#fi
npm start &
#serve -s ~/Desktop/code/MillerMadness/build -c ~/Desktop/code/serve.json &
node ~/Desktop/code/server/server.js &
amixer cset numid=3 1
qjoypad "game" &
sleep 20s
chromium-browser --app=http://localhost:3000 --start-fullscreen