#  QR Code Secret - CTF Challenge

## Challenge Overview

**QR Code Secret** is a medium-difficulty Capture The Flag (CTF) challenge that combines **Web Security** and **Cryptography** concepts. Participants must investigate a webpage, decode a QR code containing an encrypted message, discover the hidden decryption key, and decrypt the message to recover the final flag.

---

## Challenge Details

* **Challenge Title:** QR Code Secret
* **Category:** Web Security, Cryptography
* **Flag Format:** `GCS{...}`

---

## Story

A software developer created a secure webpage to exchange confidential information through a QR code. Before deploying the application, the developer accidentally exposed sensitive information within the webpage.

As a cybersecurity analyst, your task is to investigate the webpage, locate the hidden clue, decrypt the secret message stored inside the QR code, and capture the hidden flag.

---

## Challenge Objective

Participants are required to:

1. Visit the challenge webpage.
2. Scan or decode the QR code.
3. Retrieve the encrypted message.
4. Investigate the webpage using browser Developer Tools.
5. Discover the hidden decryption key.
6. Decrypt the encrypted message.
7. Recover the flag.

---

## Flag Format

```text
GCS{your_flag_here}
```

---

## Setup Instructions

### Prerequisites

* Node.js (v14 or above)
* npm (Node Package Manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/QR-Code-Secret-CTF.git

# Move into the project directory
cd QR-Code-Secret-CTF

# Install required packages
npm install

# Start the application
npm start
```

### Running the Challenge

Open your browser and visit:

```text
http://localhost:3000
```

---

## Expected Solution Path

1. Open the challenge webpage.
2. Scan the displayed QR code.
3. Obtain the encrypted message.
4. Inspect the webpage source code using **Developer Tools (F12)**.
5. Identify the hidden clue that reveals the decryption key.
6. Decrypt the encrypted message.
7. Extract the final flag.

---

## Learning Outcomes

After completing this challenge, participants will understand:

* QR code encoding and decoding
* Basic cryptography concepts
* Encryption and decryption using a secret key
* Browser Developer Tools for web investigation
* Source code inspection
* Information disclosure vulnerabilities
* Multi-stage CTF problem-solving methodology

---

## Tools Required

* Modern web browser
* Browser Developer Tools (F12)
* QR code scanner or decoder
* Basic knowledge of HTML and JavaScript

---

## Project Structure

```text
QR-Code-Secret-CTF/
│
├── index.js
├── package.json
├── README.md
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
│
└── screenshots/
```

---

## Challenge Logic

* The webpage displays a QR code.
* The QR code contains an encrypted message.
* A hidden clue within the webpage reveals the decryption key.
* Participants must use the discovered key to decrypt the message.
* The decrypted message contains the flag in the format:

```text
GCS{your_flag_here}
```

---

## Skills Covered

* Web Security
* Cryptography
* Source Code Analysis
* QR Code Analysis
* Browser Investigation
* Logical Problem Solving

---

## Author

**Shreya Newaskar**





