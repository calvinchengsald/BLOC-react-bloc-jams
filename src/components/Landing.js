
import React, {Component} from 'react';
class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
        message: "welcome"
    };
  }

  render(){

    return(
      <h1> this is the landing, {this.state.message} </h1>
    );
  }


}
export default Landing;
