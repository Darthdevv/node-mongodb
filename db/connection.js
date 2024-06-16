import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = 'carRental';

export async function dbConnection() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (error) {
    console.log("Error connecting to server", error);
  }
}

export const db =  client.db(dbName);
console.log(db);