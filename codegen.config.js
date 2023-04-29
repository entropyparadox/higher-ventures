const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./starter-api/.env" });

const frontPort = process.env.PORT || 8000;
const adminPort = process.env.ADMIN_PORT || 8001;
const frontOutPath = path.resolve(`starter-web/generated/api/front/`);
const adminOutPath = path.resolve(`starter-web/generated/api/admin/`);

module.exports = {
  enable: true,
  exportCore: false,
  exportService: true,
  frontApi: {
    url: `http://localhost:${frontPort}/api-json`,
    outPath: frontOutPath,
  },
  adminApi: {
    url: `http://localhost:${adminPort}/api-json`,
    outPath: adminOutPath,
  },
};
