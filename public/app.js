// Initialize web3 with MetaMask
let web3;
let contract;
let userAccount;

//import CONTRACT_ABI from './ContractABI'; // Adjust the path as necessary
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
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const connectMetaMaskBtn = document.getElementById('connect-metamask');
const registerConnectMetaMaskBtn = document.getElementById('register-connect-metamask');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');
const loginAddress = document.getElementById('login-address');
const registerAddress = document.getElementById('register-address');
const fullnameInput = document.getElementById('fullname');
const roleSelect = document.getElementById('role');


// Event Listeners
window.addEventListener('load', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Initialize web3
            web3 = new Web3(window.ethereum);
            
            // Load the contract
            loadContract();
            
            // Set up event listeners
            // Set up event listeners
            loginTab.addEventListener('click', showLoginForm);
            registerTab.addEventListener('click', showRegisterForm);
            connectMetaMaskBtn.addEventListener('click', connectMetaMask);
            registerConnectMetaMaskBtn.addEventListener('click', connectMetaMask);
            loginBtn.addEventListener('click', login);
            registerBtn.addEventListener('click', register);

            // Check if user is already logged in
            checkLoginStatus();
        } catch (error) {
            console.error('Error initializing web3:', error);
            showMessage(loginMessage, 'Error connecting to blockchain network', 'error');
        }
    } else {
        showMessage(loginMessage, 'Please install MetaMask to use this application', 'error');
    }
});

// Function to load the smart contract
// function loadContract() {
//     try {
//         contract = new web3.eth.Contract(contractABI, contractAddress);
//         console.log("Contract loaded successfully");
//     } catch (error) {
//         console.error('Error loading contract:', error);
//         showMessage(loginMessage, 'Error loading smart contract', 'error');
//     }
// }
// Replace your loadContract function with this:
function loadContract() {
    try {
        // Create new contract instance explicitly
        contract = new web3.eth.Contract(
             CONTRACT_ABI,
            contractAddress,
            { from: null } // Optional default sender
        );
        
        // Verify methods exist on the contract
        console.log("Contract methods after loading:", 
            contract.methods ? Object.keys(contract.methods).length : "No methods object");
        
        // Test calling a simple view function on the contract
        contract.methods.getEvidenceCount().call()
            .then(count => {
                console.log("Contract connected successfully - Evidence count:", count);
            })
            .catch(err => {
                console.error("Error calling test method:", err);
            });
            
        return true;
    } catch (error) {
        console.error('Error loading contract:', error);
        console.error('Error details:', error.stack);
        showMessage(loginMessage, 'Error loading smart contract', 'error');
        return false;
    }
}

// Modify your login function
async function login() {
  if (!userAccount) {
      showMessage(loginMessage, 'Please connect MetaMask first', 'warning');
      return;
  }
  
  try {
      // IMPORTANT: Access the mapping directly instead of using the function
      const isRegistered = await contract.methods.registeredUsers(userAccount).call();
      
      if (isRegistered) {
          // Get user role and name directly from mappings
          const role = await contract.methods.userRoles(userAccount).call();
          const name = await contract.methods.userNames(userAccount).call();
          
          // Save login info
          const userData = {
              address: userAccount,
              name: name,
              role: role
          };
          
          localStorage.setItem('blockchainEvidenceUser', JSON.stringify(userData));
          
          // Redirect to dashboard
          redirectToDashboard(role);
      } else {
          showMessage(loginMessage, 'User not registered. Please register first.', 'warning');
      }
  } catch (error) {
      console.error('Login error:', error);
      showMessage(loginMessage, 'Error during login: ' + error.message, 'error');
  }
}
// Connect to MetaMask
async function connectMetaMask() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        // Update UI
        loginAddress.value = userAccount;
        registerAddress.value = userAccount;
        
        loginBtn.disabled = false;
        registerBtn.disabled = false;
        
        showMessage(loginMessage, 'MetaMask connected successfully', 'success');
        showMessage(registerMessage, 'MetaMask connected successfully', 'success');
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        showMessage(loginMessage, 'Error connecting to MetaMask: ' + error.message, 'error');
        showMessage(registerMessage, 'Error connecting to MetaMask: ' + error.message, 'error');
    }
}

async function checkLoginStatus() {
  // Check localStorage for login info
  const loggedInUser = localStorage.getItem('blockchainEvidenceUser');
  
  if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      userAccount = userData.address;
      
      // Verify user registration on blockchain
      try {
          // IMPORTANT: Use mapping instead of function
          const isRegistered = await contract.methods.registeredUsers(userAccount).call();
          
          if (isRegistered) {
              // Redirect to appropriate dashboard
              const role = await contract.methods.userRoles(userAccount).call();
              redirectToDashboard(role);
          } else {
              // Clear invalid login
              localStorage.removeItem('blockchainEvidenceUser');
          }
      } catch (error) {
          console.error('Error checking registration:', error);
          localStorage.removeItem('blockchainEvidenceUser');
      }
  }
}


// Register function
async function register() {
    if (!userAccount) {
        showMessage(registerMessage, 'Please connect MetaMask first', 'warning');
        return;
    }
    
    const fullname = fullnameInput.value.trim();
    const role = roleSelect.value;
    
    // Validate inputs
    if (!fullname) {
        showMessage(registerMessage, 'Please enter your full name', 'warning');
        return;
    }
    
    if (!role) {
        showMessage(registerMessage, 'Please select a role', 'warning');
        return;
    }
    
    try {
        // Check if user is already registered
        const isRegistered = await contract.methods.isUserRegistered(userAccount).call();
        
        if (isRegistered) {
            showMessage(registerMessage, 'This address is already registered', 'warning');
            return;
        }
        
        // Register user
        showMessage(registerMessage, 'Registering user... Please confirm the transaction in MetaMask', 'warning');
        
        await contract.methods.registerUser(fullname, role).send({ from: userAccount });
        
        showMessage(registerMessage, 'Registration successful!', 'success');
        
        // Save login info
        const userData = {
            address: userAccount,
            name: fullname,
            role: role
        };
        
        localStorage.setItem('blockchainEvidenceUser', JSON.stringify(userData));
        
        // Redirect to dashboard after short delay to show success message
        setTimeout(() => {
            redirectToDashboard(role);
        }, 1500);
    } catch (error) {
        console.error('Registration error:', error);
        showMessage(registerMessage, 'Error during registration: ' + error.message, 'error');
    }
}

// Redirect to appropriate dashboard
function redirectToDashboard(role) {
    if (role === 'Police') {
        window.location.href = 'dashboard-police.html';
    } else if (role === 'Court') {
        window.location.href = 'dashboard-court.html';
    } else {
        showMessage(loginMessage, 'Unknown role: ' + role, 'error');
    }
}

// Show login form
function showLoginForm() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
}

// Show register form
function showRegisterForm() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
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