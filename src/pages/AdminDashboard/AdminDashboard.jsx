import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Search,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import API from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [guides, setGuides] = useState([]);
  const [showGuideForm, setShowGuideForm] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [guideSaving, setGuideSaving] = useState(false);

  const emptyGuideForm = {
    title: "",
    excerpt: "",
    image: "",
    category: "Destinations",
    readTime: "5 min read",
    content: "",
    status: "draft",
  };

  const [guideForm, setGuideForm] = useState(emptyGuideForm);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [destRes, bookRes, guideRes] = await Promise.all([
        API.get("/destinations").catch(() => ({ data: { data: [] } })),
        API.get("/bookings").catch(() => ({ data: { data: [] } })),
        API.get("/guides/admin/all").catch((err) => {
          console.error("Error loading admin guides:", err);
          return { data: { data: [] } };
        }),
      ]);

      setDestinations(destRes.data.data || destRes.data || []);
      setBookings(bookRes.data.data || bookRes.data || []);
      setGuides(guideRes.data.data || []);

      setDestinations(destRes.data.data || destRes.data || []);
      setBookings(bookRes.data.data || bookRes.data || []);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDestination = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await API.delete(`/destinations/${id}`);
        setDestinations((prev) =>
          prev.filter((item) => item._id !== id && item.id !== id),
        );
      } catch (err) {
        alert("Failed to delete destination");
      }
    }
  };

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
            .map((section) => {
              return [section.title, section.text, ...(section.items || [])]
                .filter(Boolean)
                .join("\n");
            })
            .join("\n\n")
        : "",
      status: guide.status || "draft",
    });

    setShowGuideForm(true);
  };

  const handleGuideSubmit = async (e) => {
    e.preventDefault();

    if (!guideForm.title.trim() || !guideForm.excerpt.trim()) {
      alert("Please enter the article title and excerpt.");
      return;
    }

    setGuideSaving(true);

    try {
      const articleData = {
        title: guideForm.title.trim(),
        excerpt: guideForm.excerpt.trim(),
        image: guideForm.image.trim(),
        category: guideForm.category,
        readTime: guideForm.readTime.trim() || "5 min read",
        status: guideForm.status,
        content: guideForm.content.trim()
          ? [
              {
                title: guideForm.title.trim(),
                text: guideForm.content.trim(),
                items: [],
              },
            ]
          : [],
      };

      if (editingGuide) {
        await API.put(`/guides/${editingGuide._id}`, articleData);
        alert("Article updated successfully.");
      } else {
        await API.post("/guides", articleData);
        alert("Article created successfully.");
      }

      setShowGuideForm(false);
      setEditingGuide(null);
      setGuideForm(emptyGuideForm);

      await fetchAdminData();
    } catch (err) {
      console.error("Guide save error:", err);
      alert(
        err.response?.data?.message ||
          "Could not save the article. Please check your admin login.",
      );
    } finally {
      setGuideSaving(false);
    }
  };

  const handleDeleteGuide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      await API.delete(`/guides/${id}`);
      setGuides((prev) => prev.filter((guide) => guide._id !== id));
      alert("Article deleted successfully.");
    } catch (err) {
      console.error("Guide delete error:", err);
      alert(err.response?.data?.message || "Failed to delete article.");
    }
  };

  const totalRevenue = bookings.reduce(
    (acc, b) => acc + (Number(b.totalPrice) || 0),
    0,
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Rahla Admin</h2>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === "destinations" ? "active" : ""}`}
            onClick={() => setActiveTab("destinations")}
          >
            <MapPin size={18} />
            <span>Destinations</span>
          </button>

          <button
            className={`admin-nav-item ${
              activeTab === "guides" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("guides");
              setSearchTerm("");
              setShowGuideForm(false);
            }}
          >
            <BookOpen size={18} />
            <span>Travel Guides</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
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
        {/* Header Bar */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === "guides" && !showGuideForm && (
              <button className="btn-add-new" onClick={openNewGuideForm}>
                <Plus size={16} /> Add Article
              </button>
            )}
            {activeTab === "destinations" && (
              <button
                className="btn-add-new"
                onClick={() => navigate("/admin/destinations/new")}
              >
                <Plus size={16} /> Add Destination
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <div className="admin-loading">Loading Dashboard Data...</div>
        ) : (
          <div className="admin-content">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                {/* Stats Cards Grid */}
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
                      <h3>{bookings.length}</h3>
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
                </div>

                {/* Recent Bookings Table */}
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
                        {bookings.slice(0, 5).map((booking, idx) => (
                          <tr key={idx}>
                            <td>
                              {booking.fullName || booking.userName || "N/A"}
                            </td>
                            <td>{booking.destinationName || "N/A"}</td>
                            <td>{booking.date || "N/A"}</td>
                            <td>{booking.guests || 1}</td>
                            <td>${booking.totalPrice || 0}</td>
                            <td>
                              <span className="badge badge-success">
                                Confirmed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "guides" && (
              <div className="admin-card guides-admin-card">
                {showGuideForm ? (
                  <form
                    className="guide-admin-form"
                    onSubmit={handleGuideSubmit}
                  >
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
                        <option value="Destinations">Destinations</option>
                        <option value="Travel Tips">Travel Tips</option>
                        <option value="Culture">Culture</option>
                        <option value="Food">Food</option>
                        <option value="Adventure">Adventure</option>
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
                      <button
                        type="submit"
                        className="btn-add-new"
                        disabled={guideSaving}
                      >
                        {guideSaving
                          ? "Saving..."
                          : editingGuide
                            ? "Save Changes"
                            : "Create Article"}
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
                        {guides
                          .filter((guide) =>
                            (guide.title || "")
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()),
                          )
                          .map((guide) => (
                            <tr key={guide._id}>
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
                                    guide.status === "published"
                                      ? "badge-success"
                                      : "badge-draft"
                                  }`}
                                >
                                  {guide.status}
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
                                    onClick={() => handleDeleteGuide(guide._id)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                        {guides.length === 0 && (
                          <tr>
                            <td colSpan={5} className="guides-empty-cell">
                              No articles yet. Click "Add Article" to create
                              your first one.
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
                      {destinations
                        .filter((d) =>
                          (d.name || d.title || "")
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        )
                        .map((dest) => {
                          const id = dest._id || dest.id;
                          return (
                            <tr key={id}>
                              <td>
                                <img
                                  src={dest.heroImage || dest.image}
                                  alt=""
                                  className="table-thumb"
                                  referrerPolicy="no-referrer"
                                />
                              </td>
                              <td>
                                <strong>{dest.name || dest.title}</strong>
                              </td>
                              <td>{dest.location}</td>
                              <td>${dest.pricePerDay || dest.price || 0}</td>
                              <td>⭐ {dest.rating || "N/A"}</td>
                              <td>
                                <div className="action-buttons">
                                  <button
                                    className="btn-icon btn-edit"
                                    onClick={() =>
                                      navigate(`/admin/destinations/edit/${id}`)
                                    }
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    className="btn-icon btn-delete"
                                    onClick={() => handleDeleteDestination(id)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="admin-card">
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, idx) => (
                        <tr key={idx}>
                          <td>#{idx + 1}</td>
                          <td>{booking.fullName}</td>
                          <td>{booking.email}</td>
                          <td>{booking.destinationName}</td>
                          <td>{booking.date}</td>
                          <td>${booking.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
