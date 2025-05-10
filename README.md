# 🚔 Evidence Management System using Blockchain, IPFS & Pinata

A decentralized application (dApp) that enables secure and immutable management of digital evidence using Ethereum smart contracts and IPFS. Role-based access control ensures only authorized parties like police officers and court officials can interact with the system, protecting the integrity of uploaded evidence.

---

## 📦 Tech Stack

- **Ethereum** (Smart Contracts - Solidity)
- **Truffle** (Development Framework)
- **Ganache** (Local Ethereum Blockchain)
- **MetaMask** (Wallet & Authentication)
- **IPFS** via **Pinata** (Decentralized File Storage)
- **HTML/CSS/JavaScript** (Frontend)

---

## 🔧 Setup Instructions

### ✅ Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/)
- [Truffle](https://trufflesuite.com/)
  ```bash
  npm install -g truffle
  ```
- Ganache
- MetaMask
- Pinata Account

# Clone the Repository
```bash
git clone https://github.com/Niyati1206/EvidenceManagementSystem.git
cd EvidenceManagementSystem
```

# Install Dependencies
```bash
npm install
```
#Setup Pinata for IPFS Uploads
- Go to https://www.pinata.cloud/
- Sign up and verify your email
- Go to your API Keys dashboard
- Generate a new key and copy:
  PINATA_API_KEY
  PINATA_SECRET_API_KEY
- Add the pinata key to court-dashboard.js file :
  ```bash
  const YOUR_INFURA_PROJECT_ID=' ';
  const YOUR_INFURA_PROJECT_SECRET =' ';
  ```
  


