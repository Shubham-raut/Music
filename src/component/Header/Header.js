import React, { useState } from "react";
import "./Header.css";
import { useStateValue } from "../../context/StateProvider";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function Header({ spotify }) {
  const [{ user, search }, dispatch] = useStateValue();
  const [searchTxt, setSearchTxt] = useState('');
  const [logOut, setLogOut] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    console.log(searchTxt);

    if (searchTxt) {
      spotify.searchTracks(searchTxt)
        .then((data) => {
          console.log(data.tracks);

          dispatch({
            type: "SET_SEARCH",
            search: searchTxt,
          })

          dispatch({
            type: "SET_TRACKS",
            tracks: data.tracks,
          })
        })
    }
    else if (search) {
      dispatch({
        type: "SET_SEARCH",
        search: false,
      })
    }
  }

  const logOutHandlor = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <form style={{ width: '100%' }} onSubmit={submit}>
          <input
            className='header__search'
            placeholder="Search for Artists, Songs, or Podcasts "
            type="text"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </form>
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} />
        <h4 className='displayName' onClick={() => setLogOut(!logOut)}>{user?.display_name}</h4>
        {logOut ?
          <div className='logOut' onClick={logOutHandlor}>Log Out</div> : null
        }
      </div>
    </div>
  );
}

export default Header;
