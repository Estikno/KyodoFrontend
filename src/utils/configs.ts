import { ToastOptions } from "react-toastify";

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

export const variables = {
    HOST: "http://kyodobackend-production.up.railway.app"
}