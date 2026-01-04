import HeroSlider from "./HeroSlider.jsx";
import TrendingEateries from "./TrendingEateries.jsx";
import JoinCommunityCTA from "./JoinCommunityCTA.jsx";
import FeaturedReviews from "./FeaturedReviews.jsx";
import HowItWorks from "./HowItWorks.jsx";
import TopRatedFoods from "./TopRatedFoods.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import CommunityStats from "./CommunityStats.jsx";
import LatestReviews from "./LatestReviews.jsx";
import NewsletterCTA from "./NewsletterCTA.jsx";

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <FeaturedReviews />
            <TrendingEateries />
            <JoinCommunityCTA />
            <HowItWorks />
            <TopRatedFoods />
            <WhyChooseUs />
            <CommunityStats />
            <LatestReviews />
            <NewsletterCTA />
        </div>
    );
};

export default Home;