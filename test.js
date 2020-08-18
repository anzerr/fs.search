
const Search = require('./index');

const f = new Search({
    regex: /[0-9A-Za-z]{32}/gi,
    filterFolder: () => true,
    skipEvents: true
});
f.get('./').then((found) => {
    console.log(found);
});

// or

const f2 = new Search({
    regex: /[0-9A-Za-z]{32}/gi
});
f2.on('found', ({file, found}) => {
    console.log(file, found);
}).get('./').then((found) => {
    console.log(found);
});