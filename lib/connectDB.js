import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// UserSchema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  avatar: { type: String },
  bio: { type: String },
  birthday: { type: Date },
  location: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//GameIdSchema
const gameIdSchema = new mongoose.Schema({
  gameWord: { type: String, required: true },
  createdAt: { type: Date, expires: '7d', default: Date.now },
});

let User;

if (mongoose.models.User) {
  User = mongoose.models.User;
} else {
  User = mongoose.model('User', userSchema);
}

let GameId;

if (mongoose.models.GameId) {
  GameId = mongoose.models.GameId;
} else {
  GameId = mongoose.model('GameId', gameIdSchema);
}

const dictionarySchema = new mongoose.Schema({
  word: { type: String, required: true },
  length: { type: Number, required: true },
});

let Dictionary;
if (mongoose.models.Dictionary) {
  Dictionary = mongoose.models.Dictionary;
} else {
  Dictionary = mongoose.model('Dictionary', dictionarySchema);
}

export { connectDB, User, GameId, Dictionary };
