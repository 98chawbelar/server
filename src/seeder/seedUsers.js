const User = require("../models/user");

const seedUsers = async () => {
  try {
    const users = [
      {
        name: "System Admin",
        role: "ADMIN",
      },
    ];

    for (const userData of users) {
      const exists = await User.findOne({
        name: userData.name,
      });

      if (!exists) {
        await User.create(userData);
      }
    }

    console.log("Default users seeded");
  } catch (error) {
    console.log("Seeder error:", error.message);
  }
};

module.exports = seedUsers;
