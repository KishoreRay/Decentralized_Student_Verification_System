// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract IdentityVerification {
    struct Identity {
        string name;
        string collegeName;
        string rollNo;
        string deptName;
        bool isRegistered;
    }

    mapping(bytes32 => Identity) private identities;

    event IdentityRegistered(bytes32 indexed transactionId, string name, string collegeName, string rollNo, string deptName);
    event VerificationRequested(bytes32 indexed transactionId, string name, string collegeName, string rollNo, string deptName, bool isRegistered);

    function registerIdentity(string memory _name, string memory _collegeName, string memory _rollNo, string memory _deptName) public {
        bytes32 transactionId = keccak256(abi.encodePacked(block.timestamp, block.difficulty, block.coinbase, blockhash(block.number - 1)));
        require(bytes(_name).length > 0, "Name must not be empty");
        require(!identities[transactionId].isRegistered, "User is already registered");

        identities[transactionId] = Identity(_name, _collegeName, _rollNo, _deptName, true);
        emit IdentityRegistered(transactionId, _name, _collegeName, _rollNo, _deptName);
    }

    function requestVerification(bytes32 _transactionId) public returns (string memory, string memory, string memory, string memory, bool) {
        Identity memory identity = identities[_transactionId];
        require(identity.isRegistered, "User is not registered");

        emit VerificationRequested(_transactionId, identity.name, identity.collegeName, identity.rollNo, identity.deptName, identity.isRegistered);
        return (identity.name, identity.collegeName, identity.rollNo, identity.deptName, identity.isRegistered);
    }
}
