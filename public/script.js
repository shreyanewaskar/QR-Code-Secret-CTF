// ============================================
// QR Code Secret Challenge - Client-side Code
// ============================================

// Hidden configuration (can be found by inspecting)
window.config = {
    encryptionKey: "SecretKey1234567890123456789012", // Find this!
    iv: "InitializationVe",
    algorithm: "AES-256-CBC"
};

// Log to console to help participants
console.log('%c QR Code Secret Challenge', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cInstructions:', 'color: #764ba2; font-weight: bold;');
console.log('1. Look at the QR code on the page');
console.log('2. Decode the QR code using your phone or online tool');
console.log('3. Find the encryption key hidden on this page');
console.log('4. Use the decryption tool to decrypt the message');
console.log('%cTip: Check the page source and metadata!', 'color: #ff9800;');

// Load QR Code on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log(' QR Code Secret Challenge Loaded');
    console.log(' Tip: Check the page source and DevTools for hints');
    
    await loadQRCode();
});

// Function to load auto-generated QR code
async function loadQRCode() {
    try {
        console.log(' Fetching auto-generated QR code from server...');
        
        const response = await fetch('/generate-qr');
        const data = await response.json();
        
        if (!data.qrCode) {
            throw new Error('No QR code in response');
        }
        
        // Display QR code image
        const qrContainer = document.getElementById('qr-code');
        const img = document.createElement('img');
        img.src = data.qrCode;
        img.style.maxWidth = '300px';
        img.style.borderRadius = '10px';
        img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        
        qrContainer.innerHTML = '';
        qrContainer.appendChild(img);
        
        console.log(' QR Code generated and displayed');
        console.log(' Debug - QR Data (for testing): ' + data.qrData.substring(0, 30) + '...');
        
    } catch (error) {
        console.error(' Error loading QR code:', error);
        document.getElementById('qr-code').innerHTML = 
            '<p style="color: red;"> Error generating QR code: ' + error.message + '</p>';
    }
}

// Decryption form handler
document.getElementById('decrypt-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const encryptedMsg = document.getElementById('encrypted-msg').value.trim();
    const key = document.getElementById('encryption-key').value.trim();
    const iv = document.getElementById('iv').value.trim();
    
    if (!encryptedMsg) {
        alert(' Please enter the encrypted message from the QR code');
        return;
    }
    if (!key) {
        alert(' Please find and enter the encryption key');
        return;
    }
    if (!iv) {
        alert(' Please enter the IV');
        return;
    }
    
    console.log(' Attempting decryption...');
    console.log('  Key length: ' + key.length);
    console.log('  IV length: ' + iv.length);
    
    try {
        const response = await fetch('/api/decrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                encrypted: encryptedMsg,
                key: key,
                iv: iv
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log(' Decryption successful!');
            console.log(' Message: ' + result.message);
            
            document.getElementById('decrypted-text').textContent = result.message;
            
            // Extract flag
            const flagMatch = result.message.match(/GCS\{[^}]+\}/);
            if (flagMatch) {
                document.getElementById('flag').textContent = ' ' + flagMatch[0];
                console.log(' Flag found: ' + flagMatch[0]);
            }
            
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
            
        } else {
            alert(' ' + result.error);
            console.error('Decryption failed:', result.error);
        }
        
    } catch (error) {
        alert(' Error: ' + error.message);
        console.error('Request error:', error);
    }
});

// Show hints
function showHint(hintNum) {
    const hintElement = document.getElementById(`hint-${hintNum}`);
    if (hintElement.style.display === 'none') {
        hintElement.style.display = 'block';
        console.log(`Hint ${hintNum} revealed`);
    } else {
        hintElement.style.display = 'none';
    }
}

// Reveal configuration (for testing)
window.revealConfig = () => {
    console.log('%c CONFIGURATION (For Testing)', 'color: red; font-weight: bold;');
    console.log(window.config);
    console.log('Copy the encryptionKey to use in decryption');
};

console.log('%cCall revealConfig() to see configuration (testing only)', 'color: red;');