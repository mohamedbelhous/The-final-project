import { useEffect, useState } from "react";
import { fetchDestinations } from "../../services/api"; // Adjust relative path as needed

const Recommendations = () => {
  // Page-level state management
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Fetch all recommended destinations
    fetchDestinations()
      .then((data) => {
        if (!isMounted) return;

        // Extract payload array safely
        let dataArray = [];
        if (Array.isArray(data)) {
          dataArray = data;
        } else if (data && Array.isArray(data.data)) {
          dataArray = data.data;
        }

        setDestinations(dataArray);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error loading recommendations page:", err);
        setError("Failed to load recommended destinations.");
        setDestinations([]); // Defensive fallback
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="recommendations-page loading-state">
        <p>Loading all recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-page error-state">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // Defensive array check to protect rendering
  const safeList = Array.isArray(destinations) ? destinations : [];

  return (
    <main className="recommendations-page-container">
      <header className="page-banner">
        <h1>All Recommended Destinations</h1>
        <p>Explore all hand-picked travel spots for your next trip</p>
      </header>

      {safeList.length > 0 ? (
        <div className="destinations-grid">
          {safeList.map((item) => (
            <div key={item._id || item.id} className="destination-card">
              <img
                src={item.image || item.heroImage}
                alt={item.name || item.title}
              />
              <div className="card-body">
                <h3>{item.name || item.title}</h3>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations available right now.</p>
      )}
    </main>
  );
};

export default Recommendations;
