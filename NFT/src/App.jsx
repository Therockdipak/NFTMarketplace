import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./contract/NFTMarketplace.json";  // Make sure the ABI is correct
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [nftMarketplace, setNftMarketplace] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [listingPrice, setListingPrice] = useState(null);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const selectedAccount = accounts[0];
          console.log('Selected Account:', selectedAccount);

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractAddr = "";  // Replace with your actual contract address
          const Abi = abi.abi;

          // Instantiate the contract
          const contract = new ethers.Contract(contractAddr, Abi, signer);
          setNftMarketplace(contract);

          console.log("Contract Address:", contract.address);

          // Fetch listing price from contract using the getter function
          const price = await contract.getListingPrice(); // Use getListingPrice function
          setListingPrice(ethers.formatEther(price));  // Convert from wei to ether
        } catch (error) {
          console.error('Error connecting to MetaMask', error);
        }
      } else {
        alert('MetaMask is not installed. Please install MetaMask to interact with the app.');
      }
    }
    init();
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    }
  };

  return (
    <div>
      <h1>Welcome to the NFT Marketplace</h1>

      {/* Show the connected account */}
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}

      {/* Show listing price */}
      {listingPrice && (
        <div>
          <h2>Listing Price: {listingPrice} ETH</h2>
        </div>
      )}

      {/* Display NFT marketplace items */}
      <div>
        <h2>Market Items</h2>
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              <p>Token ID: {token.tokenId}</p>
              <p>Price: {ethers.formatEther(token.price)} ETH</p>
              <p>Likes: {token.likes}</p>
              <button onClick={() => likeNFT(token.tokenId)}>Like</button>
              <button>Buy</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
