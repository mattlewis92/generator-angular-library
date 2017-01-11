var chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    noConfig: function (name, configs) {
        return function (values) {
            return new Promise(function (resolve, reject) {
                var value = configs[name];
                resolve(value == null || value == undefined);
            })
        }

    },
    configInfo: function (config) {
        console.info("Using Config: " + JSON.stringify(config))
        console.info("The config is stored in .yo-rc.json and override the prompts")
        console.info("You can edit then or delete to re-run the generator")
    }

}