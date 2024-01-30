const contractABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "transactionId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "collegeName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "deptName",
				"type": "string"
			}
		],
		"name": "IdentityRegistered",
		"type": "event"
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
				"name": "_collegeName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rollNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_deptName",
				"type": "string"
			}
		],
		"name": "registerIdentity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_transactionId",
				"type": "bytes32"
			}
		],
		"name": "requestVerification",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "transactionId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "collegeName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "deptName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"name": "VerificationRequested",
		"type": "event"
	}
];

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

// Set the default account
web3.eth.defaultAccount = '0xC890869477A9FB1E87a225ADEC362c4d6FaC5a69'; // Replace 'yourEthereumAddress' with your actual Ethereum address

const contractAddress = '0xc5adAAB2A5517Ab99BA8647295b4739A0FfA727D';
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerIdentity() {
    const name = document.getElementById("name").value;
    const collegeName = document.getElementById("collegeName").value;
    const rollNo = document.getElementById("rollNo").value;
    const deptName = document.getElementById("deptName").value;
    
    try {
        const result = await contract.methods.registerIdentity(name, collegeName, rollNo, deptName).send({ from: web3.eth.defaultAccount, gas: 6000000 });
        const transactionId = result.events.IdentityRegistered.returnValues.transactionId;
        document.getElementById("message").innerText = `Hello ${name}! Your registration is successful. Student Id: ${transactionId}`;
    } catch (error) {
        document.getElementById("message").innerText = `Error: ${error.message}`;
    }
}

async function requestVerification() {
    const transactionId = document.getElementById("verifyTransactionId").value;
    
    try {
        const result = await contract.methods.requestVerification(transactionId).call();
        document.getElementById("message").innerText = `
            Name: ${result[0]}
            College Name: ${result[1]}
            Roll No: ${result[2]}
            Department Name: ${result[3]}
            Is Registered: ${result[4]}
        `;
    } catch (error) {
        document.getElementById("message").innerText = `Error: ${error.message}`;
    }
}
