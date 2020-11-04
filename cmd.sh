#!/bin/bash 

_term() { 
  echo "Caught SIGTERM signal!" 
  kill -TERM "$child" 2>/dev/null
}

trap _term SIGTERM

echo "Starting express"
npm run start &
child=$! 
wait "$child"
echo "Shutdown express"
