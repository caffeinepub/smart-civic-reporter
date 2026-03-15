import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Navbar } from "./components/Navbar";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { ReportIssuePage } from "./pages/ReportIssuePage";
import { ViewIssuesPage } from "./pages/ViewIssuesPage";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const reportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/report",
  component: ReportIssuePage,
});

const issuesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issues",
  component: ViewIssuesPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  reportRoute,
  issuesRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
