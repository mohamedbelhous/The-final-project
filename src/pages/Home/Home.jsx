import Hero from "../../components/Home/Hero";
import ExploreInterests from "../../components/common/ExploreInterests/ExploreInterests";
import Intro from "../../components/common/Intro/Intro";
import RecommendedDestinations from "../../components/common/RecommendedDestinations/RecommendedDestinations";
import SpecialDeals from "../../components/common/SpecialDeals/SpecialDeals";
import WhyRahla from "../../components/common/WhyRahla/WhyRahla";
import { useTranslation } from "react-i18next";

import ScrollReveal from "../../components/common/ScrollReveal/ScrollReveal";

import "./Home.css";

function Home() {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      {/* Hero */}
      <Hero />

      {/* Intro */}
      <ScrollReveal direction="up">
        <Intro />
      </ScrollReveal>

      {/* Explore Interests */}
      <ScrollReveal direction="up">
        <ExploreInterests />
      </ScrollReveal>

      {/* Recommended Destinations */}
      <ScrollReveal direction="up">
        <RecommendedDestinations />
      </ScrollReveal>

      {/* Special Deals */}
      <ScrollReveal direction="up">
        <SpecialDeals />
      </ScrollReveal>

      {/* Why Rahla */}
      <ScrollReveal direction="up">
        <WhyRahla />
      </ScrollReveal>
    </div>
  );
}

export default Home;
