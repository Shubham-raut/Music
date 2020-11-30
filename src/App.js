import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./context/StateProvider";
import Player from "./component/Player/Player";
import { getTokenFromResponse } from "./config/spotify";
import "./App.css";
import Login from "./component/Login/Login";
const s = new SpotifyWebApi();

function App() {
  const [{ token, user }, dispatch] = useStateValue();

  useEffect(() => {
    // Set token
    let _token;

    if (token) {
      _token = token;
    }
    else {
      const hash = getTokenFromResponse();
      window.location.hash = "";
      _token = hash.access_token;
    }

    if (_token) {
      s.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      localStorage.setItem('token', _token);

      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });

        s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response,
          })
        );

        s.getMyTopArtists().then((response) =>
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: response,
          })
        );

        dispatch({
          type: "SET_SPOTIFY",
          spotify: s,
        });

        s.getUserPlaylists().then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists,
          });
        });
      })
        .catch(err => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
          }
        });
    }
  }, []);

  // useEffect(() => {
  //   s.getCategoryPlaylists('toplists')
  //     .then((data) => {
  //       console.log(data);
  //     })
  // }, []);

  return (
    <div className="app">
      {(!token && !user) ?
        <Login /> :
        <Player spotify={s} />
      }
    </div>
  );
}

export default App;
