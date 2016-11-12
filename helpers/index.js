import Mongoose from 'mongoose';
import { MONGO_DB_QUERY_STRING } from '../config';

export default function getDb() {
  Mongoose.connect(MONGO_DB_QUERY_STRING);
  return Mongoose.connection;
}
