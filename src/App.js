import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/style.css";
import Player from "./component/Player/Player";
import Login from "./component/Login/Login";
import { initialFetch } from "./redux/actions";

function App() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialFetch());
  }, []);

  // useEffect(() => {
  //   s.getCategoryPlaylists('toplists')
  //     .then((data) => {
  //       console.log(data);
  //     })
  // }, []);

  return (
    <div className="app">
      {!token && !user ? <Login /> : <Player />}
    </div>
  );
}

export default App;
