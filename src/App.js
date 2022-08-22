import "./App.css";
import { ethers } from "ethers";
import contactabi from "./contactABI.json";
import { useState, useEffect } from "react";

function App() {
  const [publicvar, setPublicvar] = useState({});
  const [loading, setLoder] = useState(true);
  const [showloader, setShowLoader] = useState(false);
  const [contacts, setContact] = useState(false);
  const [inputfiled, setInputfiled] = useState("");
  const [whitelistUno, setWhitelistUno] = useState(0);
  const [whitelistdos, setWhitelistdos] = useState(0);
  const [ownermint, setOwnermint] = useState(0);
  const [indiuno, setIndiuno] = useState(0);
  const [indodos, setIndodos] = useState(0);
  const [whiteunostart, setWhiteunostart] = useState(0);
  const [whitedosstart, setWhitedosstart] = useState(0);
  const [whiteunoend, setWhiteunoend] = useState(0);
  const [whitedosend, setWhitedosend] = useState(0);
  const [unomint, setUnomint] = useState(0);
  const [dosmint, setDosmint] = useState(0);
  const [publicmint, setPublicmint] = useState(0);

  const getData = async () => {
    setShowLoader(true);
    setLoder(true);
    setInputfiled("");
    const dataAddress = "0x9c0a8d7d9359A9f1C5C78115a2a07e3F37B69C9a";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const singer = provider.getSigner();
    const contact = new ethers.Contract(dataAddress, contactabi, singer);
    console.log(contact);
    setContact(contact);

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

    console.log(Object.keys(obj).length);
    setPublicvar(obj);
    setLoder(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        showloader ? (
          <div>Loading...</div>
        ) : (
          <div></div>
        )
      ) : (
        <div>
          <div className="data-list">
            <h3>maxSupply = {publicvar.maxSupply}</h3>
          </div>

          <div className="data-list">
            <h3>whitelistUnoCap = {publicvar.whitelistUnoCap}</h3>
            {inputfiled === "whitelistUnoCap" ? (
              <input
                type="text"
                onChange={(e) => {
                  setWhitelistUno(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistUnoCap");
                } else {
                  const minprice = await contacts.setWhiteListUnoCap(
                    whitelistUno
                  );
                  setShowLoader(true);
                  setLoder(true);
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistUnoCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>whitelistDosCap = {publicvar.whitelistDosCap}</h3>
            {inputfiled === "whitelistDosCap" ? (
              <input
                type="text"
                onChange={(e) => {
                  setWhitelistdos(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistDosCap");
                } else {
                  const minprice = await contacts.setWhiteListDosCap(
                    whitelistdos
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistDosCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>ownerMintReserved = {publicvar.ownerMintReserved}</h3>
            {inputfiled === "ownerMintReserved" ? (
              <input
                type="text"
                onChange={(e) => {
                  setOwnermint(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("ownerMintReserved");
                } else {
                  const minprice = await contacts.changeOwnerMint(ownermint);
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "ownerMintReserved" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>individualUnoCap = {publicvar.individualUnoCap}</h3>
            {inputfiled === "individualUnoCap" ? (
              <input
                type="text"
                onChange={(e) => {
                  setIndiuno(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("individualUnoCap");
                } else {
                  const minprice = await contacts.setWhiteListUnoIndividualCap(
                    indiuno
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "individualUnoCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>individualDosCap = {publicvar.individualDosCap}</h3>
            {inputfiled === "individualDosCap" ? (
              <input
                type="text"
                onChange={(e) => {
                  setIndodos(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("individualDosCap");
                } else {
                  const minprice = await contacts.setWhiteListDosIndividualCap(
                    indodos
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "individualDosCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>whitelistUnoStartTime = {publicvar.whitelistUnoStartTime}</h3>
            {inputfiled === "whitelistUnoStartTime" ? (
              <input
                type="text"
                onChange={(e) => {
                  setWhiteunostart(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistUnoStartTime");
                } else {
                  const minprice = await contacts.setWhitelistUnoStartTime(
                    whiteunostart
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistUnoStartTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>whitelistDosStartTime = {publicvar.whitelistDosStartTime}</h3>
            {inputfiled === "whitelistDosStartTime" ? (
              <input
                type="text"
                onChange={(e) => {
                  setWhitedosstart(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistDosStartTime");
                } else {
                  const minprice = await contacts.setWhitelistDosStartTime(
                    whitedosstart
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistDosStartTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>whitelistUnoEndTime = {publicvar.whitelistUnoEndTime}</h3>
            {inputfiled === "whitelistUnoEndTime" ? (
              <input
                type="text"
                onChange={(e) => {
                  setWhiteunoend(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistUnoEndTime");
                } else {
                  const minprice = await contacts.setWhitelistUnoEndTime(
                    whiteunoend
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistUnoEndTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>whitelistDosEndTime = {publicvar.whitelistDosEndTime}</h3>
            {inputfiled === "whitelistDosEndTime" ? (
              <input
                type="text"
                onChange={(e) => {
                  setWhitedosend(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistDosEndTime");
                } else {
                  const minprice = await contacts.setWhitelistDosEndTime(
                    whitedosend
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistDosEndTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>
              whitelistUnoMintPrice = {publicvar.whitelistUnoMintPrice} ether
            </h3>
            {inputfiled === "whitelistUnoMintPrice" ? (
              <input
                type="text"
                onChange={(e) => {
                  setUnomint(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistUnoMintPrice");
                } else {
                  const minprice = await contacts.setWhitelistUnoMintPrice(
                    unomint
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistUnoMintPrice" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>
              whitelistDosMintPrice = {publicvar.whitelistDosMintPrice} ether
            </h3>
            {inputfiled === "whitelistDosMintPrice" ? (
              <input
                type="text"
                onChange={(e) => {
                  setDosmint(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("whitelistDosMintPrice");
                } else {
                  const minprice = await contacts.setWhitelistDosMintPrice(
                    dosmint
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "whitelistDosMintPrice" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="data-list">
            <h3>publicMintPrice = {publicvar.publicMintPrice} ether</h3>
            {inputfiled === "publicMintPrice" ? (
              <input
                type="text"
                onChange={(e) => {
                  setPublicmint(Number(e.target.value));
                  console.log(Number(e.target.value));
                }}
              />
            ) : null}
            <button
              onClick={async (e) => {
                const buttontext = e.target.innerText;
                if (buttontext === "Edit") {
                  setInputfiled("publicMintPrice");
                } else {
                  const minprice = await contacts.setPublicMintPrice(
                    publicmint
                  );
                  await minprice.wait();
                  getData();
                }
              }}
            >
              {inputfiled === "publicMintPrice" ? "Update" : "Edit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
