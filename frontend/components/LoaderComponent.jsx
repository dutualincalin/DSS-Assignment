import {CircularProgress} from "@mui/material";
import React from "react";
import loaderStyles from "./loader.module.css"

export default function LoaderComponent() {
    return (
        <div className={loaderStyles.loadingPanel}>
            <div className={loaderStyles.loadingPage}>
                <h1>Hello and welcome!</h1>
                <h2>We are starting the app, please wait. Thank you!</h2>
                <CircularProgress />
            </div>
        </div>
    )
}