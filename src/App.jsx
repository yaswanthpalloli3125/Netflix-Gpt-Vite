import React from "react";
import Body from "../Components/Body";
import {Provider} from  "react-redux";
import appstore from "../src/utils/appstore"
import "./App.css";

function App() {

  
  return (
   
  
   <Provider store={appstore}><Body/></Provider> 
    
  );
}

export default App;
