import AlbumCard from '../AlbumCard/AlbumCard'
import './Discography.css'

export const Discography = () => {
    return (
        <div>
            <h1>G-Dragon's Discography</h1>
            <h2>Solo Albums</h2>
            <div className='album-list'>
                <AlbumCard 
                    albumImg="https://firebasestorage.googleapis.com/v0/b/gdragon-79cef.firebasestorage.app/o/heartbreaker.jpg?alt=media&token=77ace068-59c5-4983-86f5-9637785fc349" 
                    albumTitle="Heartbreaker" 
                    albumReleaseYear={2009}
                />
                <AlbumCard 
                    albumImg="https://firebasestorage.googleapis.com/v0/b/gdragon-79cef.firebasestorage.app/o/oneofakind.jpg?alt=media&token=5681e3e5-6fba-4609-92f3-d4570523d939" 
                    albumTitle="One of a Kind" 
                    albumReleaseYear={2012}
                />
                <AlbumCard 
                    albumImg="https://firebasestorage.googleapis.com/v0/b/gdragon-79cef.firebasestorage.app/o/coupdetat.jpg?alt=media&token=ebc3383f-2c46-45e3-8188-a604394dce1b" 
                    albumTitle="Coup d'Etat" 
                    albumReleaseYear={2013}
                />
                <AlbumCard 
                    albumImg="https://firebasestorage.googleapis.com/v0/b/gdragon-79cef.firebasestorage.app/o/kwonjiyong.jpg?alt=media&token=4c6a619b-9020-49ab-86ae-53a3a67245cc" 
                    albumTitle="Kwon Ji Yong" 
                    albumReleaseYear={2017}
                />
                <AlbumCard 
                    albumImg="https://firebasestorage.googleapis.com/v0/b/gdragon-79cef.firebasestorage.app/o/ubermensch.jpg?alt=media&token=a0ae1c9c-bc65-4b47-8692-c9d5527a5092" 
                    albumTitle="Übermensch" 
                    albumReleaseYear={2025}
                />
            </div>
        </div>
    )
}

export default Discography