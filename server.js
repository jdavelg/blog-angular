const express = require('express')
const app = express();
const path = require('path');

app.use(express.static('./dist/blogangular'));
app.get('/*',function(req,res){
    res.sendFile(`index.html`,{root: `dist/blogangular/index.html`});
});

app.listen(process.env.PORT || 8080);