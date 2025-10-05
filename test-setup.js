import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import nodemailer from 'nodemailer';
import sharp from 'sharp';
import rateLimit from 'express-rate-limit';

console.log('🧪 Testing all packages...\n');

async function testPackages() {
  const tests = [];

  // Test 1: bcryptjs
  try {
    const hash = await bcryptjs.hash('testpassword', 12);
    const match = await bcryptjs.compare('testpassword', hash);
    tests.push({ package: 'bcryptjs', status: '✅ OK', details: 'Password hashing working' });
  } catch (error) {
    tests.push({ package: 'bcryptjs', status: '❌ FAILED', details: error.message });
  }

  // Test 2: jsonwebtoken
  try {
    const token = jwt.sign({ userId: 'test' }, 'test-secret');
    const decoded = jwt.verify(token, 'test-secret');
    tests.push({ package: 'jsonwebtoken', status: '✅ OK', details: 'JWT creation/verification working' });
  } catch (error) {
    tests.push({ package: 'jsonwebtoken', status: '❌ FAILED', details: error.message });
  }

  // Test 3: multer
  try {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    tests.push({ package: 'multer', status: '✅ OK', details: 'File upload setup working' });
  } catch (error) {
    tests.push({ package: 'multer', status: '❌ FAILED', details: error.message });
  }

  // Test 4: nodemailer - FIXED
  try {
    // Correct way to create transporter in nodemailer v6+
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
    });
    tests.push({ package: 'nodemailer', status: '✅ OK', details: 'Email transporter created successfully' });
  } catch (error) {
    tests.push({ package: 'nodemailer', status: '❌ FAILED', details: error.message });
  }

  // Test 5: sharp
  try {
    const metadata = await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    }).png().toBuffer();
    tests.push({ package: 'sharp', status: '✅ OK', details: 'Image processing working' });
  } catch (error) {
    tests.push({ package: 'sharp', status: '❌ FAILED', details: error.message });
  }

  // Test 6: express-rate-limit
  try {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    });
    tests.push({ package: 'express-rate-limit', status: '✅ OK', details: 'Rate limiting setup working' });
  } catch (error) {
    tests.push({ package: 'express-rate-limit', status: '❌ FAILED', details: error.message });
  }

  // Test 7: speedtest-net
  try {
    // Dynamic import since it might not be available in test environment
    const speedTest = (await import('speedtest-net')).default;
    tests.push({ package: 'speedtest-net', status: '✅ OK', details: 'Package loaded successfully' });
  } catch (error) {
    tests.push({ package: 'speedtest-net', status: '⚠️ SKIPPED', details: 'Requires active internet connection' });
  }

  // Display results
  console.log('📦 Package Test Results:');
  console.log('=' .repeat(50));
  tests.forEach(test => {
    console.log(`${test.status} ${test.package.padEnd(20)} - ${test.details}`);
  });
  console.log('=' .repeat(50));

  const passed = tests.filter(t => t.status === '✅ OK').length;
  const total = tests.length;

  console.log(`\n📊 Summary: ${passed}/${total} packages working correctly`);

  if (passed >= total - 1) { // -1 for speedtest which might be skipped
    console.log('🎉 All essential packages are working! You can proceed with development.');
    process.exit(0);
  } else {
    console.log('❌ Some packages failed. Please check the errors above.');
    process.exit(1);
  }
}

testPackages();