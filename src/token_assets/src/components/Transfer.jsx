import React , {useState} from "react";
import {Principal} from "@dfinity/principal";
import {token, canisterId,createActor} from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client";
//Make the Transaction work without Deployment on the Live ICP 

function Transfer() {
  const [Id,setId] = useState("");
  const [amount, setAmount] = useState("")
  const [disabled,setDisabled] = useState(false);
  const [button,setButton] = useState("Transfer")
  const [hidden,setHidden] = useState(true)
  
  async function handleClick() {
    setDisabled(true)
    const authClient = await AuthClient.create();
    const recipient = Principal.fromText(recipient.Id);
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      }
    })
    const transferAmount = Number(amount);
   const transfer = await authenticatedCanister.transfer(recpient,transferAmount);
    setButton(transfer);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={Id}
                onChange={(e)=> setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disabled} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{button}</p>
      </div>
    </div>
  );
}

export default Transfer;
