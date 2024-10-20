import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { fetchAllTag } from "../../Store/actions/tag.actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setCurrentTag } from "../../Store/slices/articles.slice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Tag(props) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.allTagData);
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 100; // Количество тегов на странице

  useEffect(() => {
    dispatch(fetchAllTag());
  }, [dispatch]);

  const handleTagChange = (tag) => {
    dispatch(setCurrentTag(tag));
  };

  if (!tags) {
    return <Skeleton count={5} />;
  }

  // Вычисление индексов тегов для текущей страницы
  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  // Общее количество страниц
  const totalPages = Math.ceil(tags.length / tagsPerPage);

  return (
    <Col md={3} sm={12} className={`${styles.tagsComponent} tagsComponent`}>
      <h5 className={styles.popularTags}>Tags</h5>
      <div className={styles.tagWrapper}>
        {currentTags.length > 0 ? (
          currentTags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={styles.tag}
            >
              {tag}
            </div>
          ))
        ) : (
          <Skeleton count={5} />
        )}
      </div>

      {/* Кнопки пагинации */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="tagButton"
        >
          Previous
        </button>
        <span className={styles.pageInfo}>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="tagButton"
        >
          Next
        </button>
        <br/>
        
      </div>
    </Col>
  );
}

export default Tag;
