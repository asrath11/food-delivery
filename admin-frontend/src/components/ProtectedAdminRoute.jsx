import { useUser } from "@/hooks/UserProvider";

function ProtectedAdminRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "admin") {
    return <div>Access Denied</div>;
  }

  return children;
}

export default ProtectedAdminRoute;
