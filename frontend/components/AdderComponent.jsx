import componentStyles from "./adder.module.css"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Box, IconButton} from "@mui/material";
import React from "react";

export default function AdderComponent({onClickFunction}) {
    return (
        <IconButton color="secondary" onClick={onClickFunction} className={componentStyles.adderIconButtonStyle}>
            <AddCircleOutlineIcon className={componentStyles.adderIconStyle}/>
        </IconButton>
    )
}