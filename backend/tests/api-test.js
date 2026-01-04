//1
// const axios = require('axios');

// const BASE_URL = 'http://localhost:5000/api';
// let authToken = '';
// let cropId = '';
// let thermalDataId = '';

// const runTests = async () => {
//   console.log('='.repeat(60));
//   console.log('API TESTING SUITE');
//   console.log('='.repeat(60));

//   try {
//     // 1. Register
//     console.log('\n📝 Test 1: Register User');
//     const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
//       username: `testuser_${Date.now()}`,
//       email: `test_${Date.now()}@example.com`,
//       password: 'password123',
//       role: 'farmer'
//     });
//     console.log('✅ Registration successful');
//     authToken = registerRes.data.data.token;

//     // 2. Login
//     console.log('\n🔐 Test 2: Login');
//     const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
//       email: registerRes.data.data.user.email,
//       password: 'password123'
//     });
//     console.log('✅ Login successful');

//     // 3. Create crop
//     console.log('\n🌾 Test 3: Create Crop');
//     const cropRes = await axios.post(`${BASE_URL}/crops`, {
//       cropName: 'Test Rice Field',
//       cropType: 'rice',
//       plantingDate: new Date(),
//       soilData: { N: 60, P: 45, K: 40, pH: 6.5 },
//       fieldSize: 2.5
//     }, {
//       headers: { Authorization: `Bearer ${authToken}` }
//     });
//     cropId = cropRes.data.data.crop._id;
//     console.log(`✅ Crop created: ${cropId}`);

//     // 4. Create thermal data
//     console.log('\n🌡️  Test 4: Create Thermal Data');
//     const thermalRes = await axios.post(`${BASE_URL}/thermal`, {
//       cropId,
//       beforeTemp: 28.5,
//       afterTemp: 26.2,
//       environmental: {
//         temperature: 30.0,
//         humidity: 65.0,
//         rainfall: 100.0
//       }
//     }, {
//       headers: { Authorization: `Bearer ${authToken}` }
//     });
//     thermalDataId = thermalRes.data.data.thermalData._id;
//     console.log(`✅ Thermal data created: ${thermalDataId}`);

//     // 5. Analyze
//     console.log('\n🤖 Test 5: Analyze with ML');
//     try {
//       const analysisRes = await axios.post(
//         `${BASE_URL}/analysis/thermal/${thermalDataId}`,
//         {},
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       console.log(`✅ Analysis complete:`);
//       console.log(`   Efficiency: ${analysisRes.data.data.mlAnalysis.efficiency_score}%`);
//     } catch (error) {
//       console.log('⚠️  ML Service not available');
//     }

//     console.log('\n' + '='.repeat(60));
//     console.log('✅ ALL TESTS PASSED!');
//     console.log('='.repeat(60));

//   } catch (error) {
//     console.error('\n❌ TEST FAILED:');
//     console.error(`   ${error.response?.data?.message || error.message}`);
//     process.exit(1);
//   }
// };

// runTests();






//2
// const axios = require('axios');

// const BASE_URL = 'http://localhost:5000/api';
// let authToken = '';
// let cropId = '';

// const runTests = async () => {
//   console.log('='.repeat(60));
//   console.log('🚀 API TESTING SUITE - FINAL FIX');
//   console.log('='.repeat(60));

//   try {
//     // 1. Register & Login
//     console.log('\n📝 Test 1 & 2: Auth');
//     const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
//       username: `user_${Date.now()}`,
//       email: `test_${Date.now()}@test.com`,
//       password: 'password123',
//       role: 'farmer'
//     });
//     authToken = registerRes.data.data.token;
//     console.log('✅ Auth successful');

//     // 2. Create crop
//     console.log('\n🌾 Test 3: Create Crop');
//     const cropRes = await axios.post(`${BASE_URL}/crops`, {
//       cropName: 'Rice Field 101',
//       cropType: 'rice',
//       plantingDate: new Date(),
//       soilData: { 
//         N: 80, 
//         P: 40, 
//         K: 40, 
//         pH: 6.5 
//       },
//       fieldSize: 5
//     }, {
//       headers: { Authorization: `Bearer ${authToken}` }
//     });
    
//     cropId = cropRes.data.data.crop._id;
//     console.log(`✅ Crop created: ${cropId}`);

//     console.log('\n' + '='.repeat(60));
//     console.log('✅ ALL TESTS PASSED!');
//     console.log('='.repeat(60));

//   } catch (error) {
//     console.error('\n❌ TEST FAILED:');
//     console.error(`  ${error.response?.data?.message || error.message}`);
//     if (error.response?.data?.error) console.error(`  Detail: ${error.response.data.error}`);
//     process.exit(1);
//   }
// };

// runTests();



//3
// const axios = require('axios');

// const BASE_URL = 'http://localhost:5000/api';
// let authToken = '';
// let cropId = '';
// let thermalId = '';

// const runTests = async () => {
//     console.log('='.repeat(60));
//     console.log('🚀 FERTILIZER TRACKER: FULL SYSTEM INTEGRATION TEST');
//     console.log('='.repeat(60));

//     try {
//         // 1 & 2: Auth
//         console.log('\n🔐 Step 1 & 2: Auth and Login');
//         const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
//             username: `farmer_${Date.now()}`,
//             email: `test_${Date.now()}@farm.com`,
//             password: 'password123',
//             role: 'farmer'
//         });
//         authToken = registerRes.data.data.token;
//         console.log('✅ Auth successful');

//         // 3: Create Crop
//         console.log('\n🌾 Step 3: Creating Crop Record');
//         const cropRes = await axios.post(`${BASE_URL}/crops`, {
//             cropName: 'Basmati Rice Field',
//             cropType: 'rice',
//             plantingDate: new Date(),
//             soilData: { N: 80, P: 40, K: 40, pH: 6.5 },
//             fieldSize: 5
//         }, { headers: { Authorization: `Bearer ${authToken}` } });
//         cropId = cropRes.data.data.crop._id;
//         console.log(`✅ Crop created: ${cropId}`);

//         // 4: Create Thermal Measurement
//         console.log('\n🌡️  Step 4: Recording Thermal/Sensor Data');
//         const thermalRes = await axios.post(`${BASE_URL}/thermal`, {
//             cropId: cropId,
//             sensorData: {
//                 n: 80, p: 40, k: 40,
//                 temperature: 28.5,
//                 humidity: 65,
//                 ph: 6.5,
//                 rainfall: 120,
//                 thermalDelta: -1.8,
//                 greenRatio: 0.78
//             }
//         }, { headers: { Authorization: `Bearer ${authToken}` } });
//         thermalId = thermalRes.data.data.thermalData._id;
//         console.log(`✅ Sensor data recorded: ${thermalId}`);

//         // 5: Trigger AI Analysis
//         console.log('\n🤖 Step 5: Requesting AI Prediction (Port 5001)');
//         const analysisRes = await axios.post(
//             `${BASE_URL}/analysis/thermal/${thermalId}`, 
//             {}, 
//             { headers: { Authorization: `Bearer ${authToken}` } }
//         );

//         console.log('\n✨ AI BRAIN RESPONSE:');
//         console.log('--------------------------------------------');
//         console.log(`📊 Efficiency Score: ${analysisRes.data.data.mlAnalysis.efficiencyScore}%`);
//         console.log(`⚠️  Status: ${analysisRes.data.data.mlAnalysis.deficiency}`);
//         console.log(`💡 Recommendation: ${analysisRes.data.data.mlAnalysis.recommendations[0]}`);
//         console.log('--------------------------------------------');

//         console.log('\n🏆 CONGRATULATIONS! THE BRAIN BRIDGE IS COMPLETE.');

//     } catch (error) {
//         console.error('\n❌ TEST FAILED:');
//         console.error(`   Message: ${error.response?.data?.message || error.message}`);
//         if (error.response?.data?.error) console.error(`   Detail: ${error.response.data.error}`);
//         process.exit(1);
//     }
// };

// runTests();

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let cropId = '';
let thermalDataId = '';

const runTests = async () => {
  console.log('='.repeat(60));
  console.log('🚀 FERTILIZER TRACKER: FINAL INTEGRATION TEST');
  console.log('='.repeat(60));

  try {
    // 1. Register & 2. Login
    console.log('\n📝 Test 1 & 2: Auth');
    const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
      username: `farmer_${Date.now()}`,
      email: `test_${Date.now()}@agri.com`,
      password: 'password123',
      role: 'farmer'
    });
    authToken = registerRes.data.data.token;
    console.log('✅ Auth successful');

    // 3. Create crop
    console.log('\n🌾 Test 3: Create Crop');
    const cropRes = await axios.post(`${BASE_URL}/crops`, {
      cropName: 'Basmati Rice Field',
      cropType: 'rice',
      plantingDate: new Date(),
      soilData: { N: 80, P: 40, K: 40, pH: 6.5 },
      fieldSize: 2.5
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    cropId = cropRes.data.data.crop._id;
    console.log(`✅ Crop created: ${cropId}`);

    // 4. Create thermal data (MATCHED TO YOUR MODEL)
    console.log('\n🌡️  Test 4: Create Thermal Data');
    const thermalRes = await axios.post(`${BASE_URL}/thermal`, {
      cropId: cropId,
      beforeTemp: 28.5,
      afterTemp: 26.7,
      environmental: {
        temperature: 30.0,
        humidity: 65.0,
        rainfall: 100.0,
        soilMoisture: 45.0
      },
      fertilizer: {
        type: 'NPK',
        N_content: 80,
        P_content: 40,
        K_content: 40,
        amount: 50,
        unit: 'kg'
      }
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    thermalDataId = thermalRes.data.data.thermalData._id;
    console.log(`✅ Thermal data created: ${thermalDataId}`);

    // 5. Analyze with AI
    console.log('\n🤖 Test 5: Trigger AI Analysis');
    const analysisRes = await axios.post(
      `${BASE_URL}/analysis/thermal/${thermalDataId}`,
      {},
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    
    console.log('✅ Analysis complete!');
    console.log('--------------------------------------------');
    // Note: Adjusting response keys based on common ML output
    const results = analysisRes.data.data.mlAnalysis;
    console.log(`📊 Result: ${results.efficiencyScore || results.efficiency_score}% Efficient`);
    console.log(`🌱 Suggestion: ${results.recommendations?.[0] || 'Check soil moisture'}`);
    console.log('--------------------------------------------');

    console.log('\n🏆 DAY 4 MISSION ACCOMPLISHED!');

  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error(`  Status: ${error.response?.status}`);
    console.error(`  Message: ${error.response?.data?.message || error.message}`);
    if (error.response?.data?.errors) {
        console.error('  Validation Errors:', error.response.data.errors);
    }
    process.exit(1);
  }
};

runTests();