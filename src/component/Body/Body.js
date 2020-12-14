import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import SongRow from "../SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { playPlaylist } from "../../redux/actions";

function Body() {
  const discover_weekly = useSelector((state) => state.discover_weekly);
  const showSearch = useSelector((state) => state.showSearch);
  const tracks = useSelector((state) => state.tracks);
  const playing = useSelector((state) => state.playing);
  const showPlaylist = useSelector((state) => state.showPlaylist);
  const playlist = useSelector((state) => state.playlist);

  const dispatch = useDispatch();

  return (
    <div className="body">
      <Header />

      <div className="body__info">
        <div className="body__infoText">
          {(!showSearch && !showPlaylist) ?
            <>
              <strong>PLAYLIST</strong>
              <h2>{discover_weekly?.name}</h2>
              <p>{discover_weekly?.description}</p>
            </>
            :
            <>
              {showSearch ?
                <h2>Results for {showSearch}</h2>
                : null}
              {showPlaylist ?
                <>
                  <strong>PLAYLIST</strong>
                  <h2>{playlist?.name}</h2>
                  <p>{playlist?.description}</p>
                </> : null}
            </>
          }
        </div>
      </div>

      <div className="body__songs">

        <div className="body__icons">
          {playing ?
            <PauseCircleFilledIcon
              className="body__shuffle"
              onClick={() => dispatch(playPlaylist())}
            />
            :
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={() => dispatch(playPlaylist())}
            />
          }

          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {(!showSearch && !showPlaylist) ?
          discover_weekly?.tracks.items.map((item, idx) => (
            <SongRow track={item.track} key={idx} />
          )) :
          <>
            {showSearch ?
              tracks?.items.map((item, idx) => (
                <SongRow track={item} key={-1 + idx * -1} />
              )) :
              null
            }

            {showPlaylist ?
              playlist?.tracks?.items?.map((item, idx) => (
                <SongRow track={item.track} key={idx} />
              )) : null
            }
          </>
        }
      </div>
    </div>
  );
}

export default Body;
