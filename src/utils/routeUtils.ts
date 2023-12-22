import { readdirSync } from "fs";
import path, { join, parse } from "path";
import { Router } from "express";

export function importRoutes(directory: string) {
  const routes: { [key: string]: Router } = {};

  const dirPath = path.join(__dirname, "../routes");
  console.log(dirPath);

  const files = readdirSync(dirPath, "utf-8");

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    const routeName = parse(file).name;

    const routeModule = require(filePath) as { default: Router };
    routes[routeName] = routeModule.default;
  });

  return routes;
}
