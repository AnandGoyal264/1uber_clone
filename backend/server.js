

const http=require('http');
const app=require('./app.js');
const server=http.createServer(app);
const port=process.env.PORT|| 3000;
const connectdb=require('./db/db.js');
const {initializeSocket}=require('./socket.js')
initializeSocket(server);



connectdb().then(() => {
    server.listen(port, () => {
        console.log(`✅ Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log("❌ Failed to connect to database", err);
});





