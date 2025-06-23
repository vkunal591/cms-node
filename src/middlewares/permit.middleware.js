export const permit = (requiredAction, requiredRoute) => {
  return (req, res, next) => {
    const { user } = req;
    const permissions = user?.role?.permissions || [];

    const hasPermission = permissions.some(p =>
      p.action === requiredAction && p.route === requiredRoute
    );

    if (!hasPermission) {
      return res.status(403).json({ error: "Access Denied" });
    }

    next();
  };
};
