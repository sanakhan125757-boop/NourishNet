const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminUser = new User({
        name: 'Super Admin',
        email: 'admin@foodcare.com',
        password: 'adminpassword123',
        role: 'admin',
        status: 'active'
      });

      await adminUser.save();
      console.log('✅ Admin account created successfully:');
      console.log('   Email: admin@foodcare.com');
      console.log('   Password: adminpassword123');
    } else {
      console.log('ℹ️ Admin account already exists (admin@foodcare.com)');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdmin;
