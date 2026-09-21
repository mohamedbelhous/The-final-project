import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { benefits } from "../../../data/benefits";
import "./WhyRahla.css";

function WhyRahla() {
  const { t } = useTranslation();

  return (
    <section className="why-rahla">
      <div className="why-rahla-container">
        <div className="why-rahla-intro">
          <div className="why-rahla-label">
            <span className="why-rahla-label-line" />
            <span>{t("whyRahla.badge")}</span>
          </div>

          <h2>
            {t("whyRahla.titlePart1")}
            <br />
            <span>{t("whyRahla.titlePart2")}</span>
          </h2>

          <p>{t("whyRahla.description")}</p>

          <button className="why-rahla-button">
            <span>{t("whyRahla.button")}</span>
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="why-rahla-benefits">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article className="why-benefit" key={benefit.number}>
                <div className="why-benefit-top">
                  <span className="why-benefit-number">{benefit.number}</span>
                  <div className="why-benefit-icon">
                    <Icon size={21} strokeWidth={1.7} />
                  </div>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyRahla;
