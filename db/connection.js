import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = 'carRental';
let db;

export async function dbConnection() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
    const Users = db.collection("users");
  } catch (error) {
    console.log("Error connecting to server", error);
  }
}

export { db };