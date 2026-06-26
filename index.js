const express = require('express');
const QRCode = require('qrcode');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuration
const config = {
  encryptionKey: "SecretKey12345678901234567890123", // 32 characters
  message: "Your flag is: GCS{qr_crypto_master}",
  iv: "1234567890123456" // 16 characters
};

// Normalize key and IV to required lengths for AES-256-CBC
function normalizeKey(key) {
  return Buffer.from(key.padEnd(32, ' ').substring(0, 32));
}

function normalizeIv(iv) {
  return Buffer.from(iv.padEnd(16, ' ').substring(0, 16));
}

// ==========================================
// ENCRYPTION FUNCTION
// ==========================================
function encryptMessage(message, key, iv) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    normalizeKey(key),
    normalizeIv(iv)
  );
  
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted;
}

// ==========================================
// DECRYPTION FUNCTION
// ==========================================
function decryptMessage(encrypted, key, iv) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    normalizeKey(key),
    normalizeIv(iv)
  );
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// ==========================================
// AUTO-GENERATE QR CODE ENDPOINT
// ==========================================
app.get('/generate-qr', async (req, res) => {
  try {
    // Encrypt the message
    const encryptedMessage = encryptMessage(
      config.message,
      config.encryptionKey,
      config.iv
    );
    
    // QR contains: encrypted_data|IV
    const qrData = `${encryptedMessage}|${config.iv}`;
    
    console.log('QR Data Generated:');
    console.log('   Encrypted: ' + encryptedMessage.substring(0, 20) + '...');
    console.log('   IV: ' + config.iv);
    
    // Generate QR code image (BASE64 data URL)
    const qrCode = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    res.json({ 
      qrCode: qrCode,
      qrData: qrData,  // For debugging
      message: 'QR code generated successfully'
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// DECRYPTION API ENDPOINT
// ==========================================
app.use(express.json());

app.post('/api/decrypt', (req, res) => {
  try {
    const { encrypted, key, iv } = req.body;
    
    if (!encrypted || !key || !iv) {
      return res.json({ 
        success: false, 
        error: 'Missing encrypted data, key, or IV' 
      });
    }
    
    // Normalize key and IV to correct length
    const normalizedKey = Buffer.from(key.padEnd(32, ' ').substring(0, 32));
    const normalizedIV = Buffer.from(iv.padEnd(16, ' ').substring(0, 16));
    
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        normalizedKey,
        normalizedIV
      );
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      console.log('Decryption successful:', decrypted);
      
      // Check if flag is present
      if (decrypted.includes('GCS{')) {
        res.json({ 
          success: true, 
          message: decrypted 
        });
      } else {
        res.json({ 
          success: false, 
          error: 'Decryption worked but no flag found. Wrong key?' 
        });
      }
      
    } catch (error) {
      res.json({ 
        success: false, 
        error: 'Decryption failed. Wrong key or corrupted data.' 
      });
    }
    
  } catch (error) {
    res.json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==========================================
// SERVE STATIC FILES
// ==========================================
app.use(express.static('public'));

// ==========================================
// HINT ENDPOINT
// ==========================================
app.get('/api/hint', (req, res) => {
  res.json({
    hint1: "Check HTML comments and meta tags",
    hint2: "The key contains 'SecretKey' + numbers",
    hint3: "Key should be exactly 32 characters"
  });
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`

 Server running at: http://localhost:${PORT}

 QR Code Endpoint: http://localhost:${PORT}/generate-qr
 Decryption API: POST http://localhost:${PORT}/api/decrypt
 Hints API: http://localhost:${PORT}/api/hint

 Key (hidden on page): ${config.encryptionKey}
 Message: ${config.message}
  `);
});