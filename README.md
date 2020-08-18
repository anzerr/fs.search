
### `Intro`
Search for a given regex recursive in all files in a directory

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/fs.search.git
```

### `Example`
``` javascript
const Search = require('fs.search');

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

```