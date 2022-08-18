import { model, Schema } from "mongoose";

const RingSchema = new Schema({
  name: { type: String, unique: true },
  private: Boolean,
  members: [{ type: String }],
});

const Ring = model("Ring", RingSchema);

export default Ring;