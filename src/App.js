import "./App.css";
import { ethers } from "ethers";
import contactabi from "./contactABI.json";
import { useState } from "react";

function App() {
  const [publicvar, setPublicvar] = useState({});
  const [loading, setLoder] = useState(true);
  const [showloader, setShowLoader] = useState(false);

  const getData = async () => {
    setShowLoader(true);
    const dataAddress = "0x9c0a8d7d9359A9f1C5C78115a2a07e3F37B69C9a";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const contact = new ethers.Contract(dataAddress, contactabi, singer);
    console.log(contact);

    const maxSupply = await contact.maxSupply();
    const whitelistUnoCap = await contact.whitelistUnoCap();
    const whitelistDosCap = await contact.whitelistDosCap();
    const ownerMintReserved = await contact.ownerMintReserved();
    const individualUnoCap = await contact.individualUnoCap();
    const individualDosCap = await contact.individualDosCap();
    const whitelistUnoStartTime = await contact.whitelistUnoStartTime();
    const whitelistDosStartTime = await contact.whitelistDosStartTime();
    const whitelistUnoEndTime = await contact.whitelistUnoEndTime();
    const whitelistDosEndTime = await contact.whitelistDosEndTime();
    const whitelistUnoMintPrice = await contact.whitelistUnoMintPrice();
    const whitelistDosMintPrice = await contact.whitelistDosMintPrice();
    const publicMintPrice = await contact.publicMintPrice();

    const obj = {
      maxSupply: maxSupply.toString(),
      whitelistUnoCap: whitelistUnoCap.toString(),
      whitelistDosCap: whitelistDosCap.toString(),
      ownerMintReserved: ownerMintReserved.toString(),
      individualUnoCap: individualUnoCap.toString(),
      individualDosCap: individualDosCap.toString(),
      whitelistUnoStartTime: whitelistUnoStartTime.toString(),
      whitelistDosStartTime: whitelistDosStartTime.toString(),
      whitelistUnoEndTime: whitelistUnoEndTime.toString(),
      whitelistDosEndTime: whitelistDosEndTime.toString(),
      whitelistUnoMintPrice: ethers.utils.formatEther(whitelistUnoMintPrice),
      whitelistDosMintPrice: ethers.utils.formatEther(whitelistDosMintPrice),
      publicMintPrice: ethers.utils.formatEther(publicMintPrice),
    };
    setPublicvar(obj);
    setLoder(false);
  };

  return (
    <>
      <button onClick={getData}>GetData</button>
      {loading ? (
        showloader ? (
          <div>Loading...</div>
        ) : (
          <div></div>
        )
      ) : (
        <div className="App">
          <h3>maxSupply = {publicvar.maxSupply}</h3>
          <h3>whitelistUnoCap = {publicvar.whitelistUnoCap}</h3>
          <h3>whitelistDosCap = {publicvar.whitelistDosCap}</h3>
          <h3>ownerMintReserved = {publicvar.ownerMintReserved}</h3>
          <h3>individualUnoCap = {publicvar.individualUnoCap}</h3>
          <h3>individualDosCap = {publicvar.individualDosCap}</h3>
          <h3>whitelistUnoStartTime = {publicvar.whitelistUnoStartTime}</h3>
          <h3>whitelistDosStartTime = {publicvar.whitelistDosStartTime}</h3>
          <h3>whitelistUnoEndTime = {publicvar.whitelistUnoEndTime}</h3>
          <h3>whitelistDosEndTime = {publicvar.whitelistDosEndTime}</h3>
          <h3>
            whitelistUnoMintPrice = {publicvar.whitelistUnoMintPrice} ether
          </h3>
          <h3>
            whitelistDosMintPrice = {publicvar.whitelistDosMintPrice} ether
          </h3>
          <h3>publicMintPrice = {publicvar.publicMintPrice} ether</h3>
        </div>
      )}
    </>
  );
}

export default App;
