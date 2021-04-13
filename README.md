
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/fs.search/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/fs.search/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/fs.search/workflows/test/badge.svg)

Search for a given regex recursive in all files in a directory

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/fs.search.git
npm install --save @anzerr/fs.search
```

### `Example`
``` javascript
const Search = require('fs.search');

const f = new Search({
    regex: /[0-9A-Za-z]{32}/gi,
    filterFolder: () => true,
    skipEvents: true,
    max: 5
});
f.get('./').then((found) => {
    console.log(found);
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
});

```