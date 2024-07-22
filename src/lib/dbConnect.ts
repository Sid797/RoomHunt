// src/lib/dbConnect.ts

import mongoose from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: Cached;
    }
  }
}

let cached: Cached = global.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
