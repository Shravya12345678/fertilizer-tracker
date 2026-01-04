const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const Dataset = require('../models/Dataset');
const User = require('../models/User');
const Crop = require('../models/Crop');
const ThermalData = require('../models/ThermalData');

const exploreData = async () => {
  try {
    console.log('='.repeat(60));
    console.log('🔍 DATABASE EXPLORATION');
    console.log('='.repeat(60));

    await connectDB();

    // Dataset statistics
    console.log('\n📊 TRAINING DATASET STATISTICS:');
    console.log('─'.repeat(60));
    
    const datasetCount = await Dataset.countDocuments();
    console.log(`Total samples: ${datasetCount}`);

    if (datasetCount > 0) {
      const cropDist = await Dataset.aggregate([
        { $group: { _id: '$label', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      
      console.log('\nCrop Distribution:');
      cropDist.forEach(crop => {
        console.log(`  ${crop._id.padEnd(20)}: ${crop.count}`);
      });

      // NPK Statistics
      const npkStats = await Dataset.aggregate([
        {
          $group: {
            _id: null,
            avgN: { $avg: '$N' },
            minN: { $min: '$N' },
            maxN: { $max: '$N' },
            avgP: { $avg: '$P' },
            minP: { $min: '$P' },
            maxP: { $max: '$P' },
            avgK: { $avg: '$K' },
            minK: { $min: '$K' },
            maxK: { $max: '$K' }
          }
        }
      ]);

      if (npkStats.length > 0) {
        const stats = npkStats[0];
        console.log('\nNPK Statistics:');
        console.log(`  N: ${stats.avgN.toFixed(2)} (${stats.minN} - ${stats.maxN})`);
        console.log(`  P: ${stats.avgP.toFixed(2)} (${stats.minP} - ${stats.maxP})`);
        console.log(`  K: ${stats.avgK.toFixed(2)} (${stats.minK} - ${stats.maxK})`);
      }

      // Sample data
      console.log('\nSample Data (first 3 records):');
      const samples = await Dataset.find().limit(3);
      console.table(samples.map(s => ({
        N: s.N,
        P: s.P,
        K: s.K,
        Temp: s.temperature,
        Humidity: s.humidity,
        pH: s.ph,
        Crop: s.label
      })));
    } else {
      console.log('⚠️  No training dataset found. Run: npm run load-dataset');
    }

    // Application data statistics
    console.log('\n👥 APPLICATION DATA:');
    console.log('─'.repeat(60));
    
    const userCount = await User.countDocuments();
    const cropCount = await Crop.countDocuments();
    const thermalCount = await ThermalData.countDocuments();

    console.log(`Users:                ${userCount}`);
    console.log(`Crops:                ${cropCount}`);
    console.log(`Thermal Measurements: ${thermalCount}`);

    if (userCount === 0) {
      console.log('\n⚠️  No application data found. Run: npm run seed');
    } else {
      // User breakdown
      const usersByRole = await User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]);
      
      console.log('\nUsers by Role:');
      usersByRole.forEach(role => {
        console.log(`  ${role._id}: ${role.count}`);
      });

      // Crop breakdown
      if (cropCount > 0) {
        const cropsByType = await Crop.aggregate([
          { $group: { _id: '$cropType', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]);
        
        console.log('\nCrops by Type:');
        cropsByType.forEach(crop => {
          console.log(`  ${crop._id}: ${crop.count}`);
        });
      }

      // Thermal data status
      if (thermalCount > 0) {
        const processedCount = await ThermalData.countDocuments({ processed: true });
        const unprocessedCount = await ThermalData.countDocuments({ processed: false });
        
        console.log('\nThermal Data Status:');
        console.log(`  Processed:   ${processedCount}`);
        console.log(`  Unprocessed: ${unprocessedCount}`);
      }
    }

    console.log('\n✅ Data exploration completed!');
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error exploring data:', error.message);
    process.exit(1);
  }
};

exploreData();