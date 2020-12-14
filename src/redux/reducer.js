import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  SET_USER,
  SET_PLAYING,
  SET_ITEM,
  SET_DISCOVER_WEEKLY,
  SET_TOKEN,
  SET_SPOTIFY,
  SET_PLAYLISTS,
  SET_SEARCH,
  SET_TRACKS,
  SET_ERROR,
  SET_SHOWERROR,
  SET_HOME,
  SET_PLAYLIST,
  SET_FETCHING,
  RESET
} from "./CONSTANTS";

const initialState = {
  user: null,
  token: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  playing: false,
  item: null,
  showSearch: false,
  showPlaylist: false,
  tracks: null,
  error: false,
  isFetching: false,
  showError: false,
  playlist: null,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'item']
}

const reducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case SET_PLAYING:
      return {
        ...state,
        playing: action.playing,
      };

    case SET_ITEM:
      return {
        ...state,
        item: action.item,
      };

    case SET_DISCOVER_WEEKLY:
      return {
        ...state,
        discover_weekly: action.discover_weekly,
        isFetching: false
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case SET_SPOTIFY:
      return {
        ...state,
        spotify: action.spotify,
      };

    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };

    case SET_SEARCH:
      return {
        ...state,
        isFetching: false,
        showSearch: action.search,
        error: false,
        playlist: false,
        showPlaylist: false,
      };

    case SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
      };

    case SET_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        showError: true,
      };

    case SET_SHOWERROR:
      return {
        ...state,
        showError: false,
      };

    case SET_HOME:
      return {
        ...state,
        showPlaylist: false,
        showSearch: false,
      };

    case SET_PLAYLIST:
      return {
        ...state,
        showPlaylist: true,
        showSearch: false,
        playlist: action.playlist
      };

    case SET_FETCHING:
      return {
        ...state,
        isFetching: true,
      };

    case RESET:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);