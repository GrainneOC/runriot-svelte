import { json } from '@sveltejs/kit';
import { Result } from '$lib/models/Result.js';
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
    // Get all results for the authenticated user
    // First get all trails for the user, then get results for those trails
    const userTrails = await Trail.find({ userid: decoded.userId });
    const trailIds = userTrails.map(trail => trail._id);
    
    const results = await Result.find({ 
      trailid: { $in: trailIds } 
    }).populate('trailid', 'title location').sort({ date: -1 });
    
    return json(results);
  } catch (error) {
    console.error('Get results error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
