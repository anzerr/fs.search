
const Search = require('./index');

const f = new Search({
    regex: /[0-9A-Za-z]{32}/gi,
    filterFolder: () => true,
    skipEvents: true,
    max: 5
});
f.get('./').then((found) => {
    console.log(found);
}).catch((err) => {
    console.log(err);
});

// or

const f2 = new Search({
    regex: /[0-9A-Za-z]{32}/gi,
    max: 5
});
f2.on('found', ({file, found}) => {
    console.log(file, found);
}).get('./').then((found) => {
    console.log(found);
}).catch((err) => {
    console.log(err);
});