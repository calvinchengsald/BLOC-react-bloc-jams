
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
      <section className = "landing">
        <h1 className = "hero-title"> Turn the music up!</h1>
        <section className = 'selling-points'>
          <div className='point'>
            <h2 className='point-title'> Choose your music. </h2>
            <p className='point-description'>The world is full of music; why should you have to listen to music that someone else chose? </p>
          </div>

          <div className='point'>
            <h3 className='point-title'> Unlimited, streaming, ad-free </h3>
            <p className='point-description'>No arbitrary limits. No distractions. </p>
          </div>

          <div className='point'>
            <h4 className='point-title'> Mobile enabled. </h4>
            <p className='point-description'> Listen to your music on the go. This streaming service is available on all mobile platforms. </p>
          </div>
        </section>

      </section>

    );
  }


}
export default Landing;
