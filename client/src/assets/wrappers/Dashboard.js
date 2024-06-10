import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard__pages {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media (min-width: 62rem) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard__pages {
      width: 90%;
    }
  }
`;

export default Wrapper;
