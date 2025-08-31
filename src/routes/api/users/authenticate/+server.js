import { json } from '@sveltejs/kit';
import { User } from '$lib/models/User.js';
import { createToken, comparePassword } from '$lib/auth.js';
import { connectDB } from '$lib/db.js';

export async function POST({ request }) {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Connecting to database...');
    
    await connectDB();
    console.log('Database connected successfully');
    
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    console.log('User found:', user._id);

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    console.log('Password validated successfully');

    // Create token
    const token = createToken(user._id);
    console.log('Token created successfully');

    return json({
      success: true,
      token,
      name: `${user.firstName} ${user.lastName}`,
      id: user._id
    });
  } catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Full error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
  }
}
