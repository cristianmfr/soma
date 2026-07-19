import "@soma/env";

import dotenv from "dotenv";
import type { NextConfig } from "next";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: "standalone",
};

export default nextConfig;
