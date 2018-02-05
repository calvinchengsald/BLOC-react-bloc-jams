import React, { Component } from 'react';
import albumData from './../data/albums'

 class Album extends Component {

   constructor(props){
     super(props);

     const currentAlbum = albumData.find( album => {
       return album.slug === this.props.match.params.slug;
     });

     this.state ={
       currentAlbum : currentAlbum
     }
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
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Length</th>
              </tr>
              <tbody>
                {this.state.currentAlbum.songs.map( (song, index)=>
                  <tr>
                    <td> {index +1} </td>
                    <td> {song.title} </td>
                    <td> {song.duration} </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </section>

      </section>
     );
   }
 }

 export default Album;
