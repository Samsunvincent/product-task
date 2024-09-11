const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()
const{MongoClient,ObjectId} = require('mongodb')
const querystring = require('querystring');

app.use(express.static('../client'))
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

async function mongoConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established")
    } catch (error) {
        console.log('database connection error',error)
    }
}

let userSchema = new mongoose.Schema({
    name : String,
    image : String,
    price : Number,
    category : String,
    use : String,
    description:String,
})
let product = mongoose.model('product',userSchema)
mongoConnect();

app.post('/submit',
    async(req,res)=>{
        let body = req.body;
        console.log("body",body);

        let name  = body.name;
        console.log("name",name);

        //save to database 
        let new_user = await product.create(body)

        if(new_user){
            res.status(200).send("user created successfully");
          
            return;
        }else {
            res.status(400).send("user creation failed");
            return;
        }
    }
)
app.get('/submit',
    async (req,res)=>{
        let users_data = await product.find();
        console.log("user_data",users_data);

        res.status(200).send(users_data);
        return;
})
app.get('/user',
    async (req,res)=>{
        
        let id = req.query.id;
        console.log("id",id)
        
        let user_data = await product.findOne({_id:id});
        console.log("user_data",user_data);
        
        let stringified_data = JSON.stringify(user_data)
        console.log("stringified data",stringified_data);

        if(stringified_data){
            res.status(200).send(stringified_data)
        }else{
            res.status(400).send("something went wrong while fetching")
        }
    }
)


app.put('/user',
    async (req,res)=>{
        let body = req.body;
        console.log('body from put',body);

        let data ={
            name : body.name,
            image : body.image,
            price : body.price,
            category : body.category,
            use : body.use,
            description : body.description

        }
        console.log("data",data);

        
        let id = req.query.id
        
        let _id = new ObjectId(id);
        console.log("_id : ",_id);

        let user_data = await product.updateOne({_id},{$set:data});
        console.log("user_data",user_data)

        res.status(200).send(user_data)


    }
)

app.delete('/user',
    async (req,res)=>{
        let id = req.query.id
        
        let _id = new ObjectId(id);
        console.log("_id : ",_id);   
        
        let delete_data = await product.deleteOne({_id});
        console.log("delete data",delete_data)

        if(delete_data){
            res.status(200).send('deleted your profile')
        }
        else{
            res.status(404).send("deletion failed")
        }
    }
)

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})
