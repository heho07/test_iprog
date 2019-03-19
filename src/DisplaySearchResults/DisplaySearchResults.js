import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing the modelInstance directly (as opposed to passing it as a prop)
// this is easier because it makes the component less dependent on the way it is implemented from its parents.
import modelInstance from "../data/Model";



// Renders HTML for the search results.
// What filter to search for is passed to it from its parent component (this.props.filter)
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      loading: true,
      filter:this.props.filter,
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    if (this.state.filter === "") {
      return;
    }
      modelInstance.searchCards(this.state.filter).then(
        results =>{ 
          console.log(results);
          this.setState({
            loading: false, 
            searchResult: results
          });
        }
      ).catch(
        e => this.setState({
          loading:null, 
          status:"ERROR",
        })
      );
  }

  
  handleClickOnCard(obj, destination){
    modelInstance.addCardToDeck(obj, destination);
  }


// Creates HTML containing information about the cards found in the search
// This function could be generalized into it's own class so that it can more easily be used elsewhere
  showCard(){
    return(
      <div>
        <table>
          <tbody>
            {this.state.searchResult.map((item, i) => {
              // Due to the webserver needing a secure (https://) source we parse the insecure (http) image from
              // our API into a webserver which returns a secure link to the image
              let img =null;
              if (item.img != null){
                img = "https://images.weserv.nl/?url=" + item.img.replace("http://", "");
              }              
              return(
                <tr key = {item.cardId}>
                  <td><img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/></td>
                  <td>{"name: " + item.name}</td>
                  <td>{"id: " + item.cardId}</td>
                  <td>{"type: " + item.type}</td>
                  <td>{"cost: " + item.cost}</td>
                  <td>{"attack: " + item.attack}</td>
                  <td>{"health: " + item.health}</td>
                  <td><button onClick = {() => this.handleClickOnCard(item, "user")}>Add to user</button></td>
                  <td><button onClick = {() => this.handleClickOnCard(item, "opponent")}>Add to opponent</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>thisWillShowTheCurrentCard</p>
      </div>

    );
  }

// The HTML to be rendered on the page
  render(){
    let information = null;
    // Checks if we are loading or not using the components state
    switch(this.state.loading){
      case true:
        information = <p>loading...</p>;
        break;
      case false:
        information = this.showCard();
        break;
      default:
        information = <p>Something went wrong</p>;
        break;
    }
    return(
      <div>
        {information}
      </div>
    );
  }
}



export default SearchResults;