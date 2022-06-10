/**
 * Based on the Redis example from shopify-node-api [Accessed: May 19, 2021]
 * https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md
 */
import SessionModel from "@models/session";
import mongoose from "mongoose";

export default class MongoSessionStore {
  constructor(url) {
    // Create a new redis client
    mongoConnection();
  }

  getByShop = async (shop) => {
    try {
      const result = await SessionModel.findOne({ shop: shop });

      if (result) {
        return result;
      } else {
        return undefined;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  /*
    The storeCallback takes in the Session, and sets a stringified version of it on the redis store
    This callback is used for BOTH saving new Sessions and updating existing Sessions.
    If the session can be stored, return true
    Otherwise, return false
  */
  storeCallback = async (session) => {
    const result = await SessionModel.findOne({ id: session.id });

    if (result === null) {
      await SessionModel.create({
        id: session.id,
        content: JSON.stringify(session),
        shop: session.shop,
      });
    } else {
      await SessionModel.findOneAndUpdate(
        { id: session.id },
        {
          content: JSON.stringify(session),
          shop: session.shop,
        }
      );
    }

    return true;
  };

  /*
    The loadCallback takes in the id, and uses the getAsync method to access the session data
     If a stored session exists, it's parsed and returned
     Otherwise, return undefined
  */
  loadCallback = async (id) => {
    console.log("NOOIS", id);
    const sessionResult = await SessionModel.findOne({ id: id });
    console.log("AQUI", sessionResult);
    if (sessionResult.content.length > 0) {
      return JSON.parse(sessionResult.content);
    }
    return undefined;
  };

  /*
    The deleteCallback takes in the id, and uses the redis `del` method to delete it from the store
    If the session can be deleted, return true
    Otherwise, return false
  */
  deleteCallback = async (id) => {
    await SessionModel.deleteMany({ id });
    return true;
  };
}

export const mongoConnection = async () => {
  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    throw "🚫 No MONGODB_URI provided in the enviroment";
  }
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error(`🚫 Database Error 🚫  → ${err}`);
  });
  // eslint-disable-next-line require-await
  db.once("open", async () => {
    console.log("Connected to mongo!");
  });
};
