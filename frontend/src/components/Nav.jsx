import PropTypes from "prop-types";
import { useEffect } from "react";
import whiteLogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  // Dynamically update the page title
  useEffect(() => {
    document.title = authToken ? "Welcome Back | Dating Site" : "Dating Site";
  }, [authToken]);

  return (
    <nav>
      <div className="logo-container">
        <a href="/">
          <img
            className="logo"
            src={minimal ? colorLogo : whiteLogo}
            alt="Tinder Logo"
          />
        </a>
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={() => {
            setShowModal?.(true);
            setIsSignUp?.(false);
          }}
          disabled={showModal}
          aria-label="Open login modal"
        >
          Log in
        </button>
      )}
    </nav>
  );
};

// Define prop types for validation
Nav.propTypes = {
  authToken: PropTypes.string,
  minimal: PropTypes.bool,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  setIsSignUp: PropTypes.func,
};

export default Nav;
