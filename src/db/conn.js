const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/pawworld",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family: 4,
}) .then(()=>{
    console.log(`connection succesful`);
}) .catch((e)=>{
    console.log(e);
})