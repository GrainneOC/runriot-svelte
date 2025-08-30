import { json } from '@sveltejs/kit';
import { User } from '$lib/models/User.js';
import { createToken, hashPassword, comparePassword } from '$lib/auth.js';
import { connectDB } from '$lib/db.js';

export async function POST({ request }) {
  await connectDB();
  const { email, password, firstName, lastName } = await request.json();

  try {
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
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
