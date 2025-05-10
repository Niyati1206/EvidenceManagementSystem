// Initialize web3 and IPFS
// Adjust the path as necessary
let web3;
let contract;
let ipfs;
let userAccount;
let userData;
const contractAddress = '0xcB3aa91e8f2e5b2AbD82C9239AE7f3bFfBBD4fc8';
const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "evidenceId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "accessedBy",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "EvidenceAccessed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "evidenceId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "officerName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "EvidenceAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "role",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "evidenceIds",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "evidenceRecords",
    "outputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "caseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "crimeDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "evidenceType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "officerName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "registeredUsers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userNames",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userRoles",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_role",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_evidenceId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_caseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_crimeDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_evidenceType",
        "type": "string"
      }
    ],
    "name": "addEvidence",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_evidenceId",
        "type": "string"
      }
    ],
    "name": "getEvidence",
    "outputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "caseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "crimeDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "evidenceType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "officerName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEvidenceCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "isUserRegistered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUserRole",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUserName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
// DOM Elements
const userNameEl = document.getElementById('user-name');
const userRoleEl = document.getElementById('user-role');
const logoutBtn = document.getElementById('logout-btn');
const verifyEvidenceNav = document.getElementById('verify-evidence-nav');
const browseEvidenceNav = document.getElementById('browse-evidence-nav');
const verifyEvidenceSection = document.getElementById('verify-evidence-section');
const browseEvidenceSection = document.getElementById('browse-evidence-section');
const verifyEvidenceId = document.getElementById('verify-evidence-id');
const verifyBtn = document.getElementById('verify-btn');
const verificationResult = document.getElementById('verification-result');
const verificationMessage = document.getElementById('verification-message');
const evidencePreview = document.getElementById('evidence-preview');
const downloadEvidenceBtn = document.getElementById('download-evidence');
const evidenceList = document.getElementById('evidence-list');
const searchEvidence = document.getElementById('search-evidence');
const filterEvidenceType = document.getElementById('filter-evidence-type');


function initializeIPFS() {
  // We don't need to initialize an IPFS client when using Pinata's REST API
  // Instead, we'll just verify that we have API keys
  if (!YOUR_PINATA_API_KEY || !YOUR_PINATA_SECRET_API_KEY) {
      console.error('Error: Pinata API keys not configured');
      showMessage(uploadStatus, 'Error: IPFS service not configured properly', 'error');
      return null;
  }
  
  console.log('Pinata IPFS configuration ready');
  return true; // Just return true to indicate configuration is ready
}
// Add these constants at the top of your file with your other constants
// This happens during build time, not runtime
const YOUR_PINATA_API_KEY = config.PINATA_API_KEY;
const YOUR_PINATA_SECRET_API_KEY = config.PINATA_SECRET_API_KEY;
// Event Listeners
window.addEventListener('load', async () => {
    // Check login status
    checkLoginStatus();
    
    // Initialize web3 and IPFS
    initializeWeb3();
    initializeIPFS();
    
    // Setup event listeners
    logoutBtn.addEventListener('click', logout);
    verifyEvidenceNav.addEventListener('click', showVerifyEvidenceSection);
    browseEvidenceNav.addEventListener('click', showBrowseEvidenceSection);
    verifyBtn.addEventListener('click', verifyEvidence);
    downloadEvidenceBtn.addEventListener('click', downloadCurrentEvidence);
    searchEvidence.addEventListener('input', filterEvidence);
    filterEvidenceType.addEventListener('change', filterEvidence);
});

// Check if user is logged in
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('blockchainEvidenceUser');
    
    if (!loggedInUser) {
        // Not logged in, redirect to login page
        window.location.href = 'index.html';
        return;
    }
    
    userData = JSON.parse(loggedInUser);
    
    // Check if user role is Court
    if (userData.role !== 'Court') {
        alert('Access denied. This dashboard is for Court officials only.');
        window.location.href = 'index.html';
        return;
    }
    
    // Update UI
    userNameEl.textContent = userData.name;
    userRoleEl.textContent = userData.role;
    userAccount = userData.address;
}

// Initialize web3
async function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Initialize web3
            web3 = new Web3(window.ethereum);
            
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Load the contract
            contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);
            
            // Load evidence list
            loadEvidenceList();
        } catch (error) {
            console.error('Error initializing web3:', error);
            showMessage(verificationMessage, 'Error connecting to blockchain network', 'error');
        }
    } else {
        showMessage(verificationMessage, 'Please install MetaMask to use this application', 'error');
    }
}



// Load evidence list
async function loadEvidenceList() {
    try {
        // Get total evidence count
        const count = await contract.methods.getEvidenceCount().call();
        
        // Clear evidence list
        evidenceList.innerHTML = '';
        
        if (count === '0') {
            evidenceList.innerHTML = '<p>No evidence records found.</p>';
            return;
        }
        
        // Add loading indicator
        showMessage(verificationMessage, 'Loading evidence records...', 'warning');
        
        // Get all evidence IDs and details
        for (let i = 0; i < count; i++) {
            const evidenceId = await contract.methods.evidenceIds(i).call();
            const evidence = await contract.methods.getEvidence(evidenceId).call({ from: userAccount });
            
            // Create evidence card
            createEvidenceCard(evidenceId, evidence);
        }
        
        // Clear loading message
        verificationMessage.textContent = '';
        verificationMessage.className = 'message';
    } catch (error) {
        console.error('Error loading evidence list:', error);
        showMessage(verificationMessage, 'Error loading evidence records', 'error');
    }
}

// Create evidence card
function createEvidenceCard(evidenceId, evidence) {
    const card = document.createElement('div');
    card.className = 'evidence-item';
    card.dataset.id = evidenceId;
    card.dataset.case = evidence.caseNumber;
    card.dataset.location = evidence.location;
    card.dataset.type = evidence.evidenceType;
    card.dataset.description = evidence.crimeDescription;
    
    // Format timestamp
    const date = new Date(evidence.timestamp * 1000);
    const formattedDate = date.toLocaleString();
    
    card.innerHTML = `
        <h3>${evidence.caseNumber}</h3>
        <div class="evidence-meta">
            <p><strong>ID:</strong> ${evidenceId}</p>
            <p><strong>Type:</strong> ${evidence.evidenceType}</p>
            <p><strong>Location:</strong> ${evidence.location}</p>
            <p><strong>Uploaded By:</strong> ${evidence.officerName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
        </div>
        <p>${truncateText(evidence.crimeDescription, 100)}</p>
        <div class="evidence-actions">
            <button class="btn success-btn verify-btn" data-id="${evidenceId}">Verify</button>
        </div>
    `;
    
    // Add event listener to verify button
    const verifyBtn = card.querySelector('.verify-btn');
    verifyBtn.addEventListener('click', () => {
        verifyEvidenceId.value = evidenceId;
        // Switch to verify tab
        showVerifyEvidenceSection();
        // Auto verify
        verifyEvidence();
    });
    
    // Add to list
    evidenceList.appendChild(card);
}

// Truncate text helper
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

async function verifyEvidence() {
        const evidenceId = verifyEvidenceId.value.trim();
        
        if (!evidenceId) {
            showMessage(verificationMessage, 'Please enter an evidence ID', 'warning');
            return;
        }
        
        try {
            // Show loading status
            showMessage(verificationMessage, 'Verifying evidence...', 'warning');
            
            // Hide previous results
            verificationResult.classList.add('hidden');
            
            // Get evidence details from blockchain
            const evidence = await contract.methods.getEvidence(evidenceId).call({ from: userAccount });
            
            // Format timestamp
            const date = new Date(evidence.timestamp * 1000);
            const formattedDate = date.toLocaleString();
            
            // Update verification result
            document.getElementById('result-id').textContent = evidenceId;
            document.getElementById('result-case').textContent = evidence.caseNumber;
            document.getElementById('result-location').textContent = evidence.location;
            document.getElementById('result-description').textContent = evidence.crimeDescription;
            document.getElementById('result-type').textContent = evidence.evidenceType;
            document.getElementById('result-officer').textContent = evidence.officerName;
            document.getElementById('result-timestamp').textContent = formattedDate;
            
            const statusElement = document.getElementById('result-status');
            statusElement.textContent = 'Verified on Blockchain';
            statusElement.className = 'value verification-status verified';
            
            // Store current IPFS hash for download button
            downloadEvidenceBtn.dataset.ipfsHash = evidence.ipfsHash;
            
            // Load preview
            await loadEvidencePreview(evidence.ipfsHash, evidence.evidenceType);
            
            // Show verification result
            verificationResult.classList.remove('hidden');
            
            // Success message
            showMessage(verificationMessage, 'Evidence verified successfully!', 'success');
        } catch (error) {
            console.error('Error verifying evidence:', error);
            
            if (error.message.includes('Evidence does not exist')) {
                showMessage(verificationMessage, 'Evidence ID not found on blockchain', 'error');
            } else {
                showMessage(verificationMessage, 'Error verifying evidence: ' + error.message, 'error');
            }
        }
    }
    
    // Load evidence preview
    async function loadEvidencePreview(ipfsHash, evidenceType) {
        try {
            // Get file from IPFS
            const url = `https://ipfs.io/ipfs/${ipfsHash}`;
            
            // Clear preview element
            evidencePreview.innerHTML = '';
            
            // Create preview based on evidence type
            if (evidenceType === 'Image') {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Evidence Image';
                img.style.maxWidth = '100%';
                evidencePreview.appendChild(img);
            } else if (evidenceType === 'Video') {
                const video = document.createElement('video');
                video.src = url;
                video.controls = true;
                video.style.maxWidth = '100%';
                evidencePreview.appendChild(video);
            } else if (evidenceType === 'Audio') {
                const audio = document.createElement('audio');
                audio.src = url;
                audio.controls = true;
                audio.style.width = '100%';
                evidencePreview.appendChild(audio);
            } else if (evidenceType === 'Document') {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.textContent = 'View Document (PDF, DOC, etc.)';
                link.className = 'btn primary-btn';
                evidencePreview.appendChild(link);
            } else {
                evidencePreview.textContent = 'Preview not available for this evidence type. Click Download to access the file.';
            }
        } catch (error) {
            console.error('Error loading preview:', error);
            evidencePreview.textContent = 'Error loading preview. Please try downloading the file instead.';
        }
    }
    
    // Download current evidence
    function downloadCurrentEvidence() {
        const ipfsHash = downloadEvidenceBtn.dataset.ipfsHash;
        
        if (!ipfsHash) {
            showMessage(verificationMessage, 'No evidence file to download', 'warning');
            return;
        }
        
        const url = `https://ipfs.io/ipfs/${ipfsHash}`;
        window.open(url, '_blank');
    }
    
    // Filter evidence list
    function filterEvidence() {
        const searchTerm = searchEvidence.value.toLowerCase();
        const filterType = filterEvidenceType.value;
        
        const items = evidenceList.querySelectorAll('.evidence-item');
        
        items.forEach(item => {
            const caseNumber = item.dataset.case.toLowerCase();
            const location = item.dataset.location.toLowerCase();
            const type = item.dataset.type;
            const description = item.dataset.description.toLowerCase();
            
            const matchesSearch = (
                caseNumber.includes(searchTerm) ||
                location.includes(searchTerm) ||
                description.includes(searchTerm)
            );
            
            const matchesType = filterType === '' || type === filterType;
            
            if (matchesSearch && matchesType) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Show Verify Evidence Section
    function showVerifyEvidenceSection() {
        verifyEvidenceNav.classList.add('active');
        browseEvidenceNav.classList.remove('active');
        verifyEvidenceSection.classList.remove('hidden');
        browseEvidenceSection.classList.add('hidden');
    }
    
    // Show Browse Evidence Section
    function showBrowseEvidenceSection() {
        browseEvidenceNav.classList.add('active');
        verifyEvidenceNav.classList.remove('active');
        browseEvidenceSection.classList.remove('hidden');
        verifyEvidenceSection.classList.add('hidden');
        
        // Refresh evidence list
        loadEvidenceList();
    }
    
    // Logout function
    function logout() {
        localStorage.removeItem('blockchainEvidenceUser');
        window.location.href = 'index.html';
    }
    
    // Show message helper
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'message ' + type;
        
        // Clear message after 5 seconds if it's a success message
        if (type === 'success') {
            setTimeout(() => {
                element.textContent = '';
                element.className = 'message';
            }, 5000);
        }
    }