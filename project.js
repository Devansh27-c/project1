var express=require("express");
var app=express();
var mysql=require("mysql");
var fileuploader=require("express-fileupload");
const { urlencoded } = require("express");
app.listen(2001,function(){
    console.log("server started");
})
app.use(express.static("public"));
var dbconfiguration=
{
    host:"localhost",
    user:"root",
    password:"",
    database:"project"
}
var dbref=mysql.createConnection(dbconfiguration);
dbref.connect(function(err){
    if(err==null)
    console.log("mysql server started");
    else
    console.log(err);
})
app.get("/",function(req,resp)
{
    console.log("home");
    var puraPath=process.cwd()+ "public/index.html";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           var puraPath=process.cwd()+"/public/index.html";
  resp.sendFile(puraPath);
});
app.get("/signup",function(req,resp){
    var dataary=[req.query.txtEmail,req.query.txtpwd,req.query.utype];
    dbref.query("insert into users values(?,?,?,1)",dataary,function(err,result){
         if(err)
         resp.send(err);
         else
         resp.send("inserted successfully");
    });
    
});
app.get("/chklogin", function (req, resp){
    var dataary=[req.query.txtEmail1,req.query.txtpwd1];
    dbref.query("select * from users where email=? and pwd=? and status=1",dataary, function (err, result) 
    {
        if (err) {
            resp.send(err);
        }
        else
         {
            
            resp.send(result);
        }
       

    });
});
app.get("/updrec",function(req,resp){

    var ary=[req.query.txtEmail,req.query.txtpwd,req.query.txtpwdnew];
    var ary2=[req.query.txtpwdnew,req.query.txtEmail];

    dbref.query("select * from users where email=? and pwd=?",ary,function(err,result)
    {
        if(err)
        resp.send(err);
        else
        if(result.length==1)
        {
            dbref.query("update users set pwd=? where email=? ",ary2, function (err, result){
                if (err) 
                {
                    resp.send(err);
                }
                else
                 {
                    
                    resp.send("Password Successfully updated!!");
                }
               
            });

        }
        else
       resp.send("Invalid Old Password");
    })
   

});
app.use(express.urlencoded('extended:true'));
app.use(fileuploader());
app.post("/profile-process",function(req,resp)
{     
    

   

    var dataAry1=[req.body.txtEmail,req.body.txtName,req.body.txtmob,req.body.txtAddr,req.body.txtCity,req.body.idp]
    dbref.query("insert into dprofile values(?,?,?,?,?,?)",dataAry1,function(err,result){
             if(err)
                 resp.send(err);
             else
               resp.send("Inserted Successfully");
    })
})
app.post("/medicine-process",function(req,resp)
{     
    

   

    var dataAry1=[req.body.txtEmail,req.body.txtMed,req.body.idp,req.body.txtQty,req.body.txtDate,req.body.txtComp,req.body.txtarea]
    dbref.query("insert into medicines values(?,?,?,?,?,?,1,?,current_date())",dataAry1,function(err,result){
             if(err)
                 resp.send(err);
             else
               resp.send("Inserted Successfully");
    })
})

  


app.get("/adminpanel",function(req,resp){
    var puraPath=process.cwd()+"/public/adminpanel.html";
resp.sendFile(puraPath);
})










/*-----------------------*/









app.get("/block-process",function(req,resp){
    var fullPath=process.cwd() + "/public/blockuser.html"
    resp.sendFile(fullPath);
})

app.get("/all-donor-process",function(req,resp){
    var fullPath=process.cwd() + "/public/alldonors.html"
    resp.sendFile(fullPath);
})

app.get("/all-needy-process",function(req,resp){
    var fullPath=process.cwd() + "/public/allneedy.html"
    resp.sendFile(fullPath);
})


//-------------------------Angular APIS--------------------------------------------------
app.get("/profile-block-angualr",function(req,res)
{                                
    dbref.query("update users set status=0 where email=?",[req.query.txtEmail],function(err,result){
            if(err)
                res.send(err);
            else
            if(result.affectedRows==0)
            res.send("Invalid Id");
            else
                res.send("Blocked Succesfullyyy");
    })
})

app.get("/profile-resume-angualr",function(req,res)
{                                //table col name
    dbref.query("update users set status=1 where email=?",[req.query.txtEmail],function(err,result){
            if(err)
                res.send(err);
            else
            if(result.affectedRows==0)
            res.send("Invalid Id");
            else
                res.send("Resumed Succesfullyyy");
    })
})


app.all("/fetchAllRecords",function(req,resp)
{
    dbref.query("select * from users ",function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

app.all("/fetchDonorRecords",function(req,resp)
{
    dbref.query("select * from dprofile ",function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

app.get("/fetchAllmedicine",function(req,resp)
  {
console.log(req.query.txtCity);
    dbref.query("select * from medicines inner join dprofile on medicines.email =dprofile.email where dprofile.city",[req.query.txtCity],function(err,result){
      //console.log(result);
        if(err)
             resp.send(err);
        else
             resp.send(result);
             console.log(result);
    })
})
             app.get("/fetchmed",function(req,res){
                dbref.query("select distinct medicine from medicines inner join dprofile on medicines.email=dprofile.email where dprofile.city=?",[req.query.txtCity],function(err,resultmed){
                    console.log(resultmed);
                    if(err)
                    {
                        res.send(err);
                    }
                    else
                    {
                        console.log(resultmed);
                        res.send(resultmed);
                    }
                })
            })
            app.get("/fetchcity",function(req,res){

            })