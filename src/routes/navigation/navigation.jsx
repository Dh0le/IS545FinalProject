import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import "./navigation.styles.scss";
import { ReactComponent as UIUCLogo } from "../../asset/university-of-illinois-at-urbana-champaign-logo-vector.svg";
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/home">
          <UIUCLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/astats">
            Airport Stats
          </Link>
          <Link className="nav-link" to="/fstats">
            Flight Stats
          </Link>
          <Link className="nav-link" to="/glob">
            Dynamic Graph
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
