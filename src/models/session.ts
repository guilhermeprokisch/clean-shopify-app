/**
 * Encrypted Mongo Model to persist sessions across restarts.
 */
import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema({
  id: {
    type: String,
  },
  content: {
    type: String,
  },
  shop: {
    type: String,
  },
});

const SessionModel = models.session || model("session", sessionSchema);
export default SessionModel;
