import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDoc, getDocs, query, where, orderBy, doc } from "firebase/firestore";
import { db } from "../firebase";

type Album = {
  id: string;
  name: string;
  albumImg: string;
  releaseYear: number;
};

type Song = {
  id: string;
  title: string;
  length: number;
  trackNumber: number;
  albumId: string;
};

export const SongsList = () => {
    const { albumId } = useParams<{ albumId: string}>();
    const [album, setAlbum] = useState<Album | null>(null)
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if(!albumId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null)

                const albumRef = doc(db, "album", albumId);
                const albumSnap = await getDoc(albumRef);
                if(!albumSnap.exists) {
                    setError("Alnum introuvable");
                    setAlbum(null);
                    setSongs([]);
                    setLoading(false)
                    return;
                }
                const albumData = { id: albumSnap.id, ...(albumSnap.data() as Omit<Album, "id">)}
                setAlbum(albumData as Album)

                const q = query(
                    collection(db, "musique"),
                    where("albumId", "==", albumId),
                    orderBy("trackNumber", "asc")
                )
                const querySnapshot = await getDocs(q);
                const songsData: Song[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Song, "id">),
                }));
                setSongs(songsData);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else if (typeof e === "string") {
                    setError(e);
                } else {
                    setError("Erreur inattendue");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [albumId])

    if (!albumId) return <p>Album ID manquant.</p>;
    if (loading) return <p>Chargement…</p>;
    if (error) return <p style={{ color: "crimson" }}>{error}</p>;
    if (!album) return <p>Album introuvable.</p>;

    return (
        <div>
            <div className="album-info">
                <img
                    src={album.albumImg}
                    alt={album.name}
                    className="album-cover"
                    width={200}
                    height={200}
                    />
                <div className="album-details">
                    <h1>{album.name}</h1>
                    <p>Sortie : {album.releaseYear} | {songs.length} titre{songs.length > 1 ? "s" : ""}</p>
                </div>
            </div>
        
            <ul className="song-list">
                {songs.map((song) => (
                    <li key={song.id} className="song-item">
                        <span>{song.trackNumber ?? "-"}. {song.title} {song.length ? <span>{formatDuration(song.length)}</span> : null}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function formatDuration(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default SongsList