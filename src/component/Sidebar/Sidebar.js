import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarOption from "../SidebarOption/SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { gotoHome, showPlayList } from "../../redux/actions";
import { useClickOutsideInside } from "../../utils/func";

function Sidebar() {
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const sidebarRef = useClickOutsideInside(() => {
    setShowMenu(false);
  });

  return (
    <>
      <div ref={sidebarRef} className={"sidebar" + (showMenu ? " show" : "")}>
        <div className="sidebar__close">
          <i className='bx bxs-chevron-left-circle'></i>
        </div>

        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        <SidebarOption Icon={HomeIcon} option="Home" handlor={() => dispatch(gotoHome())} />
        <SidebarOption Icon={SearchIcon} option="Search" />
        <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
        <br />
        <strong className="sidebar__title">PLAYLISTS</strong>
        <hr />
        {playlists?.items?.map((playlist) => (
          <SidebarOption option={playlist.name} key={playlist.id} handlor={() => dispatch(showPlayList(playlist.id))} />
        ))}
      </div>
      <div className={"sidebar__open" + (showMenu ? " hide" : "")} onClick={() => setShowMenu(true)}>
        <i className="bx bx-menu"></i>
      </div>
    </>
  );
}

export default Sidebar;
