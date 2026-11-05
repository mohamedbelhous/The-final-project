export const isAdminUser = (user) => {
  if (!user) return false;

  const role = user.role || user.roles || user.userType || user.type;

  return (
    Boolean(user.isAdmin) ||
    Boolean(user.is_admin) ||
    (typeof role === "string" && role.toLowerCase() === "admin") ||
    (Array.isArray(role) &&
      role.some((item) => String(item).toLowerCase() === "admin"))
  );
};
