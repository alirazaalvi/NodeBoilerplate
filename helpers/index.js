import Mongoose from 'mongoose';
import {MONGO_DB_QUERY_STRING} from '../config';
export function getDb() {
  Mongoose.connect(MONGO_DB_QUERY_STRING);
  return Mongoose.connection;
}
