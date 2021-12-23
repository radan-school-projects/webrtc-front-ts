# WebRTC Frontend Typescript

This Repo focuses on building a simple WebRTC chat app with **React** and **Typescript**.

The corresponding backend could be found in [this repo](https://github.com/radandevist/webrtc-back-ts).

This repo uses the [client-react-ts](https://github.com/radandevist/client-react-ts) template.

## Requirements

You need node v14+ and yarn in order to run this project.

## Installation

### Clone or download a copy of this repo under the current branch

```bash
git clone https://github.com/radandevist/webrtc-front-ts

// or cloning a specific branch
git clone -b <branch_name> https://github.com/radandevist/webrtc-front-ts
```
### Install the dependencies

```bash
cd webrtc-front-ts
yarn install
```

### Run for development

```bash
yarn start
```

### Build for deployment

Generate a production build under the `/build` directory.

```bash
yarn build
```

### Run for development

You need a static server in order to run the build files. The [http-server](https://www.npmjs.com/package/http-server) npm package is an excellent one for that purpose.

Install **http-server** globally first:

```bash
npm install -g http-server
```

use **http-server** to serve the `build` folder:

```bash
http-server -p 3000 -o ./build
```
