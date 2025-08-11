// const mongoose = require("mongoose");

// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return;

//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI);
//     isConnected = db.connections[0].readyState;
//     console.log("MongoDBga muvaffaqiyatli ulanildi ✅✅✅");
//   } catch (error) {
//     console.error("MongoDB ulanish xatosi ❌❌❌:", error);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // Agar allaqachon ulanilgan bo‘lsa, saqlangan ulanishni qaytaramiz
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  console.log("MongoDBga muvaffaqiyatli ulanildi ✅✅✅");
  return cached.conn;
};

module.exports = connectDB;
