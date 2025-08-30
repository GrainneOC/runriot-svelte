import { json } from '@sveltejs/kit';
import { User } from '$lib/models/User.js';
import { createToken, hashPassword } from '$lib/auth.js';
import { connectDB } from '$lib/db.js';

export async function POST({ request }) {
  try {
    console.log('=== SIGNUP ATTEMPT ===');
    await connectDB();
    
    const { email, password, firstName, lastName } = await request.json();
    console.log('Creating user:', email);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('User created successfully:', user._id);

    // Create token
    const token = createToken(user._id);

    return json({
      success: true,
      token,
      name: `${user.firstName} ${user.lastName}`,
      id: user._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    return json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
  }
}
