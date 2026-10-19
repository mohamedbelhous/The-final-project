import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, ArrowLeft, Compass } from "lucide-react";
import API from "../../services/api";
import "./TravelGuideDetails.css";

function TravelGuideDetails() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await API.get(`/guides/${encodeURIComponent(id)}`);

        const result = response.data;

        if (!cancelled) {
          if (result.success && result.data) {
            setArticle(result.data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error("Failed to load travel guide:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="travel-guide-details">
        {" "}
        <div className="guide-details-container">
          {" "}
          <p>Loading article...</p>{" "}
        </div>{" "}
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="travel-guide-details">
        {" "}
        <div className="guide-details-container">
          {" "}
          <h2>Article not found</h2>{" "}
          <p>This article may not be published or is no longer available. </p>{" "}
          <Link to="/travel-guide" className="guide-back-link">
            {" "}
            <ArrowLeft size={18} /> <span>Back to Travel Guides</span>{" "}
          </Link>{" "}
        </div>{" "}
      </main>
    );
  }

  return (
    <main className="travel-guide-details">
      {" "}
      <div className="guide-details-container">
        {" "}
        <Link to="/travel-guide" className="guide-back-link">
          {" "}
          <ArrowLeft size={18} /> <span>Back to Travel Guides</span>{" "}
        </Link>
        <header className="guide-details-header">
          <span className="guide-details-category">
            <Compass size={15} />
            {article.category || "Travel Guide"}
          </span>

          <h1>{article.title}</h1>

          {article.excerpt && <p>{article.excerpt}</p>}

          <div className="guide-details-meta">
            {article.readTime && (
              <span>
                <Clock size={16} />
                {article.readTime}
              </span>
            )}

            {article.publishedAt && (
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </header>
        {article.image && (
          <div className="guide-details-cover">
            <img src={article.image} alt={article.title} />
          </div>
        )}
        <article className="guide-details-content">
          {Array.isArray(article.content) && article.content.length > 0 ? (
            <div className="guide-article-text">
              {article.content.map((section, index) => (
                <section key={index}>
                  {section.title && <h2>{section.title}</h2>}

                  {section.text && <p>{section.text}</p>}

                  {Array.isArray(section.items) && section.items.length > 0 && (
                    <ul>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          ) : typeof article.content === "string" && article.content.trim() ? (
            <div className="guide-article-text">
              {article.content
                .split("\n")
                .map((paragraph, index) =>
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
                )}
            </div>
          ) : (
            <p className="guide-content-placeholder">
              The full article content is not available yet.
            </p>
          )}
        </article>
        <div className="guide-details-footer">
          <Link to="/travel-guide" className="guide-back-button">
            <ArrowLeft size={17} />
            <span>Back to Travel Guides</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default TravelGuideDetails;
