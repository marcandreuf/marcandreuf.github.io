---
title: DevContainer pnpm dev environment setup
description: Optimal node js dev environment to speed up npm dependency management and optimise the node_modules disk space. 
publishDate: 2024-07-16
updatedDate: 2024-11-08
heroImage: '../../content/post/_images/2024-07-16-devcontainer-pnpm/optimal-containers.jpg'
heroAlt: '...'
noHero: false
tags:
  - infrastructure
  - devops
  - best practices
  - devcontainers
  - automation
  - node.js
category: Q.Assistance
toc: true
---

## Overview

This post details how to setup an optimal node js dev environment, within a dev container, to speed up npm dependency management and optimise the node_modules disk space. 

## The problem

Each dev container that uses Npm or Yarn as package managers has to download all the "node_modules", plus some transient ones, for each container where those files take quite a lot of disk space and time to download.


## The Solution

 Set up a dev container with Pnpm and a global shared packages store with the host system. This approach eliminates the need to duplicate files. It saves significant network resources and time by reusing all the files that other dev containers or the host machine have already downloaded into the global store. 

This configuration is the fastest way to deal with Nodejs packages on multiple projects.


**How it works:**

Repo [marcitqualab/dev-container-react-app-pocketbase](https://github.com/marcitqualab/dev-container-react-app-pocketbase)
 has the basic configuration for this setup, and repo [marcitqualab/react-pocketbase-task-app](https://github.com/marcitqualab/react-pocketbase-task-app)
 is a sample application using this configuration.

One important note, documented in the Readme file, is that the path to the local pnpm shared folder `${HOME}/.local/share/pnpm` needs to exist before launching the dev containers, or docker will create the shared folder with root ownership, which might cause some issues. We must make this folder the first time if we have never used Pnpm locally, with the current user ownership as a regular folder in the user's home.

Aside from this minimal requirement, the critical points of this setup are as follows:
The Docker file installs Npm and, with Npm, then installs Pnpm as a global package within the base image.
The Docker file defines the base image's PNPM_HOME and sets Pnpm with the path to the shared global store. 
Then, in the `docker-compose.yml` file, we configure a volume to connect the host Pnpm global store with Pnpm store in the container
	
```yaml
volumes:
  - ${HOME}/.local/share/pnpm:/home/node/.local/share/pnpm:cached
```

The rest is the dev container default configuration for setting up a local Nodejs dev environment on an Ubuntu Docker container. Check the .devcontainer folders for more details.

Read the following articles for more technical details on each package manager's main pros and cons: 

* [Choosing the Right Node.js Package Manager in 2024: A Comparative Guide](https://nodesource.com/blog/nodejs-package-manager-comparative-guide-2024/)
* [JavaScript package managers compared: npm, Yarn, or pnpm?](https://blog.logrocket.com/javascript-package-managers-compared/)

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
