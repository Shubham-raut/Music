import React from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useStateValue } from "../../context/StateProvider";
import SongRow from "../SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ discover_weekly, item, playing, search, tracks }, dispatch] = useStateValue();

  const playPlaylist = () => {
    dispatch({
      type: "SET_ITEM",
      item: item || discover_weekly.tracks.items[0].track,
    });
    dispatch({
      type: "SET_PLAYING",
      playing: !playing,
    });
  };

  const playSong = (track) => {
    dispatch({
      type: "SET_ITEM",
      item: track,
    });
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">

        {!search ?
          <>
            {/* {discover_weekly && discover_weekly.images ?
              <img src={discover_weekly?.images[0].url} alt="" /> : null
            } */}
            <div className="body__infoText">
              <strong>PLAYLIST</strong>
              <h2>Discover Weekly</h2>
              <p>{discover_weekly?.description}</p>
            </div>
          </> :
          <>
            <div className="body__infoText">
              <h2>Results for {search}</h2>
            </div>
          </>
        }
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {!search ?
          discover_weekly?.tracks.items.map((item, idx) => (
            <SongRow playSong={playSong} track={item.track} key={idx} />
          )) :
          tracks?.items.map((item, idx) => (
            <SongRow playSong={playSong} track={item} key={-1 + idx * -1} />
          ))
        }
      </div>
    </div>
  );
}

export default Body;
