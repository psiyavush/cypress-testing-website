import React from "react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import { defaultAvatar } from "../../Store/actions/auth.action";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  const handleNavLinkClick = () => {
    handleOffcanvasClose();
  };

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className={styles.logoBar}>QA COMPASS · Cypress Lab</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            onClick={() => setShowOffcanvas(!showOffcanvas)}
          />
          <Navbar.Offcanvas
            className={styles.navItemRight}
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            show={showOffcanvas}
            onHide={handleOffcanvasClose}
            placement="end"
          >
            <Offcanvas.Header
              className={styles.btnCloseMenu}
              closeButton
            ></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ml-auto">
                <NavLink
                  to="/"
                  className={`${styles.linkItem} my-auto`}
                  onClick={handleNavLinkClick}
                >
                  {/* <span>
                    <HomeIcon className={styles.icon} fontSize="small" />
                  </span> */}
                  Home
                </NavLink>
                {isLoggedIn ? (
                  <>
                    <NavLink
                      to="/editor"
                      className={`${styles.linkItem} my-auto`}
                      onClick={handleNavLinkClick}
                    >
                      <span>
                        <ArticleIcon className={styles.icon} fontSize="small" />
                      </span>
                      New Article
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className={`${styles.linkItem} my-auto`}
                      onClick={handleNavLinkClick}
                    >
                      <span>
                        <SettingsIcon
                          fontSize="small"
                          className={styles.icon}
                        />
                      </span>
                      Settings
                    </NavLink>
                    <NavLink
                      to={`/profile/${user.username}`}
                      className={`${styles.linkItem} my-auto`}
                      onClick={handleNavLinkClick}
                    >
                      <img
                        src={user.avatar || defaultAvatar}
                        alt="avatar"
                        className={styles.avatar}
                      />
                      {user.username}
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className={`${styles.linkItem} my-auto`}
                      onClick={handleNavLinkClick}
                    >
                      Sign in
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={`${styles.linkItem} my-auto`}
                      onClick={handleNavLinkClick}
                    >
                      Sign up
                    </NavLink>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
      <footer className={`fixed-bottom ${styles.footer}`}>
        <div className={styles.footerLinks}>
          <a className={styles.footerLink} href="https://github.com/psiyavush/cypress-testing-website" target="_blank" rel="noreferrer">⭐ Fork</a>
          <a className={styles.footerLink} href="https://www.youtube.com/@QA-COMPASS" target="_blank" rel="noreferrer">▶ YouTube</a>
          <a className={styles.footerLink} href="https://rutube.ru/u/qa/" target="_blank" rel="noreferrer">📺 RuTube</a>
          <a className={styles.footerLink} href="https://vk.com/qa_compass" target="_blank" rel="noreferrer">💬 VK</a>
          <a className={styles.footerLink} href="https://stepik.org/users/638160669/" target="_blank" rel="noreferrer">🎓 Stepik Courses</a>
        </div>
      </footer>


    </>
  );
};

export default Header;
