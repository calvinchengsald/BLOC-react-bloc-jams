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
     //console.log("volup set to " + newVolume);
     this.setState({volume : newVolume});
   }
   handleVolumeDown(){
     let newVolume =  Math.max((this.audioElement.volume - 0.1),0.0);
     this.audioElement.volume = newVolume;
     newVolume *= 100;
     //console.log("voldown set to " + newVolume);
     this.setState({volume : newVolume});
   }
   componentDidMount(){
     this.eventListeners={
       timeUpdate: (e)=>{
         this.setState({currentTime : this.audioElement.currentTime});
         if(this.state.autoplay && this.state.currentTime === this.state.duration){
           this.handleNextSong();
         }
       },
       durationChange: (e)=>{
         this.setState({duration : this.audioElement.duration});
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
   mouseOver(e, song){
     var idnum = e.target.id.charAt(0);
     var dummyEle = document.getElementById(idnum+'-song-span');
     dummyEle.innerHTML="";
     if(this.state.currentSong.title===song.title && this.state.isPlaying){
       dummyEle.className = 'ion-ios-pause';
     }
     else {
       dummyEle.className = 'ion-ios-play';
     }
   }
   mouseOut(e, song, index){
     var idnum = e.target.id.charAt(0);
     var dummyEle = document.getElementById(idnum+'-song-span');
     if(this.state.currentSong.title===song.title && this.state.isPlaying){
       dummyEle.className = 'ion-ios-pause';
     }
     else if(this.state.currentSong.title===song.title){
       dummyEle.className = 'ion-ios-play';
     }
     else{
       dummyEle.className = '';
       dummyEle.innerHTML = index+1;
     }

   }

   render() {
     return (
       <section className="album container">
        <section className="album-info">
          <div className='row'>
            <img className='album-cover-art col-lg-6 col-md-6 col-sm-12 col-xs-12 img-rounded' src={this.state.currentAlbum.albumCover} alt ={this.state.currentAlbum.title}/>
            <div className='album-details col-lg-6 col-md-6 col-sm-12 col-xs-12' >
              <h1 className='album-details-title'> Title: {this.state.currentAlbum.title} </h1>
              <h2 className='album-details-artist'> Artist: {this.state.currentAlbum.artist} </h2>
              <div className='album-details-release-info'> Release Info: {this.state.currentAlbum.releaseInfo} </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-xs-12">
              <table className='table table-boardered table-hover' id='song-list'>
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
                <tbody >
                  {this.state.currentAlbum.songs.map( (song, index)=>
                    <tr onMouseOut={(e)=>this.mouseOut(e,song, index)} onMouseOver= {(e)=>this.mouseOver(e, song)} id={index+'-song-tr'} className = 'song' key={index}  onClick={()=>this.handleClickSong(song)}>
                      <td id= {index+'-song-td'} >
                          <button id = {index+'-song-button'}  >
                            <span  id={index+'-song-span'} className={(this.state.currentSong===song)?(this.state.isPlaying?'ion-ios-pause':'ion-ios-play'):"song-number"}>{(this.state.currentSong===song)?"":index+1}</span>
                         </button>
                      </td>
                      <td id={index+'-song-td-title'}> {song.title} </td>
                      <td id={index+'-song-td-duration'}> {song.duration} </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className='row'>
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
          </div>
        </section>

      </section>
     );
   }
 }

 export default Album;
