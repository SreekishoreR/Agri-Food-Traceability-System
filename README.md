# Agri-Food Traceability System
This is my Final-Year Academic Project, A Blockchain-Based Agri-Food Traceability System developed to ensure transparency, authenticity, and secure tracking across the agricultural supply chain using Binance Smart Chain (BSC) Testnet, Solidity Smart Contracts, IPFS, Flask, React, and MySQL.

## Project Overview
- This system enables end-to-end traceability of agricultural products across the supply chain:
### Seed → Farmer → Grain Elevator → Processor → Retailer → Consumer

## The application integrates:
- Blockchain-based transaction logging,
- Smart contract deployment,
- Decentralized file storage (IPFS),
- QR code-based product tracking,
- Full-stack web application (React + Flask)

## System Architecture
React Frontend -> Flask REST API (Python) -> MySQL Database -> Blockchain (BSC Testnet) -> IPFS (File Storage)

## Tecnologies Used
### Frontend:
- React.js,
- JavaScript,
- HTML / CSS.

### Backend:
- Python (Flask),
- Flask-CORS
- Web3.py
- MySQL Connector

### Blockchain:
- Solidity (v0.6.0),
- Binance Smart Chain Testnet (Chain ID: 97),
- Smart Contract Deployment using Web3.py

### Storage:
- IPFS (Local Node)

### Additional Libraries:
- PIL (Image Processing),
- pyzbar (QR decoding),
- qrcode (QR generation),
- Requests

## Core Features
### Seed Management:
- Insert / Update / Delete Seeds,
- Transfer seeds between supply chain participants,
- Blockchain transaction recording,

### Product Lot Management:
- Convert seed to crop,
- Transfer product ownership,
- Maintain product lifecycle history

### Blockchain Integration:
- Smart contract compilation and deployment,
- BNB transaction handling,
- Secure transaction signing,
- Transaction receipt logging in MySQL

### IPFS File Storage:
- Upload documents/images to IPFS,
- Store IPFS hash in database,
- Retrieve and verify stored files

### QR Code System:
- Generate QR codes for products,
- Scan QR to retrieve product traceability details

## User Management:
1. Register users
2. Approve users
3. Role-based functionality
4. Blockchain address integration

## Installation & Setup:
### 1. Clone Repository:
- git clone https://github.com/your-username/Agri-Food-Traceability-System.git
- cd Agri-Food-Traceability-System

### 2. Frontend Setup:
- npm install
- npm start
#### Frontend runs at,
- http://localhost:3000

### 3. Backend Setup:
- Install required Python packages -> pip install flask flask-cors web3 py-solc-x mysql-connector-python requests pillow pyzbar qrcode
- Run backend server: python food.py
- Backend runs at: http://localhost:5000

### 4. MySQL Setup:
- Create database named: food
- Import database.sql
- Ensure MySQL runs on: Host -> localhost, Port -> 3306

### 5. Blockchain Configuration:
This project uses Binance Smart Chain Testnet (Chain ID: 97).
Set environment variables before running:
- BLOCKCHAIN_ADDRESS=your_wallet_address
- PRIVATE_KEY=your_wallet_private_key

**Note** Never commit private keys to GitHub.

### 6. IPFS Setup:
- Install IPFS and start daemon: ipfs daemon
- IPFS API: http://127.0.0.1:5001
- IPFS Gateway: http://127.0.0.1:8080

## Achieved Outcome:
- Improved transparency in agricultural supply chains,
- Preventtion of counterfeit products,
- Enabled real-time traceability,
- And provided immutable transaction history using blockchain

## Project Title:
**Blockchain-Based Agri-Food Traceability System**
    
    Developed as part of undergraduate academic curriculum to demonstrate practical implementation of blockchain in supply chain management.    
