const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/blinders'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/blinders/index.html'));
});

app.listen(process.env.PORT || 8080);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })