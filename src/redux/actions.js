import store from './store';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromResponse } from "../config/spotify";

import {
  SET_USER,
  SET_PLAYING,
  SET_ITEM,
  SET_DISCOVER_WEEKLY,
  SET_TOKEN,
  SET_PLAYLISTS,
  SET_SEARCH,
  SET_TRACKS,
  SET_ERROR,
  SET_FETCHING,
  SET_SHOWERROR,
  SET_PLAYLIST,
  SET_HOME,
  RESET,

} from "./CONSTANTS";

const s = new SpotifyWebApi();

const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

const setDiscoverWeekly = (discover_weekly) => {
  return {
    type: SET_DISCOVER_WEEKLY,
    discover_weekly,
  }
}

const setPlaylists = (playlists) => {
  return {
    type: SET_PLAYLISTS,
    playlists,
  }
}

const setError = (error) => {
  return {
    type: SET_ERROR,
    error,
  }
}

const setFetching = () => {
  return {
    type: SET_FETCHING,
  }
}

const setItem = (item) => {
  return {
    type: SET_ITEM,
    item,
  }
}

const setPlaying = (playing) => {
  return {
    type: SET_PLAYING,
    playing,
  }
}

const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    search,
  }
}

const setTracks = (tracks) => {
  return {
    type: SET_TRACKS,
    tracks,
  }
}

export const setShowError = () => {
  return {
    type: SET_SHOWERROR,
  }
}

export const reset = () => {
  return {
    type: RESET,
  }
}

export const initialFetch = () => {
  return (dispatch) => {
    let token;
    if (store.getState().token) {
      token = store.getState().token;
    }
    else {
      const hash = getTokenFromResponse();
      window.location.hash = "";
      token = hash.access_token;
    }

    if (token) {
      s.setAccessToken(token);
      dispatch(setToken(token));
      dispatch(setFetching());
      s.getMe()
        .then((user) => {
          dispatch(setUser(user));

          s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
            dispatch(setDiscoverWeekly(response))
          );

          s.getUserPlaylists().then((playlists) => {
            dispatch(setPlaylists(playlists));
          });
        })
        .catch((err) => {
          if (err.status === 401) {
            dispatch(reset());
          }
          else {
            dispatch(setError(err));
          }
        });
    }
  }
}

export const playPlaylist = () => {
  return (dispatch) => {
    if (store.getState().item) {
      dispatch(setItem(store.getState().item))
      dispatch(setPlaying(!store.getState().playing));
    }
  }
};

export const playSong = (track) => {
  return (dispatch) => {
    dispatch(setItem(track));
    dispatch(setPlaying(true));
  }
};

export const handlePlayPause = (activeSong) => {
  return (dispatch) => {
    if (!!activeSong) {
      if (store.getState().playing) {
        activeSong.pause();
        dispatch(setPlaying(false));
      } else {
        activeSong.play();
        dispatch(setPlaying(true));
      }
    }
    else if (store.getState().item) {
      dispatch(setItem(store.getState().item))
      dispatch(setPlaying(!store.getState().playing));
    }

    // else {
    //   dispatch(setItem(store.getState().item || store.getState().discover_weekly.tracks.items[0].track))
    //   dispatch(setPlaying(!store.getState().playing));
    // }
  }
};

export const searchHandlor = (searchTxt) => {
  return (dispatch) => {
    if (searchTxt) {
      dispatch(setFetching());
      s.searchTracks(searchTxt).then((data) => {
        dispatch(setSearch(searchTxt));
        dispatch(setTracks(data.tracks));
      })
        .catch((err) => {
          dispatch(setError(err));
        })
    } else if (store.getState().search) {
      dispatch(setSearch(false));
    }
  }
};

export const gotoHome = () => {
  return {
    type: SET_HOME,
  }
};

const setPlaylist = (playlist) => {
  return {
    type: SET_PLAYLIST,
    playlist
  }
}

export const showPlayList = (id) => {
  return (dispatch) => {
    s.getPlaylist(id).then((response) =>
      dispatch(setPlaylist(response))
    );
  }
}

// export const logOutHandlor = () => {
//   return (dispatch) => {
//     dispatch(reset());
//   }
// } 
