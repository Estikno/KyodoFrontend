import { ToastOptions } from "react-toastify";
import { config } from "dotenv";

config();

/**
 * This script is used to set the configuration for the application.
 * This is used to be easier to change the configuration in one place.
 */

export const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
};

export const specialCharacters = /[ `!@#$%^&*()+\-=[\]{};':"\\|,.<>/?~·¨çñ]/;

export const apiRoute = process.env.API_ROUTE as string; //"http://127.0.0.1:4758"; //"https://kyodobackend-production.up.railway.app";