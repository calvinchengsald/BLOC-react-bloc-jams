import React, {Component} from 'react';

class PlayerBar extends Component{

  render(){
    return(
      <section className='player-bar'>
        song is {this.props.isPlaying?"playing":"not playing"} title {this.props.currentSong?this.props.currentSong.title:"none"}
        <section id="buttons">
           <button id="previous" onClick={this.props.handlePreviousSong}>
             <span className="ion-skip-backward"></span>
           </button>
           <button id="play-pause" onClick={this.props.isPlaying?this.props.handlePause:this.props.handlePlay}>
             <span className={this.props.isPlaying?'ion-ios-pause':'ion-ios-play'}></span>
           </button>
           <button id="next" onClick={this.props.handleNextSong}>
             <span className="ion-skip-forward"></span>
           </button>
         </section>
         <section id="time-control">
           <div className="current-time">–:––</div>
           <input type="range" className="seek-bar" value="0" />
           <div className="total-time">-:––</div>
         </section>
         <section id="volume-control">
           <div className="icon ion-volume-low"></div>
           <input type="range" className="seek-bar" value="80" />
           <div className="icon ion-volume-high"></div>
         </section>
      </section>
    );
  }
}
export default PlayerBar;
