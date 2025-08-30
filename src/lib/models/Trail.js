import mongoose from 'mongoose';

const trailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  img: { type: String }
}, {
  timestamps: true
});

export const Trail = mongoose.model('Trail', trailSchema);
