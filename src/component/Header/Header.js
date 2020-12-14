import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchHandlor } from "../../redux/actions";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { reset } from "../../redux/actions";
import { useClickOutside } from "../../utils/func";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTxt, setSearchTxt] = useState("");
  const [logOut, setLogOut] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    dispatch(searchHandlor(searchTxt));
  };

  const logOutRef = useClickOutside(() => {
    setLogOut(false);
  });


  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <form onSubmit={submit}>
          <input
            className="header__search"
            placeholder="Search for Artists, Songs, or Podcasts"
            type="text"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </form>
      </div>
      <div ref={logOutRef} className="header__right" onClick={() => setLogOut(!logOut)}>
        <Avatar alt={user?.display_name} />
        <h4 className="displayName">{user?.display_name}</h4>
        {logOut ? (
          <div className="logOut" onClick={() => dispatch(reset())}>
            Log Out
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
