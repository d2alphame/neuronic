var express = require('express'),
    app = express();

const port = process.env.PORT || 3000;

app.use(express.static('../react-app'));

app.listen(port, ()=> console.log(`Listening on port ${port}`));

module.exports = { port };