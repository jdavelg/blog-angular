const app = express();

app.use(express.static(__dirname+'/dist/blog-angular'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/blog-angular/index.html'));
});

app.listen(process.env.PORT || 8080);