import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  distance: { type: Number, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
  trailid: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, {
  timestamps: true
});

export const Result = mongoose.model('Result', resultSchema);
