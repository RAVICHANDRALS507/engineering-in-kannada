import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import BackToTop from "./components/BackToTop";
import * as ga from "./utils/analytics";

// Pages
import { HomePage } from "./pages/HomePage";
import { CoursePage } from "./pages/CoursePage";
import { Blogs } from "./pages/Blogs";
import { BlogPost } from "./pages/BlogPost";
import { LinksPage } from "./pages/LinksPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";

// Google Analytics Wrapper
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    ga.pageview(location.pathname + location.search);
  }, [location]);

  return <>{children}</>;
}

// Protected example page: Profile
const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            This is a protected page - only logged-in users can view this!
          </p>
        </div>
      </div>
    </div>
  );
};

// Premium content example
const PremiumContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Premium content</h1>
        <p>This is Premium Content</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsWrapper>
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<HomePage />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />

                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/premium-content"
                  element={
                    <ProtectedRoute
                      fallback={
                        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                          <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                              Premium Content
                            </h2>
                            <p className="text-gray-600 mb-8">
                              Please log in to access this content.
                            </p>
                          </div>
                        </div>
                      }
                    >
                      <PremiumContent />
                    </ProtectedRoute>
                  }
                />

                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <BackToTop />
          </div>
        </AnalyticsWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
