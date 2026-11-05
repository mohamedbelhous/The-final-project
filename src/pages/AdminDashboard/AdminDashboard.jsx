import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  Search,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import { categories } from "../../data/destinations";
import { useContent } from "../../context/ContentContext";
import { useBooking } from "../../context/BookingContext";
import "./AdminDashboard.css";

const emptyGuideForm = {
  title: "",
  excerpt: "",
  image: "",
  category: "Destinations",
  readTime: "5 min read",
  content: "",
  status: "published",
};

const emptyDestinationForm = {
  name: "",
  slug: "",
  region: "",
  category: "Beaches",
  description: "",
  image: "",
  pricePerDay: "40",
  rating: "4.5",
  tags: "",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const {
    destinations,
    guides,
    addDestination,
    updateDestination,
    deleteDestination,
    addGuide,
    updateGuide,
    deleteGuide,
  } = useContent();
  const { allBookings } = useBooking();

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const [showGuideForm, setShowGuideForm] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [guideForm, setGuideForm] = useState(emptyGuideForm);

  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [destinationForm, setDestinationForm] = useState(emptyDestinationForm);

  const query = searchTerm.trim().toLowerCase();

  const filteredDestinations = useMemo(
    () =>
      destinations.filter((destination) =>
        [destination.name, destination.region, destination.category]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      ),
    [destinations, query],
  );

  const filteredGuides = useMemo(
    () =>
      guides.filter((guide) =>
        [guide.title, guide.category, guide.status]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      ),
    [guides, query],
  );

  const filteredBookings = useMemo(
    () =>
      allBookings.filter((booking) =>
        [
          booking.fullName,
          booking.email,
          booking.title,
          booking.destinationName,
          booking.bookingId,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      ),
    [allBookings, query],
  );

  const totalRevenue = allBookings.reduce(
    (total, booking) => total + (Number(booking.totalPrice) || 0),
    0,
  );

  const openNewGuideForm = () => {
    setEditingGuide(null);
    setGuideForm(emptyGuideForm);
    setShowGuideForm(true);
  };

  const openEditGuideForm = (guide) => {
    setEditingGuide(guide);
    setGuideForm({
      title: guide.title || "",
      excerpt: guide.excerpt || "",
      image: guide.image || "",
      category: guide.category || "Destinations",
      readTime: guide.readTime || "5 min read",
      content: Array.isArray(guide.content)
        ? guide.content
            .map((section) =>
              [section.title, section.text, ...(section.items || [])]
                .filter(Boolean)
                .join("\n"),
            )
            .join("\n\n")
        : String(guide.content || ""),
      status: guide.status || "published",
    });
    setShowGuideForm(true);
  };

  const handleGuideSubmit = (event) => {
    event.preventDefault();

    if (!guideForm.title.trim() || !guideForm.excerpt.trim()) {
      alert("Please enter the article title and excerpt.");
      return;
    }

    const articleData = {
      title: guideForm.title.trim(),
      excerpt: guideForm.excerpt.trim(),
      image: guideForm.image.trim(),
      category: guideForm.category,
      readTime: guideForm.readTime.trim() || "5 min read",
      status: guideForm.status,
      content: guideForm.content.trim()
        ? [{ title: "", text: guideForm.content.trim(), items: [] }]
        : [],
    };

    if (editingGuide) {
      updateGuide(editingGuide.id ?? editingGuide._id, articleData);
    } else {
      addGuide(articleData);
    }

    setShowGuideForm(false);
    setEditingGuide(null);
    setGuideForm(emptyGuideForm);
  };

  const handleDeleteGuide = (guide) => {
    if (!window.confirm(`Delete "${guide.title}"?`)) return;
    deleteGuide(guide.id ?? guide._id);
  };

  const openNewDestinationForm = () => {
    setEditingDestination(null);
    setDestinationForm(emptyDestinationForm);
    setShowDestinationForm(true);
  };

  const openEditDestinationForm = (destination) => {
    setEditingDestination(destination);
    setDestinationForm({
      name: destination.name || destination.title || "",
      slug: destination.slug || "",
      region: destination.region || destination.location || "",
      category: destination.category || "Beaches",
      description: destination.description || "",
      image: destination.image || destination.heroImage || "",
      pricePerDay: String(
        destination.pricePerDay || destination.price || "",
      ),
      rating: String(destination.rating || ""),
      tags: Array.isArray(destination.tags)
        ? destination.tags.join(", ")
        : "",
    });
    setShowDestinationForm(true);
  };

  const handleDestinationSubmit = (event) => {
    event.preventDefault();

    if (!destinationForm.name.trim() || !destinationForm.description.trim()) {
      alert("Please enter the destination name and description.");
      return;
    }

    const destinationData = {
      name: destinationForm.name.trim(),
      slug: destinationForm.slug.trim() || destinationForm.name.trim(),
      region: destinationForm.region.trim(),
      category: destinationForm.category,
      description: destinationForm.description.trim(),
      image: destinationForm.image.trim(),
      pricePerDay: Number(destinationForm.pricePerDay) || 0,
      rating: Number(destinationForm.rating) || 4.5,
      tags: destinationForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (editingDestination) {
      updateDestination(editingDestination.id, destinationData);
    } else {
      addDestination(destinationData);
    }

    setShowDestinationForm(false);
    setEditingDestination(null);
    setDestinationForm(emptyDestinationForm);
  };

  const handleDeleteDestination = (destination) => {
    if (!window.confirm(`Delete "${destination.name}"?`)) return;
    deleteDestination(destination.id);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setShowGuideForm(false);
    setEditingGuide(null);
    setShowDestinationForm(false);
    setEditingDestination(null);
  };

  const renderHeaderActions = () => {
    if (activeTab === "guides" && !showGuideForm) {
      return (
        <button className="btn-add-new" onClick={openNewGuideForm}>
          <Plus size={16} /> Add Article
        </button>
      );
    }

    if (activeTab === "destinations" && !showDestinationForm) {
      return (
        <button className="btn-add-new" onClick={openNewDestinationForm}>
          <Plus size={16} /> Add Destination
        </button>
      );
    }

    return null;
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Rahla Admin</h2>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => switchTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className={`admin-nav-item ${
              activeTab === "destinations" ? "active" : ""
            }`}
            onClick={() => switchTab("destinations")}
          >
            <MapPin size={18} />
            <span>Destinations</span>
          </button>

          <button
            className={`admin-nav-item ${
              activeTab === "guides" ? "active" : ""
            }`}
            onClick={() => switchTab("guides")}
          >
            <BookOpen size={18} />
            <span>Travel Guides</span>
          </button>

          <button
            className={`admin-nav-item ${
              activeTab === "bookings" ? "active" : ""
            }`}
            onClick={() => switchTab("bookings")}
          >
            <Calendar size={18} />
            <span>Bookings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="back-to-site-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={16} />
            <span>Back to Main Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">
            <h1>
              {activeTab === "guides" && "Manage Travel Guides"}
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "destinations" && "Manage Destinations"}
              {activeTab === "bookings" && "Manage Bookings"}
            </h1>
          </div>

          <div className="admin-header-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            {renderHeaderActions()}
          </div>
        </header>

        <div className="admin-content">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon bg-green">
                    <DollarSign size={22} />
                  </div>
                  <div className="stat-info">
                    <small>Total Revenue</small>
                    <h3>${totalRevenue.toLocaleString()}</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon bg-blue">
                    <Calendar size={22} />
                  </div>
                  <div className="stat-info">
                    <small>Total Bookings</small>
                    <h3>{allBookings.length}</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon bg-orange">
                    <MapPin size={22} />
                  </div>
                  <div className="stat-info">
                    <small>Active Destinations</small>
                    <h3>{destinations.length}</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon bg-purple">
                    <BookOpen size={22} />
                  </div>
                  <div className="stat-info">
                    <small>Travel Guides</small>
                    <h3>{guides.length}</h3>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Recent Bookings</h3>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Guests</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBookings.slice(0, 5).map((booking) => (
                        <tr key={booking.bookingId}>
                          <td>
                            {booking.fullName || booking.userName || "N/A"}
                          </td>
                          <td>
                            {booking.title ||
                              booking.destinationName ||
                              "N/A"}
                          </td>
                          <td>{booking.date || "N/A"}</td>
                          <td>{booking.guests || 1}</td>
                          <td>${Number(booking.totalPrice) || 0}</td>
                          <td>
                            <span className="badge badge-success">
                              {booking.status || "Confirmed"}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {allBookings.length === 0 && (
                        <tr>
                          <td colSpan={6} className="admin-empty-cell">
                            No bookings yet. New bookings will appear here.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "guides" && (
            <div className="admin-card guides-admin-card">
              {showGuideForm ? (
                <form className="guide-admin-form" onSubmit={handleGuideSubmit}>
                  <h2>{editingGuide ? "Edit Article" : "Create Article"}</h2>

                  <label>
                    Article Title *
                    <input
                      required
                      value={guideForm.title}
                      onChange={(e) =>
                        setGuideForm({ ...guideForm, title: e.target.value })
                      }
                      placeholder="Discover the beauty of Algeria"
                    />
                  </label>

                  <label>
                    Short Introduction *
                    <textarea
                      required
                      rows={3}
                      value={guideForm.excerpt}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          excerpt: e.target.value,
                        })
                      }
                      placeholder="Write a short introduction..."
                    />
                  </label>

                  <label>
                    Image URL
                    <input
                      type="url"
                      value={guideForm.image}
                      onChange={(e) =>
                        setGuideForm({ ...guideForm, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </label>

                  {guideForm.image && (
                    <img
                      src={guideForm.image}
                      alt="Article preview"
                      className="guide-image-preview"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                  )}

                  <label>
                    Category
                    <select
                      value={guideForm.category}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Itineraries">Itineraries</option>
                      <option value="Culture & Tips">Culture & Tips</option>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Transportation">Transportation</option>
                    </select>
                  </label>

                  <label>
                    Reading Time
                    <input
                      value={guideForm.readTime}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          readTime: e.target.value,
                        })
                      }
                      placeholder="5 min read"
                    />
                  </label>

                  <label>
                    Article Content
                    <textarea
                      rows={10}
                      value={guideForm.content}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          content: e.target.value,
                        })
                      }
                      placeholder="Write the full article here..."
                    />
                  </label>

                  <label>
                    Publication Status
                    <select
                      value={guideForm.status}
                      onChange={(e) =>
                        setGuideForm({ ...guideForm, status: e.target.value })
                      }
                    >
                      <option value="draft">Save as Draft</option>
                      <option value="published">Publish Article</option>
                    </select>
                  </label>

                  <div className="guide-form-actions">
                    <button type="submit" className="btn-add-new">
                      {editingGuide ? "Save Changes" : "Create Article"}
                    </button>

                    <button
                      type="button"
                      className="guide-cancel-btn"
                      onClick={() => {
                        setShowGuideForm(false);
                        setEditingGuide(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredGuides.map((guide) => {
                        const status = guide.status || "published";

                        return (
                          <tr key={guide.id ?? guide._id}>
                            <td>
                              {guide.image ? (
                                <img
                                  src={guide.image}
                                  alt=""
                                  className="table-thumb"
                                />
                              ) : (
                                "—"
                              )}
                            </td>

                            <td>
                              <strong>{guide.title}</strong>
                            </td>

                            <td>{guide.category}</td>

                            <td>
                              <span
                                className={`badge ${
                                  status === "published"
                                    ? "badge-success"
                                    : "badge-draft"
                                }`}
                              >
                                {status}
                              </span>
                            </td>

                            <td>
                              <div className="action-buttons">
                                <button
                                  type="button"
                                  className="btn-icon btn-edit"
                                  title="Edit article"
                                  onClick={() => openEditGuideForm(guide)}
                                >
                                  <Edit size={16} />
                                </button>

                                <button
                                  type="button"
                                  className="btn-icon btn-delete"
                                  title="Delete article"
                                  onClick={() => handleDeleteGuide(guide)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredGuides.length === 0 && (
                        <tr>
                          <td colSpan={5} className="admin-empty-cell">
                            {guides.length === 0
                              ? 'No articles yet. Click "Add Article" to create your first one.'
                              : "No articles match your search."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* DESTINATIONS TAB */}
          {activeTab === "destinations" && (
            <div className="admin-card">
              {showDestinationForm ? (
                <form
                  className="guide-admin-form"
                  onSubmit={handleDestinationSubmit}
                >
                  <h2>
                    {editingDestination
                      ? "Edit Destination"
                      : "Add Destination"}
                  </h2>

                  <div className="admin-form-row">
                    <label>
                      Name *
                      <input
                        required
                        value={destinationForm.name}
                        onChange={(e) =>
                          setDestinationForm({
                            ...destinationForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Jijel"
                      />
                    </label>

                    <label>
                      Slug (optional)
                      <input
                        value={destinationForm.slug}
                        onChange={(e) =>
                          setDestinationForm({
                            ...destinationForm,
                            slug: e.target.value,
                          })
                        }
                        placeholder="jijel"
                      />
                    </label>
                  </div>

                  <div className="admin-form-row">
                    <label>
                      Region
                      <input
                        value={destinationForm.region}
                        onChange={(e) =>
                          setDestinationForm({
                            ...destinationForm,
                            region: e.target.value,
                          })
                        }
                        placeholder="East Algeria"
                      />
                    </label>

                    <label>
                      Category
                      <select
                        value={destinationForm.category}
                        onChange={(e) =>
                          setDestinationForm({
                            ...destinationForm,
                            category: e.target.value,
                          })
                        }
                      >
                        {categories
                          .filter((category) => category !== "All")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </label>
                  </div>

                  <label>
                    Description *
                    <textarea
                      required
                      rows={3}
                      value={destinationForm.description}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="What makes this place worth visiting?"
                    />
                  </label>

                  <label>
                    Image URL
                    <input
                      type="url"
                      value={destinationForm.image}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          image: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </label>

                  <div className="admin-form-row">
                    <label>
                      Price per day ($)
                      <input
                        type="number"
                        min="0"
                        value={destinationForm.pricePerDay}
                        onChange={(e) =>
                          setDestinationForm({
                            ...destinationForm,
                            pricePerDay: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label>
                      Rating
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={destinationForm.rating}
                        onChange={(e) =>
                          setDestinationForm({
                            ...destinationForm,
                            rating: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <label>
                    Tags (comma separated)
                    <input
                      value={destinationForm.tags}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          tags: e.target.value,
                        })
                      }
                      placeholder="Beach, Nature"
                    />
                  </label>

                  <div className="guide-form-actions">
                    <button type="submit" className="btn-add-new">
                      {editingDestination ? "Save Changes" : "Add Destination"}
                    </button>

                    <button
                      type="button"
                      className="guide-cancel-btn"
                      onClick={() => {
                        setShowDestinationForm(false);
                        setEditingDestination(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Price/Day</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDestinations.map((destination) => (
                        <tr key={destination.id}>
                          <td>
                            {destination.image || destination.heroImage ? (
                              <img
                                src={destination.image || destination.heroImage}
                                alt=""
                                className="table-thumb"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              "—"
                            )}
                          </td>
                          <td>
                            <strong>{destination.name}</strong>
                          </td>
                          <td>{destination.region || destination.location}</td>
                          <td>
                            $
                            {destination.pricePerDay ||
                              destination.price ||
                              0}
                          </td>
                          <td>⭐ {destination.rating || "N/A"}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-icon btn-edit"
                                title="Edit destination"
                                onClick={() =>
                                  openEditDestinationForm(destination)
                                }
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="btn-icon btn-delete"
                                title="Delete destination"
                                onClick={() =>
                                  handleDeleteDestination(destination)
                                }
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredDestinations.length === 0 && (
                        <tr>
                          <td colSpan={6} className="admin-empty-cell">
                            {destinations.length === 0
                              ? 'No destinations yet. Click "Add Destination" to create one.'
                              : "No destinations match your search."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === "bookings" && (
            <div className="admin-card">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Guests</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.bookingId}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.fullName || "N/A"}</td>
                        <td>{booking.email || "N/A"}</td>
                        <td>
                          {booking.title ||
                            booking.destinationName ||
                            "N/A"}
                        </td>
                        <td>{booking.date || "N/A"}</td>
                        <td>{booking.guests || 1}</td>
                        <td>${Number(booking.totalPrice) || 0}</td>
                      </tr>
                    ))}

                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="admin-empty-cell">
                          {allBookings.length === 0
                            ? "No bookings yet."
                            : "No bookings match your search."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
