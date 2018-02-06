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
           <button id="autoplay" onClick={this.props.handleToggleAutoplay}>
            <span className={this.props.autoplay?'ion-ios-refresh':'ion-ios-refresh-outline'} ></span>
           </button>
         </section>
         <section id="time-control">
           <div className="current-time">{this.formatTime(this.props.currentTime)}</div>
           <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
            />
           <div className="total-time">{this.formatTime(this.props.duration)}</div>
         </section>
         <section id="volume-control">
           <div className="icon ion-volume-low" onClick={this.props.handleVolumeDown}></div>
           <input
             type="range"
             className="seek-bar"
             value={this.props.volume}
             max="99"
             min="0"
             step="1"
             onChange = {this.props.handleVolumeChange}
             />
           <div className="icon ion-volume-high" onClick={this.props.handleVolumeUp}></div>
         </section>
      </section>
    );
  }
}
export default PlayerBar;
