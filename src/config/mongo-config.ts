import { Agenda } from "@hokify/agenda";
import { MongoClient } from "mongodb";

export const MONGO_CONNECTION_STRING = process.env.SMDP_MONGO_DB_URL!;
export const createMongoClient = () => new MongoClient(MONGO_CONNECTION_STRING);