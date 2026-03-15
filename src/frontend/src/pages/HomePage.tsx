import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Construction,
  Droplets,
  Lamp,
  Trash2,
  Users,
} from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const issueTypes = [
  {
    icon: Construction,
    label: "Potholes",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Trash2,
    label: "Garbage Dumps",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Lamp,
    label: "Streetlights",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Droplets,
    label: "Water Leaks",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const features = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Easy Reporting",
    desc: "Submit civic issues in under 2 minutes. Snap a photo, drop a pin, and send — no bureaucracy required.",
  },
  {
    num: "02",
    icon: Activity,
    title: "Real-time Tracking",
    desc: "Watch your report move from Pending → In Progress → Resolved. Full transparency on every issue.",
  },
  {
    num: "03",
    icon: Users,
    title: "Community Impact",
    desc: "Every report drives collective action. See how your neighborhood is improving issue by issue.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-mesh min-h-[88vh] flex items-center">
        <div className="container py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={container}
              className="max-w-xl"
            >
              <motion.div variants={item}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Civic Tech for Everyone
                </span>
              </motion.div>
              <motion.h1
                variants={item}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
              >
                Smart Civic
                <br />
                <span className="text-primary">Reporter</span>
              </motion.h1>
              <motion.p
                variants={item}
                className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md"
              >
                Empowering citizens to report civic problems and improve their
                city. Fast, transparent, and community-driven.
              </motion.p>
              <motion.div variants={item} className="flex flex-wrap gap-3">
                <Link to="/report">
                  <Button
                    size="lg"
                    className="gap-2 h-12 px-6 text-base"
                    data-ocid="hero.report_issue.button"
                  >
                    Report an Issue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/issues">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 h-12 px-6 text-base"
                    data-ocid="hero.view_issues.button"
                  >
                    View Issues
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              {/* Issue type pills */}
              <motion.div
                variants={item}
                className="mt-10 flex flex-wrap gap-2"
              >
                {issueTypes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <span
                      key={t.label}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${t.bg} ${t.color} border border-current/10`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {t.label}
                    </span>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Hero illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl scale-110" />
                <img
                  src="/assets/generated/hero-city-illustration-transparent.dim_800x600.png"
                  alt="City infrastructure illustration"
                  className="relative w-full max-w-lg rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "2,400+", label: "Issues Reported" },
              { val: "94%", label: "Resolution Rate" },
              { val: "48hrs", label: "Avg Response Time" },
              { val: "12 Cities", label: "Across the Nation" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
                  {s.val}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Built for real impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Every feature is designed to reduce friction between citizens and
              the change they want to see.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={item}>
                  <Card className="h-full group hover:shadow-card-hover transition-all duration-300 border-border/60 bg-card">
                    <CardContent className="p-8">
                      <div className="font-display text-6xl font-black text-primary/10 leading-none mb-4 -ml-1">
                        {f.num}
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {f.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {f.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
              Your city needs you
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              One report can fix a road used by thousands. Start making a
              difference today.
            </p>
            <Link to="/report">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base font-semibold gap-2"
                data-ocid="cta.report_issue.button"
              >
                Report an Issue Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-red-500">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </main>
  );
}
