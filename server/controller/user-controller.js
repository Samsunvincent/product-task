let product = require('../db/model/model')

exports.create = async function (req,res){
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

exports.getproducts = async function (req,res){
    let users_data = await product.find();
    console.log("user_data",users_data);

    res.status(200).send(users_data);
    return;
}

exports.getproduct = async function (req,res){
        
    let id = req.params.id;
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

exports.updateproduct = async function (req,res){
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

    
    let id = req.params.id
  

    let user_data = await product.updateOne({_id:id},{$set:data});
    console.log("user_data",user_data)

    res.status(200).send(user_data)


}

exports.deleteproduct =  async function (req,res){
    try {
        let id = req.params.id
     
    
    let delete_data = await product.deleteOne({_id:id});
    console.log("delete data",delete_data)
    
    res.status(200).send(delete_data)
    
    } catch (error) {
        console.log("error",error)
    }
}