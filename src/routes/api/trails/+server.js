import { json } from '@sveltejs/kit';
import { Trail } from '$lib/models/Trail.js';
import { verifyToken } from '$lib/auth.js';
import { connectDB } from '$lib/db.js';

export async function GET({ request }) {
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
    // Get trails for the authenticated user
    const trails = await Trail.find({ userid: decoded.userId });
    return json(trails);
  } catch (error) {
    console.error('Get trails error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST({ request }) {
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

  const { title, location } = await request.json();

  try {
    const trail = new Trail({
      title,
      location,
      userid: decoded.userId
    });

    await trail.save();
    return json(trail, { status: 201 });
  } catch (error) {
    console.error('Create trail error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
