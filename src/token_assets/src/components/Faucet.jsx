import React,{useState} from "react";
import { token, canisterId , createActor } from "../../../declarations/token/index";
import { AuthClient } from "@dfinity/auth-client/";


function Faucet(props) {
  const [isDisabled,setDisable] = useState(false)
  const [buttonText,setText]= useState("gimme gimee")
    async function handleClick(event) {

    setDisable(true)
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });

   const text= await token.payOut();
   setText(text);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your Wallet:"{props.user}".</label>
      <p className="trade-buttons">
        <button disabled={isDisabled} state  id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
