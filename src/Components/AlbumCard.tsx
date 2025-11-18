import { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';

type Album = {
  id: string;
  name: string;
  albumImg: string;
  releaseYear: number;
  albumId: string;
};

export const AlbumCard = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const getAlbums = async () => {
            const q = query(collection(db, "album"), orderBy("releaseYear", "asc"))
            const querySnapshot = await getDocs(q);
            const albumsData:Album[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<Album, "id">),
            }));
            setAlbums(albumsData);
        }
        getAlbums();
    },[])

    return (
        <div className='album-list'>
            {albums.map((album) => (
                <NavLink key={album.id} to={`/discography/${album.id}`}>
                    <div className='album-card'>
                        <img src={album.albumImg}/>
                        <h3>{album.name}</h3>
                        <h4>{album.releaseYear}</h4>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default AlbumCard