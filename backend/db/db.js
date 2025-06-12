const mongoose=require('mongoose');


const connectdb = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://anandgoyal5656:D3zoLhU2Wob56d73@cluster0.cdcdw.mongodb.net/uber?retryWrites=true&w=majority&appName=Cluster0",
            
          );
        console.log("✅ Connected successfully to MongoDB!");
    } 
    catch (err) {
        console.log("❌ Error connecting to MongoDB:", err);
    }
};

module.exports = connectdb;

 