import React, {Component} from 'react';

class PlayerBar extends Component{

  formatTime(seconds){
    if(!seconds) {return "-:--";}
    let min = Math.floor(seconds/60);
    let sec = Math.floor(seconds%60);
    if (sec<10){
      sec = "0" + sec;
    }
    return min + ":" + sec;
  }

  render(){
    return(
      <section className='player-bar container'>
      {this.props.currentSong?this.props.currentSong.title:"none"} is {this.props.isPlaying?"playing":"not playing"}
      <div className='row'>
        <div className='control-buttons col-lg-2 col-md-2 col-sm-3 col-xs-2' >
          <button id="previous" onClick={this.props.handlePreviousSong}>
            <span className="ion-skip-backward "></span>
          </button>
          <button id="play-pause"  onClick={this.props.isPlaying?this.props.handlePause:this.props.handlePlay}>
            <span className={this.props.isPlaying?'ion-ios-pause':'ion-ios-play'}></span>
          </button>
          <button id="next" onClick={this.props.handleNextSong}>
            <span className="ion-skip-forward"></span>
          </button>
          <button id="autoplay" onClick={this.props.handleToggleAutoplay}>
           <span className={this.props.autoplay?'ion-ios-refresh':'ion-ios-refresh-outline'} ></span>
          </button>
        </div>
        <span className="current-time col-lg-1 col-md-1 col-sm-1 col-xs-1">{this.formatTime(this.props.currentTime)}</span>
        <input
         type="range"
         className="seek-bar col-lg-4 col-md-4 col-sm-3 col-xs-4 duration-slider"
         value={(this.props.currentTime / this.props.duration) || 0}
         max="1"
         min="0"
         step="0.01"
         onChange={this.props.handleTimeChange}
         />
        <span className="total-time col-lg-1 col-md-1 col-sm-1 col-xs-1">{this.formatTime(this.props.duration)}</span>
        <span className="icon ion-volume-low col-lg-1 col-md-1 col-sm-1 col-xs-1" onClick={this.props.handleVolumeDown}></span>
        <input
          type="range"
          className="seek-bar col-lg-2 col-md-2 col-sm-2 col-xs-2"
          value={this.props.volume}
          max="99"
          min="0"
          step="1"
          onChange = {this.props.handleVolumeChange}
          />
        <span className="icon ion-volume-high col-lg-1 col-md-1 col-sm-1 col-xs-1" onClick={this.props.handleVolumeUp}></span>



      </div>
      </section>
    );
  }
}
export default PlayerBar;
