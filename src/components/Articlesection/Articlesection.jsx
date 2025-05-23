import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Home/styles.module.css";
import { fetchArticlesByType } from "../../Store/actions/articles.action";
import Like from "../Like and Follow/Like";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { defaultAvatar } from "../../Store/actions/auth.action";
function Articlesection(props) {
  const profile = useSelector((state) => state.auth.profile);
  const user = profile.username;
  const articles = useSelector(
    (state) => state.articles.allArticlesData?.articles
  );
  const articlesCount = useSelector(
    (state) => state.articles.allArticlesData?.articlesCount
  );
  const tab = useSelector((state) => state.articles.tab);
  const tag = useSelector((state) => state.articles.currentTag);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(articlesCount / articlesPerPage);
  let offset = (currentPage - 1) * articlesPerPage;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      fetchArticlesByType({
        type: tab,
        offset,
        articlesPerPage,
        user,
        tag,
      })
    );
  }, [tab, currentPage, dispatch, articlesPerPage, user, tag]);

  const handleProfileClick = (author) => {
    navigate(`/profile/${author}`);
  };
  if (!articles) {
    return  <Skeleton count={50}/>;
  }

  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <>
      <Container className={styles.articleSectionContainer}>
        <Col md={12} as="article-list">
          {articles.map((article) => (
            <React.Fragment key={article.slug}>
              <Row className="article-preview border-bottom p-4" as="article-preview">
              <Row className={styles.authorInfo}>
                  <Row className="article-meta">
                    <Col sm={6} md={6}>
                      <Row className="d-flex">
                        <Col xs={1} className="my-auto">
                        <a href={`/profile/${article?.author?.username}`}>
                            <img
                              src={article?.author?.image || defaultAvatar}
                              className={styles.avatar}
                              alt="avatar"
                            />
                          </a>
                        </Col>
                        <Col className={styles.authorDateName}>
                          <div
                            className={`${styles.authorName} author`}
                            onClick={() => handleProfileClick(article.author?.username)}
                          >
                            {article?.author?.username}
                          </div>
                          <p className={`${styles.date} date`}>
                            {article?.createdAt
                              ? new Date(article?.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              : ""}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6} sm={4} className={styles.favorites}>
                      <Like article={article}></Like>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <div className={styles.contentArticle}>
                    <Link
                      to={`../articles/${article.slug}`}
                      className={`${styles.text} preview-link`}
                    >

                     { <h3 className={styles.articleTitle}
                      >{article?.title?.length > 70
                        ? article.title.slice(0, 70) + "..."
                        : article.title}
                      </h3>||<Skeleton count={10}/> }
                      {/* <h3 className={styles.articleTitle}>
                        {article.title}
                        </h3> */}

                      <p className={styles.articleDescription} ng-bind="description">
                        {article?.description?.length > 70
                          ? article.description.slice(0, 70) + "..."
                          : article.description}
                      </p>
                      <div className={styles.articleFooter}>
                        <span className={styles.readMore}>Read more...</span>
                        <div className={`${styles.tagList} tag-list`}>
                          {article?.tagList.map((tag, index) => (
                            <span key={index} className={`${styles.tags} tag-default`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                </Row>
              </Row>
            </React.Fragment>
          ))}
        </Col>
        {totalPages > 1 ? (
          <Col className="d-flex justify-content-center" md={9}>
            <ul className={`pagination ${styles.pagin}`}>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <button className="page-link">Previous</button>
              </li>
              {/* Render page numbers */}
              {Array.from({ length: Math.ceil(articlesCount / articlesPerPage) }, (_, index) => {
                const isLastPage = index + 1 === Math.ceil(totalPages / articlesPerPage) + 1;

                if (
                  index + 1 === 1 ||
                  index + 1 === currentPage ||
                  index + 1 === currentPage - 1 ||
                  index + 1 === currentPage + 1 ||
                  index + 1 === Math.ceil(totalPages / articlesPerPage)
                  
                ) {
                  // Render current, adjacent, first, and last page numbers
                  return (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                      onClick={() => {
                        if (!isLastPage) { // Только переключаем страницу, если это не последняя
                          setCurrentPage(index + 1);
                        }
                      }}
                    >
                      <button className="page-link">{index + 1}</button>
                    </li>
                  );
                } else if (
                  (index + 1 === currentPage - 2 && currentPage > 3) ||
                  (index + 1 === currentPage + 2 && currentPage < Math.ceil(totalPages / articlesPerPage))
                ) {
                  // Render ellipsis before and after the current page
                  return (
                    <li key={index + 1} className="page-item disabled">
                      <button className="page-link">...</button>
                    </li>
                  );
                } 
                return null;
              })}
              <li
                className={`page-item ${currentPage === Math.ceil(totalPages / articlesPerPage) ? "disabled" : ""}`}
                onClick={() => {
                  if (currentPage < Math.ceil(totalPages / articlesPerPage)) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                <button className="page-link">Next</button>
              </li>
            </ul>
          </Col>
        ) : null}
      </Container>
    </>
  );
}

export default Articlesection;
