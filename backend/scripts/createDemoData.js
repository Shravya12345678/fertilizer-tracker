const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Crop = require('../models/Crop');
const ThermalData = require('../models/ThermalData');

const createDemoData = async () => {
  try {
    console.log('🌱 Creating comprehensive demo data...\n');
    
    await connectDB();

    // Create demo user
    const demoUser = await User.create({
      username: 'demo_farmer',
      email: 'demo@fertilizer-tracker.com',
      password: 'demo123',
      role: 'farmer',
      profile: {
        firstName: 'Demo',
        lastName: 'Farmer',
        location: 'Karnataka, India'
      }
    });

    console.log('✅ Demo user created');

    // Create multiple crops with variety
    const crops = [
      {
        userId: demoUser._id,
        cropName: 'Rice Field Alpha',
        cropType: 'rice',
        plantingDate: new Date('2024-01-15'),
        soilData: { N: 80, P: 60, K: 55, pH: 6.8 },
        fieldSize: 3.5,
        status: 'active'
      },
      {
        userId: demoUser._id,
        cropName: 'Wheat Farm Beta',
        cropType: 'wheat',
        plantingDate: new Date('2024-02-01'),
        soilData: { N: 45, P: 35, K: 40, pH: 7.2 },
        fieldSize: 2.0,
        status: 'active'
      },
      {
        userId: demoUser._id,
        cropName: 'Corn Plantation',
        cropType: 'maize',
        plantingDate: new Date('2023-12-10'),
        soilData: { N: 90, P: 70, K: 65, pH: 6.5 },
        fieldSize: 4.0,
        status: 'harvested'
      }
    ];

    const createdCrops = await Crop.insertMany(crops);
    console.log(`✅ ${createdCrops.length} crops created`);

    // Create thermal data with analyzed results
    const thermalRecords = [];

    for (const crop of createdCrops) {
      // Create 3 measurements per crop
      for (let i = 0; i < 3; i++) {
        const daysAgo = i * 10;
        const measurementDate = new Date();
        measurementDate.setDate(measurementDate.getDate() - daysAgo);

        const beforeTemp = 28 + Math.random() * 3;
        const afterTemp = beforeTemp - (1 + Math.random() * 2); // Cooling effect
        const efficiency = 60 + Math.random() * 30;

        thermalRecords.push({
          cropId: crop._id,
          userId: demoUser._id,
          measurementDate,
          beforeTemp: parseFloat(beforeTemp.toFixed(1)),
          afterTemp: parseFloat(afterTemp.toFixed(1)),
          environmental: {
            temperature: 30 + Math.random() * 5,
            humidity: 60 + Math.random() * 20,
            rainfall: 50 + Math.random() * 100
          },
          fertilizer: {
            type: 'NPK',
            amount: 50,
            unit: 'kg'
          },
          processed: true,
          analysis: {
            efficiencyScore: parseFloat(efficiency.toFixed(2)),
            deficiencies: efficiency > 70 ? ['Balanced'] : ['N_deficient'],
            recommendations: efficiency > 70 
              ? '✓ Good fertilizer efficiency!\n✓ Nutrient levels are balanced!\n🌡️ Excellent transpiration activity.'
              : '⚠️ Low fertilizer efficiency detected.\n🌱 Nitrogen deficiency detected. Apply urea.\n🌡️ Increase irrigation.',
            stressLevel: efficiency > 70 ? 'low' : 'medium'
          },
          processingDetails: {
            processedAt: new Date(),
            modelVersion: '1.0.0',
            confidence: 85 + Math.random() * 10
          }
        });
      }
    }

    await ThermalData.insertMany(thermalRecords);
    console.log(`✅ ${thermalRecords.length} thermal measurements created\n`);

    console.log('🎉 Demo data created successfully!\n');
    console.log('📝 Demo Credentials:');
    console.log('   Email: demo@fertilizer-tracker.com');
    console.log('   Password: demo123');
    console.log('\n✅ You can now login and explore the demo data!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createDemoData();