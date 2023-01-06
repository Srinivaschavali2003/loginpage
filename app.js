const express=require('express');
const bodyParser =require('body-parser') ;
const app=express();
app.use(express.static("public"));
var arr=[];
app.set('view engine','ejs') ;
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
 res.render('list');
})
app.get('/signup',function(req,res){
     res.render('signup') ;
})
app.post('/signup',function(req,res){
  var usename= req.body.username;
  var pasword = req.body.Password ;
  var Confirm= req.body.ConfirmPassword;
  var y=0;
  for(var i=0;i<arr.length;i++)
    {
       if(usename===arr[i].usename)
       {
           y=1;
       }
    }
  if(pasword===Confirm)
  {
    if(Boolean(y))
    {
      var mes="Username Already exists";
      res.render('failure2',{content:mes}) ;
    }
    else {
    arr.push({ usename,pasword});
    res.render('success');
    }
  }
  else if(pasword!=Confirm) {
    var mes="Enter password and make sure both are same";
      res.render('failure2',{content:mes});
  }

})
app.post('/',function(req,res){
  var usename= req.body.username;
  var pasword = req.body.Password ;
 var x=0,code;
  for(var i=0;i<arr.length;i++){
    if(arr[i].usename===usename)
    {
       x=1;
       code=arr[i].pasword ;
    } 
  }
  if(Boolean(x)===false){
    //already exits 
    // no name intially so signup page 
    // son redirect to signup page 
    var mes="Username does not exist"
    res.render('failure',{content: mes});
  } 
 else {
  if(code!=pasword) {
    var sendm= "The Password entered is Wrong";
    res.render('failure',{content:sendm}) ;
  }
  else if(code===pasword) res.render('success') ;
 }
    


})
app.listen(3000,function(req,res){
console.log('Server is running on port 3000');
})