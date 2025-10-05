import express from 'express';

const toolsRoute = express.Router();

// Internet speed test
toolsRoute.get('/speedtest', async (req, res) => {
  try {
    // Simple speed test simulation
    const downloadSpeed = (Math.random() * 100 + 10).toFixed(2);
    const uploadSpeed = (Math.random() * 50 + 5).toFixed(2);
    const ping = (Math.random() * 50 + 10).toFixed(0);
    
    res.json({
      download: downloadSpeed,
      upload: uploadSpeed,
      ping: ping,
      server: 'Local Test Server',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Speed test failed', error: error.message });
  }
});

// Image conversion info endpoint
toolsRoute.get('/image-converter', (req, res) => {
  res.json({
    message: 'Image converter service',
    supportedFormats: ['JPEG', 'PNG', 'WEBP', 'GIF'],
    maxSize: '50MB'
  });
});

// Video conversion info endpoint
toolsRoute.get('/video-converter', (req, res) => {
  res.json({
    message: 'Video converter service',
    supportedFormats: ['MP4', 'MKV', 'AVI', 'MOV'],
    maxSize: '100MB'
  });
});

export default toolsRoute;