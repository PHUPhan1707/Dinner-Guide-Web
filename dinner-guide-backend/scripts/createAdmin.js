const { User } = require('../models');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Create or update admin user
    const [user, created] = await User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // This will be hashed by the User model hooks
        role: 'admin',
        isVerified: true
      }
    });

    if (!created) {
      // If user exists, ensure they are an admin
      await user.update({
        role: 'admin',
        isVerified: true
      });
    }

    console.log(created ? 'Admin user created!' : 'Admin user updated!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 