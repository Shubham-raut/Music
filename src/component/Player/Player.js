import React from "react";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import { useSelector, useDispatch } from "react-redux";
import { setShowError } from "../../redux/actions";
import { Alert, AlertTitle } from '@material-ui/lab';

function Player() {
  const showError = useSelector((state) => state.showError);
  const isFetching = useSelector((state) => state.isFetching);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  return (
    <>
      <div className="player">
        <div className="player__body">
          <Sidebar />
          <Body />
        </div>
        <Footer />
      </div>

      {showError && error ?
        <Alert className="error_msg" severity="error" onClose={() => { dispatch(setShowError()) }}>
          <AlertTitle>Opps!</AlertTitle>
          {error.message || 'Something went wrong'}
        </Alert>
        : null}

      {isFetching ?
        <div className="spinner-grow"></div>
        : null}
    </>
  );
}

export default Player;
