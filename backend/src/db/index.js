import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
    if(!connectionInstance) {
      throw new Error("Unable to connect db. Some error occured!");
    }

    return true;
  } catch(err) {
    throw err;
  }
}

export { connectDB };