const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");
const Property = require("../models/Property");

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    const seedEmail = "demoagent@propspace.com";

    const existingSeedUser = await User.findOne({ email: seedEmail });

    if (existingSeedUser) {
      await Property.deleteMany({ author: existingSeedUser._id });
      await User.deleteOne({ _id: existingSeedUser._id });
    }

    const demoUser = await User.create({
      username: "demoagent",
      email: seedEmail,
      password: "password123",
      profileName: "Demo Property Agent",
      phone: "689689238",
      avatarUrl:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80",
    });

    const sampleProperties = [
      {
        title: "Executive Apartment in Bastos",
        description:
          "A modern apartment with clean interior finishing, secure parking, reliable water supply, and easy access to main roads, shops, and offices.",
        price: 400000,
        city: "Yaounde",
        country: "Cameroon",
        propertyType: "Apartment",
        imageUrls: [
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        ],
        author: demoUser._id,
      },
      {
        title: "Luxury Family House in Buea",
        description:
          "A spacious family house in a quiet environment with good road access, modern rooms, secure compound, and enough space for parking.",
        price: 350000,
        city: "Buea",
        country: "Cameroon",
        propertyType: "House",
        imageUrls: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
        ],
        author: demoUser._id,
      },
      {
        title: "Modern Studio in Bonamoussadi",
        description:
          "A neat studio apartment suitable for students or young workers, located close to transport, shops, and other daily services.",
        price: 120000,
        city: "Douala",
        country: "Cameroon",
        propertyType: "Studio",
        imageUrls: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
        ],
        author: demoUser._id,
      },
      {
        title: "Furnished Apartment in Molyko",
        description:
          "A fully furnished apartment with a clean sitting room, fitted kitchen, comfortable bedroom, and good security, suitable for students and workers.",
        price: 180000,
        city: "Buea",
        country: "Cameroon",
        propertyType: "Apartment",
        imageUrls: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        ],
        author: demoUser._id,
      },
      {
        title: "Modern Duplex in Bonapriso",
        description:
          "A beautiful duplex with modern finishing, spacious rooms, secure parking, and a calm residential environment suitable for families.",
        price: 600000,
        city: "Douala",
        country: "Cameroon",
        propertyType: "House",
        imageUrls: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        ],
        author: demoUser._id,
      },
    ];

    await Property.insertMany(sampleProperties);

    console.log("Seed data inserted successfully.");
    console.log("Demo login details:");
    console.log("Email: demoagent@propspace.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
