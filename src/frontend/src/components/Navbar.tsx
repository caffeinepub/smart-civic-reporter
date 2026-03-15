import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "View Issues", to: "/issues" },
  { label: "Report Issue", to: "/report" },
  { label: "Admin", to: "/admin" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:block">Smart Civic Reporter</span>
          <span className="sm:hidden">SCR</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/report">
            <Button
              size="sm"
              className="ml-2"
              data-ocid="nav.report_cta.button"
            >
              Report Issue
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1",
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
