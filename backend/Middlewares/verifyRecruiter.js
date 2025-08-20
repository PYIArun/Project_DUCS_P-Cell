import jwt from "jsonwebtoken";

export const verifyRecruiter = (req, res, next) => {
  const authHeader = req.headers.authorization; // Expect "Bearer token"
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");

    if (decoded.role !== "recruiter") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.recruiter = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
