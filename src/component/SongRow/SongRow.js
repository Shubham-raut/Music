import React from "react";
import { useDispatch } from "react-redux";
import { playSong } from "../../redux/actions";

function SongRow({ track }) {
  const dispatch = useDispatch();

  return (
    <div className="songRow"
      onClick={() => dispatch(playSong(track))}
    >
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
