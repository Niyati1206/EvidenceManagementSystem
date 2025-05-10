// Initialize web3 and IPFS
//import CONTRACT_ABI from './ContractABI'; // Adjust the path as necessary
//import EvidenceManagement from 'C:\Users\Niyati\Desktop\BLC-TRY\build\contracts\EvidenceManagement.json';
let web3;
let contract;
let ipfs;
let userAccount;
let userData;
const contractAddress = '0xcB3aa91e8f2e5b2AbD82C9239AE7f3bFfBBD4fc8';
const CONTRACT_ABI = 
[
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
const addEvidenceNav = document.getElementById('add-evidence-nav');
const viewEvidenceNav = document.getElementById('view-evidence-nav');
const addEvidenceSection = document.getElementById('add-evidence-section');
const viewEvidenceSection = document.getElementById('view-evidence-section');
const evidenceForm = document.getElementById('evidence-form');
const uploadStatus = document.getElementById('upload-status');
const uploadProgress = document.getElementById('upload-progress');
const progressBar = uploadProgress.querySelector('.progress');
const evidenceList = document.getElementById('evidence-list');
const searchEvidence = document.getElementById('search-evidence');
const filterEvidenceType = document.getElementById('filter-evidence-type');

// Initialize IPFS with Pinata
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


const YOUR_PINATA_API_KEY = config.PINATA_API_KEY;
const YOUR_PINATA_SECRET_API_KEY = config.PINATA_SECRET_API_KEY;
// Event Listeners
window.addEventListener('load', async () => {
  // Check login status
  checkLoginStatus();
  
  // Initialize web3 and IPFS
  initializeWeb3();
  ipfs = initializeIPFS(); // Make sure to assign the result to the global ipfs variable
  
  // Setup event listeners
  logoutBtn.addEventListener('click', logout);
  addEvidenceNav.addEventListener('click', showAddEvidenceSection);
  viewEvidenceNav.addEventListener('click', showViewEvidenceSection);
  evidenceForm.addEventListener('submit', uploadEvidence);
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
    
    // Check if user role is Police
    if (userData.role !== 'Police') {
        alert('Access denied. This dashboard is for Police officers only.');
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
            showMessage(uploadStatus, 'Error connecting to blockchain network', 'error');
        }
    } else {
        showMessage(uploadStatus, 'Please install MetaMask to use this application', 'error');
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
        showMessage(uploadStatus, 'Loading evidence records...', 'warning');
        
        // Get all evidence IDs and details
        for (let i = 0; i < count; i++) {
            const evidenceId = await contract.methods.evidenceIds(i).call();
            const evidence = await contract.methods.getEvidence(evidenceId).call({ from: userAccount });
            
            // Create evidence card
            createEvidenceCard(evidenceId, evidence);
        }
        
        // Clear loading message
        uploadStatus.textContent = '';
        uploadStatus.className = 'message';
    } catch (error) {
        console.error('Error loading evidence list:', error);
        showMessage(uploadStatus, 'Error loading evidence records', 'error');
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
            <button class="btn primary-btn view-btn" data-id="${evidenceId}">View Details</button>
        </div>
    `;
    
    // Add event listener to view button
    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => viewEvidenceDetails(evidenceId));
    
    // Add to list
    evidenceList.appendChild(card);
}

// Truncate text helper
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// View evidence details
async function viewEvidenceDetails(evidenceId) {
    try {
        const evidence = await contract.methods.getEvidence(evidenceId).call({ from: userAccount });
        
        // Create modal to show details
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Format timestamp
        const date = new Date(evidence.timestamp * 1000);
        const formattedDate = date.toLocaleString();
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Evidence Details</h2>
                <div class="evidence-details">
                    <div class="detail-item">
                        <span class="label">Evidence ID:</span>
                        <span class="value">${evidenceId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Case Number:</span>
                        <span class="value">${evidence.caseNumber}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Location:</span>
                        <span class="value">${evidence.location}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Crime Description:</span>
                        <span class="value">${evidence.crimeDescription}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Evidence Type:</span>
                        <span class="value">${evidence.evidenceType}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Uploaded By:</span>
                        <span class="value">${evidence.officerName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Timestamp:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">IPFS Hash:</span>
                        <span class="value">${evidence.ipfsHash}</span>
                    </div>
                </div>
                <div class="evidence-preview" id="evidence-preview-modal">
                    <div class="loader">Loading evidence preview...</div>
                </div>
                <div class="modal-actions">
                    <button class="btn success-btn" id="download-btn">Download Evidence</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        const downloadBtn = modal.querySelector('#download-btn');
        downloadBtn.addEventListener('click', () => {
            downloadEvidence(evidence.ipfsHash);
        });
        
        // Load preview if possible
        loadEvidencePreview(evidence.ipfsHash, evidence.evidenceType, modal.querySelector('#evidence-preview-modal'));
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    } catch (error) {
        console.error('Error viewing evidence details:', error);
        showMessage(uploadStatus, 'Error loading evidence details', 'error');
    }
}

// Load evidence preview
// Load evidence preview
async function loadEvidencePreview(ipfsHash, evidenceType, previewElement) {
  try {
      // Get file from IPFS - using Pinata gateway
      const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      
      // Clear preview element
      previewElement.innerHTML = '';
      
      // Create preview based on evidence type
      if (evidenceType === 'Image') {
          const img = document.createElement('img');
          img.src = url;
          img.alt = 'Evidence Image';
          img.style.maxWidth = '100%';
          previewElement.appendChild(img);
      } else if (evidenceType === 'Video') {
          const video = document.createElement('video');
          video.src = url;
          video.controls = true;
          video.style.maxWidth = '100%';
          previewElement.appendChild(video);
      } else if (evidenceType === 'Audio') {
          const audio = document.createElement('audio');
          audio.src = url;
          audio.controls = true;
          audio.style.width = '100%';
          previewElement.appendChild(audio);
      } else if (evidenceType === 'Document') {
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.textContent = 'View Document (PDF, DOC, etc.)';
          link.className = 'btn primary-btn';
          previewElement.appendChild(link);
      } else {
          previewElement.textContent = 'Preview not available for this evidence type. Click Download to access the file.';
      }
  } catch (error) {
      console.error('Error loading preview:', error);
      previewElement.textContent = 'Error loading preview. Please try downloading the file instead.';
  }
}

// Download evidence
// Download evidence
function downloadEvidence(ipfsHash) {
  const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  window.open(url, '_blank');
}
// Upload evidence
// Upload evidence
async function uploadEvidence(event) {
  event.preventDefault();
  
  // Get form values
  const evidenceId = document.getElementById('evidence-id').value.trim();
  const caseNumber = document.getElementById('case-number').value.trim();
  const location = document.getElementById('location').value.trim();
  const crimeDescription = document.getElementById('crime-description').value.trim();
  const evidenceType = document.getElementById('evidence-type').value;
  const evidenceFile = document.getElementById('evidence-file').files[0];
  
  // Validate inputs
  if (!evidenceId || !caseNumber || !location || !crimeDescription || !evidenceType || !evidenceFile) {
      showMessage(uploadStatus, 'Please fill all fields and select a file', 'warning');
      return;
  }
  
  try {
      // Show loading status
      showMessage(uploadStatus, 'Uploading evidence to IPFS via Pinata...', 'warning');
      uploadProgress.style.display = 'block';
      
      // Create form data for Pinata API
      const formData = new FormData();
      formData.append('file', evidenceFile);
      
      // Upload to Pinata
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          headers: {
              'pinata_api_key': YOUR_PINATA_API_KEY,
              'pinata_secret_api_key': YOUR_PINATA_SECRET_API_KEY
          },
          body: formData
      });
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error('Pinata upload failed: ' + (errorData.error || response.statusText));
      }
      
      const data = await response.json();
      const ipfsHash = data.IpfsHash;
      
      // Update progress bar to 100%
      progressBar.style.width = '100%';
      
      showMessage(uploadStatus, 'File uploaded to IPFS. Adding to blockchain...', 'warning');
      
      // Add to blockchain
      await contract.methods.addEvidence(
          evidenceId,
          ipfsHash,
          caseNumber,
          location,
          crimeDescription,
          evidenceType
      ).send({ from: userAccount });
      
      // Success message
      showMessage(uploadStatus, 'Evidence added successfully!', 'success');
      
      // Reset form and progress
      evidenceForm.reset();
      progressBar.style.width = '0';
      uploadProgress.style.display = 'none';
      
      // Reload evidence list
      setTimeout(() => {
          loadEvidenceList();
      }, 2000);
  } catch (error) {
      console.error('Error uploading evidence:', error);
      showMessage(uploadStatus, 'Error uploading evidence: ' + error.message, 'error');
      uploadProgress.style.display = 'none';
  }
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

// Show Add Evidence Section
function showAddEvidenceSection() {
    addEvidenceNav.classList.add('active');
    viewEvidenceNav.classList.remove('active');
    addEvidenceSection.classList.remove('hidden');
    viewEvidenceSection.classList.add('hidden');
}

// Show View Evidence Section
function showViewEvidenceSection() {
    viewEvidenceNav.classList.add('active');
    addEvidenceNav.classList.remove('active');
    viewEvidenceSection.classList.remove('hidden');
    addEvidenceSection.classList.add('hidden');
    
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