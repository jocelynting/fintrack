import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageIndex';

const PageIndex = ({ page, totalPages, pageChange }) => {
  const addPageButton = ({ pageNumber, activeClass }) => (
    <button
      className={`btn page__button ${activeClass ? 'active' : ''}`}
      key={pageNumber}
      onClick={() => pageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    if (page > 3) {
      pageButtons.push(
        <span className="page__button dots" key="dots-1">
          ....
        </span>
      );
    }

    if (page > 2) {
      pageButtons.push(
        addPageButton({ pageNumber: page - 1, activeClass: false })
      );
    }

    if (page !== 1 && page !== totalPages) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    if (page < totalPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: page + 1, activeClass: false })
      );
    }

    if (page < totalPages - 2) {
      pageButtons.push(
        <span className="page__button dots" key="dots+1">
          ....
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: totalPages,
        activeClass: page === totalPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev__button"
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = totalPages;
          pageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="button__container">{renderPageButtons()}</div>
      <button
        className="btn next__button"
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage > totalPages) nextPage = 1;
          pageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageIndex;
