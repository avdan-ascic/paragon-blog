import "dotenv/config";

const config = {
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET || "EnterJWTSecretHere!",
  mongo: process.env.MONGO || "mongodb://127.0.0.1/paragon-blog",
  session_secret: process.env.SESSION_SECRET || "EnterSessionSecretHere!",
};

export default config;
