# ple-pwa
an offline-first web app for tracking stats on PLE

## getting started
this app requires nodejs version 7 since the
[node-sqlite3](https://github.com/mapbox/node-sqlite3#supported-platforms)
package is only supported up to there. 

[nvm](https://github.com/creationix/nvm) is an awesome tool for managing multiple versions of node.

To run, clone this repo and cd into the project directory.
```bash
git clone https://github.com/jafow/ple-pwa.git ~/ple-pwa
cd ~/ple-pwa
```

To install dependancies run: 
```bash
$ npm install
```

Create a `config.js` file in the root directory that looks like this:
```javascript
// config.js
module.exports = function config () {
    // put secret stuff in here
    return {
        dbPath: 'db/name_of_your_db.sql',
        testDb: ':memory:',
        validUser: // something secret here,
        cookieSign: // another secret here
    }
}
```

To build and start the development version of the app do:
```bash
$ npm run build && npm run start
```

This will start a webserver running on [localhost:3000](//localhost:3000/)

####

To run tests do:
```bash
$ npm run test
```

### License
MIT
