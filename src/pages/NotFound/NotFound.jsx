import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-icon">
          <Compass size={42} />
        </span>
        <span className="not-found-code">404</span>
        <h1>This path leads nowhere</h1>
        <p>
          The page you're looking for doesn't exist, or it may have moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link to="/destinations" className="not-found-btn secondary">
            Explore Destinations
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
