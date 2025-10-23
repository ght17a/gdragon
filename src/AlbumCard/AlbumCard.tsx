import './AlbumCard.css'
import React from 'react'

interface Album {
    albumImg: string;
    albumTitle: string;
    albumReleaseYear: number
}

export const AlbumCard = ({albumImg, albumTitle, albumReleaseYear}: Album) => {
    return (
        <div className='album-card'>
            <img src={albumImg}/>
            <h2>{albumTitle}</h2>
            <h3>{albumReleaseYear}</h3>
        </div>
    )
}

export default AlbumCard