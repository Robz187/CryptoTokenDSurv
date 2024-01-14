import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client/";


const init = async () => { 
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()){
    handleAuth(authClient);
  }else{
    await authClient.login()({
      identityProvide:"https://identity.ic0.app/#authorize",
        onSuccess: () => {
          handleAuth(authClient);
      }
  });
  }

}

async function handleAuth(authClient){
 const identity = await authClient.getIdentity();
 const user= identity._principal.toString();
 console.log(user);
  ReactDOM.render(<App loggedInPrincipal={user}/>, document.getElementById("root"));
}

init();


