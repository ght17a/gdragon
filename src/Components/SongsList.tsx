import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDoc, getDocs, query, where, orderBy, doc } from "firebase/firestore";
import { db } from "../firebase";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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
  songLink: string;
};

export const SongsList = () => {
    const { albumId } = useParams<{ albumId: string}>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Player state
    const playerRef = useRef<AudioPlayer | null>(null);
    const [currentSrc, setCurrentSrc] = useState<string | null>(null);
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
    const urlCacheRef = useRef<Map<string, string>>(new Map());

    useEffect(() => {
        if(!albumId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null)

                const albumRef = doc(db, "album", albumId);
                const albumSnap = await getDoc(albumRef);
                if(!albumSnap.exists) {
                    setError("Album introuvable");
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

    const resolveUrl = async (songLink: string): Promise<string | null> => {
        if (!songLink) return null;

        const cache = urlCacheRef.current;

        if (cache.has(songLink)) return cache.get(songLink)!;

        if (/^https?:\/\//i.test(songLink)) {
            cache.set(songLink, songLink);
            return songLink;
        }

        return null;
    };

    const onClickTrack = async (track: Song) => {
        try {
            setCurrentTrackId(track.id);
            const url = await resolveUrl(track.songLink);
            if(!url) {
                setError("URL invalide pour cette chanson.")
                setCurrentTrackId(null);
                return;
            }

            if(currentTrackId === track.id) {
                const audioEl = playerRef.current?.audio?.current;

                if(!audioEl) {
                    setCurrentTrackId(null);
                    return;
                }

                if(audioEl.paused) await audioEl.play().catch(() => {});
                else audioEl.pause();
                setCurrentTrackId(null);
                return;
            }

            setCurrentSrc(url);
            setCurrentTrackId(null);
        } catch (error) {
            console.error(error)
        } finally {
            setCurrentTrackId(null)
        }
    }

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
                {songs.map((song) => {
                    return (
                        <li key={song.id} 
                            className="song-item"
                            onClick={() => onClickTrack(song)}
                        >
                            <div>
                                {song.trackNumber ?? "-"}. {song.title} {song.length ? <span>{formatDuration(song.length)}</span> : null}
                            </div>
                        </li>
                    )
                })}
            </ul>

            {currentSrc && (
                <div className="audio-player">
                    <AudioPlayer
                        autoPlay
                        ref={playerRef}
                        src={currentSrc}
                        volume={0.1}
                        showJumpControls={false}
                    />
                </div>
            )}

        </div>
    )
}

function formatDuration(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default SongsList