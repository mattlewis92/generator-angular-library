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
    },
    rewrite: function (args) {
        var me = this;
        // check if splicable is already in the body text
        var re = new RegExp(args.splicable.map(function (line) {
            return '\s*' + me.escapeRegExp(line);
        }).join('\n'));

        if (re.test(args.haystack)) {
            return args.haystack;
        }
        var lines = args.haystack.split('\n');

        var otherwiseLineIndex = -1;
        lines.forEach(function (line, i) {
            if (line.indexOf(args.needle) !== -1) {
                otherwiseLineIndex = i;
            }
        });
        var spaces = 0;
        while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
            spaces += 1;
        }

        var spaceStr = '';
        while ((spaces -= 1) >= 0) {
            spaceStr += ' ';
        }
        lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
            return spaceStr + line;
        }).join('\n'));
        return lines.join('\n');
    },
    rewriteFile: function (args, _this) {
        args.path = args.path || process.cwd();
        var fullPath = path.join(args.path, args.file);

        args.haystack = fs.readFileSync(fullPath).toString();

        var body = this.rewrite(args);

        fs.writeFileSync(fullPath, body);
    },
    escapeRegExp: function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    },
    addGradleDependency: function (scope, group, name, version) {
        var dependency;
        if(typeof version === 'undefined') {
            dependency = `${scope} '${group}:${name}'`
        }else{
           dependency = `${scope} '${group}:${name}:${version}'` 
        }
        try {
            var fullPath = 'server/build.gradle';
            this.rewriteFile({
                file: fullPath,
                needle: 'generator-needle-gradle-dependency',
                splicable: [
                    dependency
                ]
            }, this);
        } catch (e) {
            console.error(e);
            console.log(chalk.yellow('\nUnable to find ') + fullPath + chalk.yellow(' or missing required generator-needle-gradle-dependency. Reference to ') + scope + ': ' + group + ':' + name + ':' + version + chalk.yellow(' not added.\n'));
        }
    }

}