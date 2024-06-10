import { Logo } from '../components';
import { Link } from 'react-router-dom';
import landing from '../assets/images/landing.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="content">
          <h1>
            Finance <span>Tracking</span> App
          </h1>
          <p>
            The ultimate solution for effortless money management. Our intuitive
            app empowers you to track your income, expenses, and budgets with
            ease, providing insightful visualizations to help you make informed
            financial decisions. Take control of your finances today and pave
            the way towards a secure financial future.
          </p>
          <div className="btn__group">
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
        <img src={landing} alt="landing" className="landing" />
      </div>
    </Wrapper>
  );
};

export default Landing;
