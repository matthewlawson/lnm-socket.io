This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
## Chat socketio chrome extension
### Installing the chrome extension
Install using these [instructions](https://developer.chrome.com/extensions/getstarted#unpacked)
When loading the unpacked extension point at the build directory.
### Modifying
Webpack watching build scripts are included for developing new functionality on the extension, run the followign commands to use:
```
npm i
npm run build-browser-action
npm run build-background
```