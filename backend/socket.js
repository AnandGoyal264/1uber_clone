
const { Server } = require('socket.io');
const usermodel = require('./models/user.js');
const captainmodel = require('./models/captain_models.js');

let io;



function initializeSocket(server) {
    io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  
    console.log('🟢 Socket initialized');
  
    // ✅ Middleware to extract user info from auth
    io.use((socket, next) => {
      try {
        const { userId, userType } = socket.handshake.auth;
      ///  console.log(`�� Authenticated user: ${userId} [${userType}]`);
        if (!userId || !userType) {
          console.warn('❗ Missing auth fields:', socket.handshake.auth);
          return next(new Error('Missing userId or userType'));
        }
        socket.userId = userId;
        socket.userType = userType;
        next();
      } catch (err) {
        console.error('❌ Error parsing auth:', err);
        return next(new Error('auth parse error'));
      }
    });
  
    io.on('connection', (socket) => {
      console.log(`🔌 User connected: ${socket.id} [${socket.userType}:${socket.userId}] at ${new Date().toLocaleString()}`);
  
      socket.on('join', async (data) => {
        const { userId, userType } = data;
  
        if (!userId || !userType) {
          console.warn('❗ join event missing userId or userType');
          return;
        }
  
     //   console.log(`👤 Join request from ${userType} ${userId}, socket ${socket.id}`);
  
        try {
          if (userType === 'user') {
            const user = await usermodel.findByIdAndUpdate(userId, { socketId: socket.id });
          //  console.log(`✅ User ${userId} socket updated`);
          } else if (userType === 'captain') {
            const captain = await captainmodel.findByIdAndUpdate(userId, { socketId: socket.id });
           // console.log(`✅ Captain ${userId} socket updated`);
          }
        } catch (error) {
          console.error('❌ Error during join:', error);
        }
      });
  
      socket.on('updateLocation', async (data) => {
        const { userId, location } = data;
  
        if (!userId || !location?.ltd || !location?.lng) {
          console.warn('❗ Invalid location update data', data);
          return;
        }
  
        try {
          const updated = await captainmodel.findByIdAndUpdate(
            userId,
            {
              location: {
                ltd: location.ltd,
                lng: location.lng,
              },
            },
            { new: true }
          );
         // console.log(`📍 Location updated for captain ${userId}`);
        } catch (error) {
          console.error('❌ Error updating location:', error);
        }
      });
  
      socket.on('disconnect', (reason) => {
      //  console.log(`❌ User disconnected: ${socket.id}`);
       // console.log(`�� Disconnect reason: ${reason}`);
      });
    });
  
    return io;
  }
  function sendMessage(socketId, message) {
    if (!io) return console.warn('❌ Socket.io not initialized');
    if (!socketId) return console.warn('❗ Missing socketId for sendMessage');
  
    //console.log(`📨 Sending message to ${socketId} ,message`);
 //   console.log(message.type);
    //console.log("message dekh kai h ")
  
    io.to(socketId).emit(message.type, message.data);
   // console.log(`�� Message sent to ${socketId}`);
  }
  
  module.exports = { initializeSocket, sendMessage };
  
  