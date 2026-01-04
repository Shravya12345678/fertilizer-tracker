const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectDB = require('../config/db');
const Dataset = require('../models/Dataset');

const loadDataset = async () => {
  try {
    console.log('='.repeat(60));
    console.log('📦 LOADING CROP RECOMMENDATION DATASET');
    console.log('='.repeat(60));

    await connectDB();
    
    // Clear existing dataset
    console.log('\n🗑️  Clearing existing dataset...');
    const deleted = await Dataset.deleteMany();
    console.log(`   Removed ${deleted.deletedCount} existing records`);

    const data = [];
    const csvPath = path.join(__dirname, '../../datasets/Crop_recommendation.csv');

    console.log(`\n📂 Reading CSV file: ${csvPath}`);

    // Check if file exists
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at: ${csvPath}`);
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          N: parseFloat(row.N),
          P: parseFloat(row.P),
          K: parseFloat(row.K),
          temperature: parseFloat(row.temperature),
          humidity: parseFloat(row.humidity),
          ph: parseFloat(row.ph),
          rainfall: parseFloat(row.rainfall),
          label: row.label.trim()
        });
      })
      .on('end', async () => {
        console.log(`\n✅ CSV file successfully processed`);
        console.log(`   Total rows: ${data.length}`);
        
        // Insert in batches
        console.log('\n💾 Inserting data into MongoDB...');
        await Dataset.insertMany(data);
        console.log(`   ✅ ${data.length} records inserted successfully!`);
        
        // Display statistics
        console.log('\n📊 DATASET STATISTICS:');
        console.log('─'.repeat(60));
        
        const stats = await Dataset.aggregate([
          {
            $group: {
              _id: null,
              totalRecords: { $sum: 1 },
              avgN: { $avg: '$N' },
              avgP: { $avg: '$P' },
              avgK: { $avg: '$K' },
              avgTemp: { $avg: '$temperature' },
              avgHumidity: { $avg: '$humidity' },
              avgPH: { $avg: '$ph' },
              avgRainfall: { $avg: '$rainfall' }
            }
          }
        ]);
        
        if (stats.length > 0) {
          const s = stats[0];
          console.log(`Total Records:     ${s.totalRecords}`);
          console.log(`Avg N:            ${s.avgN.toFixed(2)}`);
          console.log(`Avg P:            ${s.avgP.toFixed(2)}`);
          console.log(`Avg K:            ${s.avgK.toFixed(2)}`);
          console.log(`Avg Temperature:  ${s.avgTemp.toFixed(2)}°C`);
          console.log(`Avg Humidity:     ${s.avgHumidity.toFixed(2)}%`);
          console.log(`Avg pH:           ${s.avgPH.toFixed(2)}`);
          console.log(`Avg Rainfall:     ${s.avgRainfall.toFixed(2)} mm`);
        }

        // Crop distribution
        console.log('\n🌾 CROP DISTRIBUTION:');
        console.log('─'.repeat(60));
        const cropDist = await Dataset.aggregate([
          { $group: { _id: '$label', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]);
        
        cropDist.forEach(crop => {
          console.log(`${crop._id.padEnd(20)} : ${crop.count} samples`);
        });

        console.log('\n✅ Dataset loading completed successfully!');
        console.log('='.repeat(60));
        process.exit(0);
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV:', error.message);
        process.exit(1);
      });

  } catch (error) {
    console.error('❌ Error loading dataset:', error.message);
    process.exit(1);
  }
};

loadDataset();