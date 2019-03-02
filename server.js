const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

//middleware
app.use(bodyParser.urlencoded({extended:false}));





const mysql = require('mysql');


   const connection = mysql.createConnection(
        {
            host:'localhost',
            user: 'nombresusuario',
            password:'',
            database:'news_portal_nodejs'
        });



  
    app.get('/',(req,res)=>
    {
        connection.query('SELECT * FROM news',(err,result)=>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    //console.log(result);
                    res.render("news",{news:result});
                }
            });
    });
    app.post('/news',(req,res)=>
    {
        
        const {title,news} = req.body;
        connection.query('INSERT INTO news SET?',{title,news},(err,result)=>
        {
            res.redirect('/');
        });
    });



    app.post('/del',(req,res)=>
    {
        console.log(req.body);
        var id = req.body.id_news;
        connection.query('delete from news where id_news=' + parseInt(id),(err,result)=>
        {
            res.redirect('/');
        });
    });
    
    
    app.post('/edi',(req,res)=>
    {
    	console.log(req.body);
        var id = req.body.id_news;
       connection.query('SELECT * FROM news where id_news='+parseInt(id),(err,rows)=>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                     res.render("editar",{
   						id: rows[0].id_news,
   						title:rows[0].title,
   						news:rows[0].news                 	
                    	});
                }
            });
    });
    
    
     app.post('/editado',(req,res)=>
    {
        console.log(req.body);
        var id = req.body.id_news;
        var title=req.body.title;
       
        var news=req.body.news;
        connection.query('update news SET? where id_news=' + parseInt(id),{title,news},(err,result)=>
        {
            res.redirect('/');
        });
    });
//starting the server
app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'))
});

module.exports = app;

