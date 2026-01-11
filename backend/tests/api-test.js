

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