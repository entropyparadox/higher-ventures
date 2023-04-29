const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const OpenAPI = require("openapi-typescript-codegen");
const config = require("../codegen.config");

async function run() {
  if (!config.enable) {
    return;
  }

  try {
    // front api dto 생성
    if (config.frontApi && config.frontApi.url && config.frontApi.outPath) {
      const modelPath = path.resolve(config.frontApi.outPath, "models");
      const servicePath = path.resolve(config.frontApi.outPath, "services");
      const corePath = path.resolve(config.frontApi.outPath, "core");

      if (fs.existsSync(modelPath)) {
        fs.rmSync(modelPath, { recursive: true });
      }

      if (fs.existsSync(servicePath) && config.exportService) {
        fs.rmSync(servicePath, { recursive: true });
      }

      if (fs.existsSync(corePath) && config.exportCore) {
        fs.rmSync(corePath, { recursive: true });
      }

      await OpenAPI.generate({
        input: config.frontApi.url,
        output: config.frontApi.outPath,
        exportCore: config.exportCore,
        exportServices: config.exportService,
        httpClient: "axios",
        indent: "2",
      });

      await exec(
        `npx prettier --write --loglevel silent ${config.frontApi.outPath}`
      );
    }

    // admin api dto 생성
    if (config.adminApi && config.adminApi.url && config.adminApi.outPath) {
      const modelPath = path.resolve(config.adminApi.outPath, "models");
      const servicePath = path.resolve(config.adminApi.outPath, "services");
      const corePath = path.resolve(config.adminApi.outPath, "core");

      if (fs.existsSync(modelPath)) {
        fs.rmSync(modelPath, { recursive: true });
      }

      if (fs.existsSync(servicePath) && config.exportService) {
        fs.rmSync(servicePath, { recursive: true });
      }

      if (fs.existsSync(corePath) && config.exportCore) {
        fs.rmSync(corePath, { recursive: true });
      }

      await OpenAPI.generate({
        input: config.adminApi.url,
        output: config.adminApi.outPath,
        exportCore: config.exportCore,
        exportServices: config.exportService,
        httpClient: "axios",
        indent: "2",
      });

      await exec(
        `npx prettier --write --loglevel silent ${config.adminApi.outPath}`
      );
    }
    console.log("🎉  DTO 생성 완료");
  } catch (err) {
    console.error(err);
  }
}

run();
