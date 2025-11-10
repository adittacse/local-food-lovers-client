import HeroSlider from "./HeroSlider.jsx";
import TrendingEateries from "./TrendingEateries.jsx";
import JoinCommunityCTA from "./JoinCommunityCTA.jsx";
import FeaturedReviews from "./FeaturedReviews.jsx";

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <FeaturedReviews />
            <TrendingEateries />
            <JoinCommunityCTA />
        </div>
    );
};

export default Home;