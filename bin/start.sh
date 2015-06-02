#!/usr/bin/env bash

# load env vars
if [ -f .envvars ]; then
  source .envvars
else
  echo "Could not find a .envvars file. Make sure you copy the correct one from the envs directory"
  exit 1
fi

# If no NODE_ENV is set, die
if [ -z $NODE_ENV ]; then
  echo "Your .envvars file must declare a NODE_ENV var"
  exit 1
fi

# Check to see if our node_modules directory does not exist
if [ ! -d $PROJECT_ROOT/node_modules ]; then
  # If not, it was probably wiped out by Vagrant mounting a host volume
  # on the start of the container, which wipes out the the node_modules
  # folder that was created by the image. So we will just copy it back in
  # from the /tmp folder just like we do in the Dockerfile
  cp -a /tmp/app/node_modules $PROJECT_ROOT

  # And we'll also rebuild our static files
  npm run gulp build
fi

if [ "$DEBUGGER" = true ]; then
  # start app (with debugging)
  echo "Starting app with debugging"
  if [ "$DEBUG_BRK" = false ]; then
    nodemon --watch src \
        -V \
        --web-host 0.0.0.0 \
        --debug-port 5354 \
        --web-port 8384 \
        --debug-brk false \
        --preload false \
        --exec node-debug index.js
  else
    nodemon --watch src \
        -V \
        --web-host 0.0.0.0 \
        --debug-port 5354 \
        --web-port 8384 \
        --preload false \
        --exec node-debug index.js
  fi
else
  # start app (no debugging)
  echo "Starting app"
  nodemon -V index.js
fi
