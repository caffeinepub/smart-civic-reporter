import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Calendar, Inbox, MapPin, Plus } from "lucide-react";
import { motion } from "motion/react";
import { IssueIcon } from "../components/IssueIcon";
import { StatusBadge } from "../components/StatusBadge";
import { useGetIssues } from "../hooks/useQueries";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f"];

function IssueCardSkeleton() {
  return (
    <Card className="border-border/60">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ViewIssuesPage() {
  const { data: issues, isLoading, isError } = useGetIssues();

  const formatDate = (ts: bigint) => {
    return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="bg-background py-12">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link
                  to="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">View Issues</span>
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Civic Issues
              </h1>
              <p className="text-muted-foreground">
                {isLoading
                  ? "Loading..."
                  : `${issues?.length ?? 0} issue${
                      (issues?.length ?? 0) !== 1 ? "s" : ""
                    } reported`}
              </p>
            </div>
            <Link to="/report">
              <Button className="gap-2" data-ocid="issues.report_issue.button">
                <Plus className="h-4 w-4" />
                Report Issue
              </Button>
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div
              data-ocid="issues.loading_state"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {SKELETON_KEYS.map((k) => (
                <IssueCardSkeleton key={k} />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
              <p className="text-destructive font-medium">
                Failed to load issues. Please try again.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && issues?.length === 0 && (
            <div
              data-ocid="issues.empty_state"
              className="flex flex-col items-center gap-4 py-24 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Inbox className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  No issues yet
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Be the first to report a civic issue in your area.
                </p>
              </div>
              <Link to="/report">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Report First Issue
                </Button>
              </Link>
            </div>
          )}

          {/* Issues grid */}
          {!isLoading && !isError && issues && issues.length > 0 && (
            <motion.div
              data-ocid="issues.list"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {issues.map((issue, idx) => (
                <motion.div
                  key={issue.id.toString()}
                  data-ocid={`issues.item.${idx + 1}`}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <Card className="h-full group hover:shadow-card-hover transition-all duration-300 border-border/60 bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <IssueIcon issueType={issue.issueType} />
                        <StatusBadge status={issue.status} />
                      </div>
                      <h3 className="font-display font-semibold text-foreground leading-snug mb-1.5 line-clamp-1">
                        {issue.issueType} — {issue.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                        {issue.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(issue.createdAt)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
