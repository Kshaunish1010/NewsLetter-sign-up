const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res) {
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const fname=req.body.firstname;
    const lname=req.body.lastname;
    const emailId=req.body.email;
    console.log(fname,lname,emailId);

    var data={
        members :[
            {
                email_address:emailId,
                status: "suscribed" ,
                merge_field:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    const url="";
    const options={
        method:"POST",
        auth:""
    }
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(3000,function(){
    console.log("server is Running at 3000 port");
})
