import "./App.css";
import { ethers } from "ethers";
import contactabi from "./contactABI.json";

const getData = async () => {
  const dataAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contact = new ethers.Contract(dataAddress, contactabi, provider);
  console.log(contact);

  const num = await contact.name();
  console.log(num);
};

function App() {
  return (
    <div className="App">
      <button onClick={getData}>GetData</button>
    </div>
  );
}

export default App;
