var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/ping', function (req, res) {
  res.send('pong')
})

app.listen(process.env.PORT || 3000);
