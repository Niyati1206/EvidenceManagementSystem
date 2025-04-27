// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EvidenceManagement {
    // Struct for evidence details
    struct Evidence {
        string ipfsHash;        // IPFS hash of the evidence file
        string caseNumber;      // Unique case identifier
        string location;        // Location where evidence was collected
        string crimeDescription; // Brief description of the crime
        string evidenceType;    // Type of evidence (audio, video, document, etc.)
        string officerName;     // Name of the officer who uploaded the evidence
        uint256 timestamp;      // Timestamp when evidence was added
        bool exists;            // Flag to check if evidence exists
    }
    
    // Mapping from evidence ID to Evidence struct
    mapping(string => Evidence) public evidenceRecords;
    
    // List of all evidence IDs for iteration
    string[] public evidenceIds;
    
    // Authorized users mapping (address => role)
    mapping(address => string) public userRoles;
    mapping(address => string) public userNames;
    mapping(address => bool) public registeredUsers;
    
    // Events
    event EvidenceAdded(string evidenceId, string ipfsHash, string officerName, uint256 timestamp);
    event EvidenceAccessed(string evidenceId, address accessedBy, uint256 timestamp);
    event UserRegistered(address userAddress, string role, string name);
    
    // Modifiers
    modifier onlyPolice() {
        require(
            keccak256(abi.encodePacked(userRoles[msg.sender])) == keccak256(abi.encodePacked("Police")),
            "Only police officers can add evidence"
        );
        _;
    }
    
    modifier onlyRegistered() {
        require(registeredUsers[msg.sender], "User not registered");
        _;
    }
    
    // Register a new user
    function registerUser(string memory _name, string memory _role) public {
        require(!registeredUsers[msg.sender], "User already registered");
        require(
            keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("Police")) || 
            keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("Court")),
            "Role must be either Police or Court"
        );
        
        userRoles[msg.sender] = _role;
        userNames[msg.sender] = _name;
        registeredUsers[msg.sender] = true;
        
        emit UserRegistered(msg.sender, _role, _name);
    }
    
    // Add new evidence (only police)
    function addEvidence(
        string memory _evidenceId,
        string memory _ipfsHash,
        string memory _caseNumber,
        string memory _location,
        string memory _crimeDescription,
        string memory _evidenceType
    ) public onlyPolice onlyRegistered {
        require(!evidenceRecords[_evidenceId].exists, "Evidence ID already exists");
        
        Evidence memory newEvidence = Evidence({
            ipfsHash: _ipfsHash,
            caseNumber: _caseNumber,
            location: _location,
            crimeDescription: _crimeDescription,
            evidenceType: _evidenceType,
            officerName: userNames[msg.sender],
            timestamp: block.timestamp,
            exists: true
        });
        
        evidenceRecords[_evidenceId] = newEvidence;
        evidenceIds.push(_evidenceId);
        
        emit EvidenceAdded(_evidenceId, _ipfsHash, userNames[msg.sender], block.timestamp);
    }
    
    // Get evidence details
    function getEvidence(string memory _evidenceId) public onlyRegistered returns (
        string memory ipfsHash,
        string memory caseNumber,
        string memory location,
        string memory crimeDescription,
        string memory evidenceType,
        string memory officerName,
        uint256 timestamp
    ) {
        require(evidenceRecords[_evidenceId].exists, "Evidence does not exist");
        
        Evidence memory evidence = evidenceRecords[_evidenceId];
        
        emit EvidenceAccessed(_evidenceId, msg.sender, block.timestamp);
        
        return (
            evidence.ipfsHash,
            evidence.caseNumber,
            evidence.location,
            evidence.crimeDescription,
            evidence.evidenceType,
            evidence.officerName,
            evidence.timestamp
        );
    }
    
    // Get all evidence IDs
    function getEvidenceCount() public view returns (uint256) {
        return evidenceIds.length;
    }
    
    // Check if user is registered
    function isUserRegistered(address _userAddress) public view returns (bool) {
        return registeredUsers[_userAddress];
    }
    
    // Get user role
    function getUserRole(address _userAddress) public view returns (string memory) {
        require(registeredUsers[_userAddress], "User not registered");
        return userRoles[_userAddress];
    }
    
    // Get user name
    function getUserName(address _userAddress) public view returns (string memory) {
        require(registeredUsers[_userAddress], "User not registered");
        return userNames[_userAddress];
    }
}