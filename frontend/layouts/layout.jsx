import {AppBar, Toolbar} from "@mui/material";
import Image from "next/image";
import React from "react";
import Script from "next/script";

export default function Layout({children}) {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9Y992RYXDS"></Script>
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
    
                    gtag('config', 'G-9Y992RYXDS');
                `}
            </Script>

            <AppBar position="fixed">
                <Toolbar id="toolbarLayout">
                    <Image
                        alt="Logo"
                        src="/icon.jpg"
                        height={40}
                        width={40}
                    />
                </Toolbar>
            </AppBar>
            <main style={{margin: "80px 0vh"}}>{children}</main>
        </>
    )
}