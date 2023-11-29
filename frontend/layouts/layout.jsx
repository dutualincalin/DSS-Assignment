import {AppBar, Toolbar} from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Layout({children}) {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar id="toolbarLayout">
                    <Image
                        alt="Logo"
                        src="/icon.png"
                        height={40}
                        width={40}
                    />
                </Toolbar>
            </AppBar>
            <main style={{margin: "80px 0vh"}}>{children}</main>
        </>
    )
}