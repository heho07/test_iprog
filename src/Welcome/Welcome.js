import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <br/>
        <center>
          <div className = "row">
            <div className = "col-sm-4 teststyle">
              <center>Add image here</center>
              <br />
              <h4><center>My Collection</center></h4>
            </div> 
            <div className = "col-sm-4 teststyle">
              <center>Add image here</center>  
              <br />            
              <h4><center> 
                <Link to = "/VersusMode"><button>VS Mode</button></Link>
              </center></h4>
            </div> 
            <div className = "col-sm-4 teststyle">
              <center>Add image here</center>
              <br />
              <h4><center>Store</center></h4>
            </div> 
          </div>
          <br />
          <br />
          <br />
          <Link to="/SearchScreen">
            <button>This button can link us to the next view</button>
          </Link>
        </center>
      </div>
    );
  }
}

export default Welcome;
