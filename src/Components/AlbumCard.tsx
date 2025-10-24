import { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

type Album = {
  id: string;
  name: string;
  albumImg: string;
  releaseYear: number;
};

export const AlbumCard = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const getAlbums = async () => {
            const q = query(collection(db, "album"), orderBy("releaseYear", "asc"))
            const querySnapshot = await getDocs(q);
            const albumsData:Album[] = querySnapshot.docs.map(doc => ({
                ...(doc.data() as Omit<Album, "id">),
                id: doc.id,
            }));
            setAlbums(albumsData);
        }
        getAlbums();
    },[])

    return (
        <div className='album-list'>
            {albums.map((album) => (
                <div className='album-card' key={album.id}>
                    <img src={album.albumImg}/>
                    <h3>{album.name}</h3>
                    <h4>{album.releaseYear}</h4>
                </div>
            ))}
        </div>
    )
}

export default AlbumCard