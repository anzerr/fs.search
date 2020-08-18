
const find = require('fs.find'),
    fs = require('fs.promisify'),
    events = require('events'),
    {Transform} = require('stream');

class Search extends events {

    constructor(option = {}) {
        super();
        this.option = option;
        this.found = {};
        if (!(this.option.regex instanceof RegExp)) {
            throw new Error('regex should be an instance of RegExp');
        }
    }

    stream() {
        const backlog = [];
		return new Transform({
			objectMode: true,
			transform: (data, encoding, callback) => {
				try {
                    if (backlog.length < 2) {
                        backlog.push(data);
                        callback(null, []);
                    } else {
                        backlog[0] = backlog[1];
                        backlog[1] = data;
                        callback(null, Buffer.concat(backlog).toString().match(this.option.regex) || []);
                    }
				} catch (err) {
					callback(err);
				}
            }
            /*) => {
                callback(null, Buffer.concat(backlog).toString().match(this.option.regex) || []);
            }*/
		});
	}

    match(file) {
        return new Promise((resolve) => {
            const found = {};
            let hasFound = false;
            fs.createReadStream(file).pipe(this.stream()).on('data', (data) => {
                for (let i in data) {
                    if (this.option.skipEvents) {
                        this.found[data[i]] = true;
                    } else {
                        found[data[i]] = true;
                        hasFound = true;
                    }
                }
            }).on('end', () => {
                if (hasFound && !this.option.skipEvents) {
                    this.emit('found', {file, found});
                }
                resolve();
            })
        });
    }

    get(dir) {
        return find(dir, {
            filter: this.option.filterFolder,
            callback: (path, isDirectory) => {
                if (!isDirectory) {
                    return this.match(path);
                }
            },
            max: 1
        }).then(() => this.found);
    }

}

module.exports = Search;
module.exports.default = Search;
