import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URL;

if (!uri) {
  throw new Error("Please add your MONGO_DB_URL to .env");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClient = client;
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  client = global._mongoClient!;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export { client, clientPromise };
