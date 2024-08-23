import { Col, Container, Nav, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Home/styles.module.css";
import Tag from "../Tag/Tag";
import Articlesection from "../Articlesection/Articlesection";
import {
  setTabs,
  setArticlesData,
  setCurrentTag,
} from "../../Store/slices/articles.slice";
import { useEffect } from "react";
import { useRef } from "react";
const Home = () => {
  const myStyles = {
    banner: {
      background: '#5cb85c',
      color: '#fff',
      padding: '2rem',
      marginBottom: '2rem'
    },
    logoFont: {
      fontFamily: 'titillium web,sans-serif'
    },
    subText:{
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 300,
      marginBottom: 0
    }
  };
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.articles.tab);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentTag = useSelector((state) => state.articles.currentTag);
  const tagLinkRef = useRef(null);
  useEffect(() => {
    dispatch(setTabs("all"));
  }, []);
  useEffect(() => {
    if (currentTag && tagLinkRef.current) {
      tagLinkRef.current.click();
    } 
  }, [currentTag]);
  const handleTabChange = (tab) => {
    dispatch(setTabs(tab));
  };

  useEffect(() => {
    if (tab !== "tag") {
      dispatch(setCurrentTag(""));
    }
  }, [tab]);

  return (
    <Container>
      <div style={myStyles.banner}>
        <h1 style={myStyles.logoFont}>Website for Testing with Cypress</h1>
        <p style={myStyles.subText}>A place where you can enhance your knowledge.</p>
      </div>
      <Row>
        <Row className={styles.layout}>
          <Col md={9} className="mt-3">
            <Nav variant="tabs" defaultActiveKey="all">
              {isLoggedIn ? (
                <>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="follow"
                      onClick={() => handleTabChange("follow")}
                    >
                      Your Feed
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="all"
                      onClick={() => handleTabChange("all")}
                    >
                      Global Feed
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="tag"
                      onClick={() => handleTabChange("tag")}
                      ref={tagLinkRef}
                    >
                      {currentTag ? `#${currentTag}` : null}
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="all"
                      onClick={() => handleTabChange("all")}
                    >
                      Global Feed
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="tag"
                      onClick={() => handleTabChange("tag")}
                      ref={tagLinkRef}
                      
                    >
                      {currentTag ? `#${currentTag}` : null}
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
            <Articlesection />
          </Col>
          <Tag />
        </Row>
      </Row>
    </Container>
  );
};

export default Home;
