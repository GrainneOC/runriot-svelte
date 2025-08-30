import { json } from '@sveltejs/kit';
import { Result } from '$lib/models/Result.js';
import { verifyToken } from '$lib/auth.js';
import { connectDB } from '$lib/db.js';

export async function POST({ request, params }) {
  await connectDB();
  
  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return json({ error: 'Invalid token' }, { status: 401 });
  }

  const { distance, duration, date, lat, lng } = await request.json();
  const trailId = params.id;

  try {
    const result = new Result({
      distance,
      duration,
      date,
      trailid: trailId,
      lat,
      lng
    });

    await result.save();
    return json(result, { status: 201 });
  } catch (error) {
    console.error('Create result error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET({ request, params }) {
  await connectDB();

  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    // Get results for the specific trail
    const results = await Result.find({ trailid: params.id }).sort({ date: -1 });
    return json(results);
  } catch (error) {
    console.error('Get results by trail error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
