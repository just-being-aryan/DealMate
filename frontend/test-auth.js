// Test script to create a user and test authentication
// Run this from the DealMate root directory: node test-auth.js

const API_BASE_URL = 'http://localhost:8000/api';

async function testAuth() {
  console.log('🔧 Testing Authentication...\n');

  // Test data
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'buyer'
  };

  try {
    // 1. Test Registration
    console.log('📝 Testing User Registration...');
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const registerResult = await registerResponse.json();
    
    if (registerResponse.ok) {
      console.log('✅ Registration successful!');
      console.log('Token:', registerResult.token.substring(0, 20) + '...');
      console.log('User:', registerResult.data);
    } else {
      console.log('⚠️ Registration failed:', registerResult.message);
      console.log('This is expected if user already exists.');
    }

    console.log('\n🔐 Testing User Login...');
    
    // 2. Test Login
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    const loginResult = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('Token:', loginResult.token.substring(0, 20) + '...');
      console.log('User:', loginResult.data);
      
      const token = loginResult.token;
      
      // 3. Test Delete Profile (WARNING: This will delete the test user!)
      console.log('\n⚠️ Testing Delete Profile (will delete test user)...');
      const deleteResponse = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (deleteResponse.ok) {
        console.log('✅ Profile delete successful!');
        console.log('Test user has been deleted.');
      } else {
        const deleteResult = await deleteResponse.json();
        console.log('❌ Profile delete failed:', deleteResult.message);
      }

    } else {
      console.log('❌ Login failed:', loginResult.message);
    }

  } catch (error) {
    console.error('💥 Error during testing:', error.message);
    console.log('Make sure the backend server is running on port 8000');
  }
}

// Run the test
testAuth();
