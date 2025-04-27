const EvidenceManagement = artifacts.require("EvidenceManagement");

module.exports = function(deployer) {
  deployer.deploy(EvidenceManagement);
};