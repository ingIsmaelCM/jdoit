import appConfig from "@/configs/app.config";
import databaseConfig  from "@/configs/database.config";
import {authConfig} from "@/configs/auth.config";
import validationConfig from "@/configs/validation.config";
import { config } from "dotenv";

config({path: `${process.cwd()}/.env`});
export {appConfig, databaseConfig, authConfig, validationConfig}