const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Crop = require('../models/Crop');
const ThermalData = require('../models/ThermalData');

const seedData = async () => {
  try {
    console.log('='.repeat(60));
    console.log('🌱 SEEDING DATABASE WITH TEST DATA');
    console.log('='.repeat(60));

    await connectDB();

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany();
    await Crop.deleteMany();
    await ThermalData.deleteMany();
    console.log('   ✅ Existing data cleared');

    // Create test users
    console.log('\n👤 Creating test users...');
    
    const farmer = await User.create({
      username: 'testfarmer',
      email: 'farmer@test.com',
      password: 'password123',
      role: 'farmer',
      profile: {
        firstName: 'John',
        lastName: 'Farmer',
        phone: '+91-9876543210',
        location: 'Karnataka, India'
      }
    });
    console.log(`   ✅ Farmer created: ${farmer.email}`);

    const agronomist = await User.create({
      username: 'testagronomist',
      email: 'agronomist@test.com',
      password: 'password123',
      role: 'agronomist',
      profile: {
        firstName: 'Dr. Sarah',
        lastName: 'Smith',
        phone: '+91-9876543211',
        location: 'Bengaluru, India'
      }
    });
    console.log(`   ✅ Agronomist created: ${agronomist.email}`);

    // Create sample crops
    console.log('\n🌾 Creating sample crops...');
    
    const crops = [
      {
        userId: farmer._id,
        cropName: 'Rice Field A',
        cropType: 'rice',
        plantingDate: new Date('2024-01-15'),
        location: {
          address: 'Farm Plot 1, Karnataka',
          fieldName: 'North Field'
        },
        soilData: {
          N: 60,
          P: 45,
          K: 40,
          pH: 6.5
        },
        fieldSize: 2.5,
        status: 'active'
      },
      {
        userId: farmer._id,
        cropName: 'Wheat Field B',
        cropType: 'wheat',
        plantingDate: new Date('2024-02-01'),
        location: {
          address: 'Farm Plot 2, Karnataka',
          fieldName: 'South Field'
        },
        soilData: {
          N: 50,
          P: 40,
          K: 50,
          pH: 7.0
        },
        fieldSize: 3.0,
        status: 'active'
      },
      {
        userId: farmer._id,
        cropName: 'Maize Field C',
        cropType: 'maize',
        plantingDate: new Date('2024-01-20'),
        location: {
          address: 'Farm Plot 3, Karnataka',
          fieldName: 'East Field'
        },
        soilData: {
          N: 70,
          P: 50,
          K: 45,
          pH: 6.8
        },
        fieldSize: 1.5,
        status: 'active'
      }
    ];

    const createdCrops = await Crop.insertMany(crops);
    console.log(`   ✅ ${createdCrops.length} crops created`);

    // Create sample thermal data
    console.log('\n🌡️  Creating sample thermal measurements...');

    const thermalData = [];
    for (const crop of createdCrops) {
      for (let i = 0; i < 2; i++) {
        const daysAgo = i * 7;
        const measurementDate = new Date();
        measurementDate.setDate(measurementDate.getDate() - daysAgo);
        const beforeTemp = 28 + Math.random() * 2;
        const afterTemp = 26 + Math.random() * 2;
        const thermalDelta = afterTemp - beforeTemp; // Manually calculate here
        
        thermalData.push({
          cropId: crop._id,
          userId: farmer._id,
          measurementDate: measurementDate,
          beforeTemp: beforeTemp,
          afterTemp: afterTemp,
          thermalDelta: thermalDelta, // 2. Explicitly include the calculated delta
          environmental: {
            temperature: 30 + Math.random() * 5,
            humidity: 60 + Math.random() * 20,
            rainfall: 50 + Math.random() * 50
          },
          
          fertilizer: {
            type: 'NPK',
            amount: 50,
            unit: 'kg',
            applicationDate: new Date(measurementDate.getTime() - 2 * 24 * 60 * 60 * 1000),
            N_content: 20,
            P_content: 20,
            K_content: 20
          },
          processed: false
        });
      }
    }


    
    // const thermalData = [];
    
    // for (const crop of createdCrops) {
    //   // Create 2 thermal measurements per crop
    //   for (let i = 0; i < 2; i++) {
    //     const daysAgo = i * 7; // 0 and 7 days ago
    //     const measurementDate = new Date();
    //     measurementDate.setDate(measurementDate.getDate() - daysAgo);

    //     thermalData.push({
    //       cropId: crop._id,
    //       userId: farmer._id,
    //       measurementDate: measurementDate,
    //       beforeTemp: 28 + Math.random() * 2,
    //       afterTemp: 26 + Math.random() * 2,
    //       environmental: {
    //         temperature: 30 + Math.random() * 5,
    //         humidity: 60 + Math.random() * 20,
    //         rainfall: 50 + Math.random() * 50
    //       },
    //       fertilizer: {
    //         type: 'NPK',
    //         amount: 50,
    //         unit: 'kg',
    //         applicationDate: new Date(measurementDate.getTime() - 2 * 24 * 60 * 60 * 1000),
    //         N_content: 20,
    //         P_content: 20,
    //         K_content: 20
    //       },
    //       processed: false
    //     });
    //   }
    // }

    // ... inside the seedData function, locate the thermal measurements loop



    const createdThermalData = await ThermalData.insertMany(thermalData);
    console.log(`   ✅ ${createdThermalData.length} thermal measurements created`);

    // Summary
    console.log('\n📊 SEED DATA SUMMARY:');
    console.log('─'.repeat(60));
    console.log(`Users created:              ${2}`);
    console.log(`Crops created:              ${createdCrops.length}`);
    console.log(`Thermal measurements:       ${createdThermalData.length}`);
    
    console.log('\n🔐 TEST LOGIN CREDENTIALS:');
    console.log('─'.repeat(60));
    console.log('Farmer Account:');
    console.log('  Email: farmer@test.com');
    console.log('  Password: password123');
    console.log('\nAgronomist Account:');
    console.log('  Email: agronomist@test.com');
    console.log('  Password: password123');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedData();