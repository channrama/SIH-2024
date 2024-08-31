// App.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
//import FarmingContractABI from './FarmingContractABI.json';

function Sample() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractAddress, setContractAddress] = useState('');
    const [buyerAddress, setBuyerAddress] = useState('');
    const [farmerAddress, setFarmerAddress] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [escrowAmount, setEscrowAmount] = useState('');
    
    // Connect to Ethereum wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setProvider(provider);
            setSigner(signer);
        } else {
            alert("Please install MetaMask!");
        }
    };

    // Deploy the smart contract
    const deployContract = async () => {
        if (!farmerAddress || !buyerAddress || !price || !quantity) return;
        const Factory = new ethers.ContractFactory(
            FarmingContractABI.abi,
            FarmingContractABI.bytecode,
            signer
        );
        const contract = await Factory.deploy(
            farmerAddress,
            buyerAddress,
            ethers.utils.parseEther(price),
            quantity
        );
        await contract.deployed();
        setContract(contract);
        setContractAddress(contract.address);
    };

    // Initiate payment and hold funds in escrow
    const initiatePayment = async () => {
        if (!contract || !escrowAmount) return;
        const tx = await contract.initiatePayment({
            value: ethers.utils.parseEther(escrowAmount)
        });
        await tx.wait();
    };

    // Confirm delivery of goods
    const confirmDelivery = async () => {
        if (!contract) return;
        const tx = await contract.confirmDelivery();
        await tx.wait();
    };

    // Release funds to the farmer
    const releaseFunds = async () => {
        if (!contract) return;
        const tx = await contract.releaseFunds();
        await tx.wait();
    };

    return (
        <div className="App">
            <h1>Farming Contract Platform</h1>
            <button onClick={connectWallet}>Connect Wallet</button>

            <h2>Create Contract</h2>
            <input
                type="text"
                placeholder="Farmer Address"
                value={farmerAddress}
                onChange={(e) => setFarmerAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Buyer Address"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price (in ETH)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={deployContract}>Deploy Contract</button>
            {contractAddress && <p>Contract Address: {contractAddress}</p>}

            <h2>Initiate Payment</h2>
            <input
                type="text"
                placeholder="Escrow Amount (in ETH)"
                value={escrowAmount}
                onChange={(e) => setEscrowAmount(e.target.value)}
            />
            <button onClick={initiatePayment}>Initiate Payment</button>

            <h2>Confirm Delivery</h2>
            <button onClick={confirmDelivery}>Confirm Delivery</button>

            <h2>Release Funds</h2>
            <button onClick={releaseFunds}>Release Funds</button>
        </div>
    );
}

export default Sample;
