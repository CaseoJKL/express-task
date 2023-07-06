import expressListRoutes from "express-list-routes";
import fs from "fs";
import path from "path";

function logRoutes(app: any) {
  console.log(expressListRoutes(app, { prefix: "/api/v1" }));

  let str: any = JSON.stringify(expressListRoutes(app, { prefix: "/api/v1" }));

  // Replace \\ with \
  str = str.replace(/\\\\/g, "\\");

  // Replace \ with /
  str = str.replace(/\\/g, "/");

  //Add newline after each object
  str = str.replace(/},/g, "},\n ");

  console.log(str);
  fs.writeFile(path.join(__dirname, "../routes.log"), str, (err) => {
    if (err) {
      console.log("Error Occured while creating routes log");
    } else {
      console.log("Routes logged successfully");
    }
  });
}

export default logRoutes;
