import Search from "../components/Search";
import "./styles/Home.scss";
import icon from "../assets/icon.png";


const Home = () => {

  return (
    <div className="home">
       <img src={icon} alt="icon" className="home__icon"/>
       <h1 className="home__header">Find the best agent for you!</h1>
       <p className="home__text">Fill the information below to get your matches.</p>
      <Search/>
    </div>
  );
};

export default Home;
