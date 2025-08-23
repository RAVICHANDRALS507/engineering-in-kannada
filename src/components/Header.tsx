import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Trophy, FileText, Link2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./Auth/AuthModal";
import { UserProfile } from "./Auth/UserProfile";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">(
    "login"
  );

  const { user } = useAuth();
  const location = useLocation();

  const handleShowLogin = () => {
    setAuthModalMode("login");
    setShowAuthModal(true);
  };

  const handleShowSignup = () => {
    setAuthModalMode("signup");
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.jpg"
                alt="Engineering in Kannada"
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/32?text=EK";
                }}
              />
              <span className="text-white font-bold text-lg hidden sm:inline">
                Engineering in Kannada
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 text-sm ${
                  location.pathname === "/" || location.pathname === "/courses"
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <Home className="h-4 w-4" />
                Courses
              </Link>
              <Link
                to="/leaderboard"
                className={`flex items-center gap-2 text-sm ${
                  location.pathname === "/leaderboard"
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Link>
              <Link
                to="/blogs"
                className={`flex items-center gap-2 text-sm ${
                  location.pathname.includes("/blogs")
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <FileText className="h-4 w-4" />
                Blogs
              </Link>
              <Link
                to="/links"
                className={`flex items-center gap-2 text-sm ${
                  location.pathname === "/links"
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <Link2 className="h-4 w-4" />
                Links
              </Link>
            </nav>

            {/* Auth Section (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserProfile />
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShowLogin}
                    className="text-gray-300 hover:text-primary text-sm"
                  >
                    Login
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={handleShowSignup}
                    className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/90"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="mt-4 flex flex-col gap-2 md:hidden">
              <Link
                to="/"
                className={`flex items-center gap-2 p-2 text-sm ${
                  location.pathname === "/" || location.pathname === "/courses"
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Courses
              </Link>
              <Link
                to="/leaderboard"
                className={`flex items-center gap-2 p-2 text-sm ${
                  location.pathname === "/leaderboard"
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Link>
              <Link
                to="/blogs"
                className={`flex items-center gap-2 p-2 text-sm ${
                  location.pathname.includes("/blogs")
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4" />
                Blogs
              </Link>
              <Link
                to="/links"
                className={`flex items-center gap-2 p-2 text-sm ${
                  location.pathname === "/links"
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link2 className="h-4 w-4" />
                Links
              </Link>

              {/* Auth Section (Mobile) */}
              <div className="mt-2 flex flex-row items-center gap-2">
                {user ? (
                  <UserProfile />
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleShowLogin();
                      }}
                      className="text-left text-gray-300 hover:text-primary text-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleShowSignup();
                      }}
                      className="w-fit text-left bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/90"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
