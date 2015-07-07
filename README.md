# Cheesy Poofs

This boilerplate / project starter combines React + Marty (Flux) + Hapi + Docker. This full stack frameworks support React's powerful isomorphic capabilities to do server side rendering of the React based client side app. For both development and deployment, the stack has been built to run inside a Docker container. Have fun!

## Core libraries

### Client

* [React](http://facebook.github.io/react): Component Framework
* [react-router](https://github.com/rackt/react-router): URL Router

### Flux

* [MartyJS](http://martyjs.org/): Isomorphic Flux Implementation

### Server

* [Hapi](http://hapijs.com/): Web Server
* [Confidence](https://github.com/hapijs/confidence): Config file management
* [Glue](https://github.com/hapijs/glue): Server manifest
* [Good](https://github.com/hapijs/good): Logging
* [node-inspector](https://github.com/node-inspector/node-inspector): Debugging
* [Lab](https://github.com/hapijs/lab): Testing
* [Code](https://github.com/hapijs/code): Test assertions
* [Hoek](https://github.com/hapijs/hoek): Utility

### Utility

* [lodash](https://lodash.com/docs): Utility
* [bluebird](https://github.com/petkaantonov/bluebird): Promises

### Build

* [gulp](http://gulpjs.com): Task runner
* [Browserify](http://browserify.org): JS Bundler
* [Less](http://lesscss.org): CSS Pre-compiler

## Development

### Docker

The app has been containerized using the Docker container management system. This allows development to be done in a nearly identicle environment as the app will run in stage and production environments.

### Dependencies

This app assumes you are using Vagrant with Virtualbox for development environments.

#### Get Vagrant + Virtualbox

Head on over to http://vagrantup.com and download the [latest](https://www.vagrantup.com/downloads.html) version of Vagrant.

You will also need to download the [latest](https://www.virtualbox.org/wiki/Downloads) version of Virtualbox.

#### Rsync

Part of the development workflow of using Vagrant managed VMs for development is making sure that your code from you local is sync'd into the VM, and re-sync'd every time a change is made.

Helpi uses the built in rsync capabilities that ship in Vagrant to do this. In order to use these features, you will need to have `rsync` installed on your local machine. OS X ships with a version pre-installed. Linux users may need to install it with a package manager.

#### Docker

You should install the Docker client on your local machine so you can use it to interact with the Docker host that is built.

##### On OS X

Use [Homebrew](http://brew.sh/) to install the Docker CLI by running the:

```bash
brew install docker
```

### Getting Started

#### Docker Host

Make sure you have the ZG approved Docker host setup. Head over to the following repo and follow the README:

https://github.com/zehnergroup/zg-boot2docker

#### Environment Variables

Since this app is run inside Docker, Environment Variables play a heavy role in configuring various things in the app. A special file called `.envvars` is needed in the root of the project to set the env vars that differ from deployment environment to deployment environment.

Make sure you create a symlink to the appropriate env config in the `env/` folder:

```
ln -s ./envs/.envvars.local .envvars
```

Take care not to put env var declarations in the Vagrantfile, as these are not sent to Docker when the build is done.

#### Fire it up

From the project root, run:

```bash
vagrant up
```

#### Access app

You should now be able to access the hello world module that the skeleton ships with by going to http://docker.local:8003/hello.

#### Get your container ID

Run the following:

```bash
docker ps
```

Look for the line that is running an image named `zehnergroup/zg-site:latest` and note the container ID that preceeds it.

#### Follow Logs

You'll likely want to watch logs on the container. Run the following:

```bash
docker logs -f <CONTAINER_ID>
```

#### Connect to running container

After running `docker ps` you will be able to see the container ID of the running app container. To open a shell into the running container, run:

```bash
docker exec -it <CONTAINER_ID> bash
```

#### Syncing files to the Container

The Vagrant config will rsync the application to the Docker host, and mount the rsync'd folder to the container as a Volume.

To make sure that you file changes are sent to the Container, you should run the following and it will stay running, watching the project folder for changes and syncing them.

```bash
vagrant rsync-auto
```

#### Installing NPM Modules

Get a shell inside the container, and use `npm install --save MODULE` or `npm install --save-dev MODULE` to install it inside the container. Since `vagrant rsync-auto` is not bi-directional, after you are done installing, make sure you bring the modified `package.json` back to the host by copying the output of `cat package.json` and pasting it into your IDE so it can be comitted to Git.

#### Building/Watching static files

[Gulp](gulpjs.com) is in use to handle building JS and LESS. The static app is built upon container build/launch, but if you ever want to trigger a build after a container is started you can simply run the following inside the container shell:

```bash
source .envvars && npm run gulp build
```

You may also want to start a watcher to build on file changes. You can do so by running the following on the container shell:

```bash
source .envvars && npm run gulp watch
```

#### Debugging

A debugger is ready to go inside the container. It is setup to start in the local and development environments. It will be initiaited on start of the server as long as the following env var is present:

```bash
export DEBUGGER=true
```

Once the app has been started with the Debugger turned on, you can connect to the debugger at the following URL:

http://docker.local:8383/debug?ws=docker.local:8383&port=5353

#### Testing

The application is being tested using the [Lab](https://github.com/hapijs/lab) testing framework. All modules added to the app should have corrisponding tests produced for them.

To run tests, run the following command from inside the container:

```bash
npm test
```

## Continuous Delivery

The repo is setup with a continuous delivery pipeline. Any commits to the dev branch will automatically be built with Jenkins, and deployed out to the Docker cluster.

Listen on Slack for notifcations of this activity.

## Video Encoding

Video encoding is being automated by AWS Lambda and Elastic Transcoder. When a video file is uploaded to s3://zg-site-video/source it triggers a Lambda function called `zg-site-video-encode`:

https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions

This function sends a job over to the Elastic Transcoder pipeline called `zg_site`:

https://console.aws.amazon.com/elastictranscoder/home?region=us-west-2

It is then encoded into MP4 and WebM formats. The file path of the encoded files will be of the following format:

`https://s3-us-west-2.amazonaws.com/zg-site-video/encoded/{file_name}.{mp4 || webm}`



## Special Thanks

Many thanks to @insin for his project [isomorphic-lab](https://github.com/insin/isomorphic-lab) which was heavily used as reference for building the app skeleton.
