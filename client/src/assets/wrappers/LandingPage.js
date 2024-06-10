import styled from 'styled-components';

const Wrapper = styled.div`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    padding-top: 2rem;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-size: 3rem;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
    text-align: justify;
  }

  .btn__group {
    display: flex;
    gap: 1rem;
  }

  .btn {
    padding: 0.75rem 2rem;
  }

  .landing {
    display: none;
    width: 100%;
  }

  @media (min-width: 62rem) {
    .page {
      grid-template-columns: 1fr 500px;
      column-gap: 2.5rem;
    }

    .landing {
      display: block;
    }
  }
`;

export default Wrapper;
