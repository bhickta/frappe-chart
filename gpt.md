It seems like you are trying to create a simple Express.js server that listens on port 8080 and responds with "Working..." when accessed. However, there are a few issues with the code you provided.

1. The import statement is incorrect. In Node.js, you typically use the `require` syntax to import modules. The `import` statement is used in ES modules, which require a specific file extension (e.g., `.mjs`) and the `"type": "module"` flag in your `package.json`. To fix this, change the import statement to:

```javascript
const { json } = require('express');
```

2. The `json.toString("./IFSC.json")` statement doesn't make sense. If you're trying to read the contents of a JSON file, you can use the `fs` module to read the file synchronously or asynchronously. Here's an example of reading a JSON file synchronously:

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./IFSC.json', 'utf8'));
```

This assumes that the `IFSC.json` file is located in the same directory as your server script.

3. The `app.get('/', ...)` route handler only responds with the string "Working...". If you want to send the `data` variable containing the parsed JSON file, you can modify the route handler like this:

```javascript
app.get('/', (req, res) => {
  res.send(data);
});
```

4. Lastly, the code should be placed in a single JavaScript file for running with Node.js. If you intend to use ES modules, you need to follow the specific requirements for setting up ES modules in Node.js. However, for a simpler setup, you can use a single JavaScript file with `require` syntax.

Here's the corrected code:

```javascript
const express = require('express');
const { json } = require('express');
const fs = require('fs');

const PORT = 8080;
const HOST = '0.0.0.0';

// Read JSON file synchronously
const data = JSON.parse(fs.readFileSync('./IFSC.json', 'utf8'));

const app = express();
app.use(json());

app.get('/', (req, res) => {
  res.send(data);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
```

Make sure to place the `IFSC.json` file in the same directory as the script before running the code.