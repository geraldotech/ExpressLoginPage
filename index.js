const express = require('express');
const app = express();
const path = require('path'); //nativo node
const bodyParser = require('body-parser');
var session = require('express-session');

//body-parser
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname, '/views'));

//express session
app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: 60000 }
}));

app.get('/admin/login',(req,res)=>{
    if(req.session.login == null){        
       res.render('login');
       res.send('tente novamente');
    } else {
    //res.send(req.session.login);
    res.render('panel');  
}                 
})       

var usuarios = [
    {
        login: 'geraldo',
        senha: '123',
    }
]


//so consegue usar o post devido ao body parser
app.post('/admin/login',(req,res)=>{
    console.log(req.body.login) //recupera login no console
    usuarios.map(function(val){
        //console.log(val.login)
    if(val.login == req.body.login && val.senha == req.body.senha){
            req.session.login = 'geraldo';           
        }
    })
    //res.send('ok');
    res.redirect('/admin/login');  
});

//index page
app.get('/',(req,res)=>{
res.render('index',{});
});

//sobre
app.get('/sobre',(req,res)=>{
    res.render('secreta',{});
    return res.json({ msg: 'logging you out' })
})


//for logout
 app.get('/logout',(req,res)=>{
    req.session.destroy(function (err) {
    res.clearCookie('connect.sid')
      res.redirect('/'); //Inside a callback… bulletproof!
     });
  })

//404
app.use((req,res,next)=>{
    res.status(404).render('404');
});

app.listen(5000,()=>{
    console.log('server rodando na porta 5000! v3');
})