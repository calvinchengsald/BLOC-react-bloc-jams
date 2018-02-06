import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

 class Album extends Component {

   constructor(props){
     super(props);

     const currentAlbum = albumData.find( album => {
       return album.slug === this.props.match.params.slug;
     });

     this.state ={
       currentAlbum : currentAlbum,
       currentSong : currentAlbum.songs[0],
       isPlaying: false,
       currentTime: 0,
       duration: currentAlbum.songs[0].duration,
       autoplay: false,
       volume: 50,
     }

     this.audioElement = document.createElement('audio');
     this.audioElement.src = this.state.currentAlbum.songs[0].audioSrc;
     this.audioElement.volume = 50/100;
   }

   play(){
     this.audioElement.play();
     this.setState({
       isPlaying : true
     });
   }
   pause(){
     this.audioElement.pause();
     this.setState({
       isPlaying : false
     });
   }
   setSong(songToBe){
     this.setState({
       currentSong : songToBe
     })
     this.audioElement.src= songToBe.audioSrc;
   }
   handleClickSong(song){
     const isSameSong = (song === this.state.currentSong);
     if(isSameSong && this.state.isPlaying){
       this.pause();
       return;
     }
     if(isSameSong && !this.state.isPlaying){
       this.play();
       return;
     }
     this.setSong(song);
     this.play();
   }
   handleNextSong(){
     //let indexf = this.state.currentAlbum.indexOf(this.state.currentSong);
     var indexf = this.state.currentAlbum.songs.findIndex(song => this.state.currentSong ===song);
     indexf = (indexf+1)% this.state.currentAlbum.songs.length;
     this.setSong(this.state.currentAlbum.songs[indexf]);
     this.play();
   }
   handleToggleAutoplay(){
      if(!this.state.autoplay && this.state.currentTime === this.state.duration){
        this.handleNextSong();
      }
      this.setState({autoplay: !this.state.autoplay});
   }
   handlePreviousSong(){
     //let indexf = this.state.currentAlbum.indexOf(this.state.currentSong);
     var indexf = this.state.currentAlbum.songs.findIndex( song => this.state.currentSong === song);
     indexf = (indexf-1+this.state.currentAlbum.songs.length)% this.state.currentAlbum.songs.length;
     this.setSong(this.state.currentAlbum.songs[indexf]);
     this.play();
   }
   handleTimeChange(e){
     //console.log(e.target.value);
     const newTime = (e.target.value * this.audioElement.duration)|| 0;
     this.audioElement.currentTime = newTime;
     //this.setState({currentTime:newTime})
   }
   handleVolumeChange(e){
     const newVol = (e.target.value ) || 0;
     this.audioElement.volume = (newVol / 100)||0;
     this.setState({volume: e.target.value});
   }
   handleVolumeUp(){
     let newVolume =  Math.min((this.audioElement.volume + 0.1),1.0);
     this.audioElement.volume = newVolume;
     newVolume *= 100;
     console.log("volup set to " + newVolume);
     this.setState({volume : newVolume});
   }
   handleVolumeDown(){
     let newVolume =  Math.max((this.audioElement.volume - 0.1),0.0);
     this.audioElement.volume = newVolume;
     newVolume *= 100;
     console.log("voldown set to " + newVolume);
     this.setState({volume : newVolume});
   }
   componentDidMount(){
     this.eventListeners={
       timeUpdate: (e)=>{
         this.setState({currentTime : this.audioElement.currentTime});
         if(this.state.autoplay && this.state.currentTime === this.state.duration){
           this.handleNextSong();
         }
         console.log("timeupdate");
       },
       durationChange: (e)=>{
         this.setState({duration : this.audioElement.duration});
         console.log("durationupdate");
       }
    }
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeUpdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationChange);
   }
   componentWillUnmount(){
//     this.eventListeners = null;
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeUpdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  //   this.audioElement = null;
   }

   render() {
     return (
       <section className="album">
        <section className="album-info">
          <img className='album-cover-art' src={this.state.currentAlbum.albumCover} alt ={this.state.currentAlbum.title}/>

          <div className='album-details'>
            <h1 className='album-details-title'> Title: {this.state.currentAlbum.title} </h1>
            <h2 className='album-details-artist'> Artist: {this.state.currentAlbum.artist} </h2>
            <div className='album-details-release-info'> Release Info: {this.state.currentAlbum.releaseInfo} </div>
            <table id='song-list'>
              <colgroup>
                <col id='song-number-column'/>
                <col id='song-title-column'/>
                <col id='song-duration-colum'/>
              </colgroup>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Title</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                {this.state.currentAlbum.songs.map( (song, index)=>
                  <tr className = 'song' key={index} onClick={()=>this.handleClickSong(song)}>
                    <td>
                        <button>
                          <span className="song-number">{index+1}</span>
                       </button>
                    </td>
                    <td> {song.title} </td>
                    <td> {song.duration} </td>
                  </tr>
                )}
              </tbody>
            </table>
            <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            handlePlay={()=>this.play()}
            handlePause={()=>this.pause()}
            handleNextSong={()=>this.handleNextSong()}
            handlePreviousSong={()=>this.handlePreviousSong()}
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            handleTimeChange={(e)=>this.handleTimeChange(e)}
            handleVolumeChange={(e)=>this.handleVolumeChange(e)}
            handleToggleAutoplay={()=>this.handleToggleAutoplay()}
            autoplay={this.state.autoplay}
            volume={this.state.volume}
            handleVolumeUp = {()=>this.handleVolumeUp()}
            handleVolumeDown = {()=>this.handleVolumeDown()}
            />

            <div>[Debug info] Current Song: {this.state.currentSong.title} </div>
            <div>[Debug info] Current Src: {this.audioElement.src}</div>



          </div>
        </section>

      </section>
     );
   }
 }

 export default Album;
