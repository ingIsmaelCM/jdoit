import { diskStorage } from "multer";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

const appConfig: Record<string, string | number | MulterOptions> = {
  port: process.env.APP_PORT || 3000,
  name: process.env.APP_NAME || "myapp",
  env: process.env.APP_ENV || "env",
  key: process.env.APP_KEY || "",
  multerOptions: {
    storage: diskStorage({
      destination: "./upload",
      filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}_${uniqueSuffix}.${ext}`);
      }
    })
  }
};

export default appConfig;