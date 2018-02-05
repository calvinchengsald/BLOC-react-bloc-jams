import React, {Component} from 'react';
import albumData from './../data/albums'
import {Link} from 'react-router-dom'

class Library extends Component{

  constructor(props){
    super(props);
    this.state={
      albums: albumData
    }
  }
  render(){
    return(
      <section className = 'library'>

        {this.state.albums.map( (data, index) =>
          <Link to={`/album/${data.slug}`} key={index}>
            <img src={data.albumCover} alt={data.title} />
            <div> {data.title} </div>
            <div> {data.artist} </div>
            <div> {data.songs.length} tracks</div>
          </Link>
        )}
      </section>
    );
  }
}

export default Library;
