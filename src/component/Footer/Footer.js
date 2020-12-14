import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import { handlePlayPause } from "../../redux/actions";

function Footer() {
  const item = useSelector((state) => state.item);
  const playing = useSelector((state) => state.playing);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (ref?.current) {
      if (playing) {
        ref.current.play();
      }
      else {
        ref.current.pause();
      }
    }
  }, [playing]);

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
            <div className="footer__songInfo">
              <h4>No song is playing</h4>
              <p>...</p>
            </div>
          )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={() => dispatch(handlePlayPause(ref.current))}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
            <PlayCircleOutlineIcon
              onClick={() => dispatch(handlePlayPause(ref.current))}
              fontSize="large"
              className="footer__icon"
            />
          )}
        {item ?
          <audio
            id="songPlay"
            ref={ref}
            src={item.preview_url}
            type="audio/mp3"
            controls autoPlay /> :
          null
        }
        <SkipNextIcon className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
