import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <img src={img} alt="not found" />
        <p className="title">Ohh! page not found</p>
        <p className="content">
          The page you are looking for may have been removed or its name has
          been changed or is temporarily unavailable.
        </p>
        <Link to="/dashboard" className="btn">
          Back Home
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <p className="title">something went wrong</p>
      </div>
    </Wrapper>
  );
};

export default Error;
