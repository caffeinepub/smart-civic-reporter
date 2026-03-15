import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Loader2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { IssueIcon } from "../components/IssueIcon";
import { StatusBadge } from "../components/StatusBadge";
import {
  IssueStatus,
  useAdminLogin,
  useGetIssues,
  useUpdateIssueStatus,
} from "../hooks/useQueries";
import type { Issue } from "../hooks/useQueries";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError } = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(password, {
      onSuccess: (ok) => {
        if (ok) onLogin();
      },
    });
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm px-4"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <ShieldCheck className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Admin Access
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your password to access the dashboard
          </p>
        </div>

        <Card className="shadow-card border-border/60">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-ocid="admin.password_input"
                  className="h-11"
                />
              </div>

              {(isError || (password && !isPending)) && isError && (
                <div
                  data-ocid="admin.login_error_state"
                  className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  Invalid password. Please try again.
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending || !password}
                data-ocid="admin.login_button"
                className="w-full h-11 gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

function Dashboard() {
  const { data: issues = [], isLoading } = useGetIssues();
  const {
    mutate: updateStatus,
    isPending: isUpdating,
    variables: updateVars,
  } = useUpdateIssueStatus();

  const counts = {
    total: issues.length,
    pending: issues.filter((i: Issue) => i.status === IssueStatus.pending)
      .length,
    inProgress: issues.filter((i: Issue) => i.status === IssueStatus.inProgress)
      .length,
    resolved: issues.filter((i: Issue) => i.status === IssueStatus.resolved)
      .length,
  };

  const stats = [
    {
      label: "Total Issues",
      value: counts.total,
      icon: ClipboardList,
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "admin.total_issues_card",
    },
    {
      label: "Pending",
      value: counts.pending,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      ocid: "admin.pending_card",
    },
    {
      label: "In Progress",
      value: counts.inProgress,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      ocid: "admin.in_progress_card",
    },
    {
      label: "Resolved",
      value: counts.resolved,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      ocid: "admin.resolved_card",
    },
  ];

  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="bg-background py-12">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and resolve citizen-reported civic issues.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.label}
                  data-ocid={s.ocid}
                  className="shadow-card border-border/60"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}
                      >
                        <Icon className={`h-4.5 w-4.5 ${s.color}`} />
                      </div>
                    </div>
                    <div
                      className={`font-display text-3xl font-bold ${s.color} leading-none mb-1`}
                    >
                      {isLoading ? "—" : s.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Issues list */}
          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-xl font-semibold">
                All Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Loading issues...
                </div>
              ) : issues.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No issues to display.
                </div>
              ) : (
                <div
                  data-ocid="admin.issues_list"
                  className="divide-y divide-border"
                >
                  {issues.map((issue: Issue, idx: number) => {
                    const isCurrentlyUpdating =
                      isUpdating && updateVars?.issueId === issue.id;
                    return (
                      <div
                        key={issue.id.toString()}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <IssueIcon issueType={issue.issueType} size="sm" />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <span className="font-medium text-foreground text-sm">
                                {issue.issueType} — {issue.name}
                              </span>
                              <StatusBadge status={issue.status} />
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate max-w-[160px]">
                                  {issue.location}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(issue.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {issue.status !== IssueStatus.inProgress && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isCurrentlyUpdating}
                              onClick={() =>
                                updateStatus({
                                  issueId: issue.id,
                                  status: IssueStatus.inProgress,
                                })
                              }
                              data-ocid={`admin.issue.status_button.${idx + 1}`}
                              className="text-xs h-8 border-amber-200 text-amber-700 hover:bg-amber-50"
                            >
                              {isCurrentlyUpdating ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Mark In Progress"
                              )}
                            </Button>
                          )}
                          {issue.status !== IssueStatus.resolved && (
                            <Button
                              size="sm"
                              disabled={isCurrentlyUpdating}
                              onClick={() =>
                                updateStatus({
                                  issueId: issue.id,
                                  status: IssueStatus.resolved,
                                })
                              }
                              data-ocid={`admin.issue.status_button.${idx + 1}`}
                              className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              {isCurrentlyUpdating ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Mark Resolved"
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }
  return <Dashboard />;
}
