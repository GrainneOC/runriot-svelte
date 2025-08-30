import { json } from '@sveltejs/kit';
import { Trail } from '$lib/models/Trail.js';
import { verifyToken } from '$lib/auth.js';
import { connectDB } from '$lib/db.js';

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
    const trail = await Trail.findById(params.id);
    if (!trail) {
      return json({ error: 'Trail not found' }, { status: 404 });
    }

    // Check if the trail belongs to the authenticated user
    if (trail.userid.toString() !== decoded.userId) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    return json(trail);
  } catch (error) {
    console.error('Get trail error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE({ request, params }) {
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
    const trail = await Trail.findById(params.id);
    if (!trail) {
      return json({ error: 'Trail not found' }, { status: 404 });
    }

    // Check if the trail belongs to the authenticated user
    if (trail.userid.toString() !== decoded.userId) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    await Trail.findByIdAndDelete(params.id);
    return json({ success: true });
  } catch (error) {
    console.error('Delete trail error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
