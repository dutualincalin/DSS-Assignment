import {Alert, AlertTitle, Snackbar} from "@mui/material";
import React from "react";

export default function SnackBarAlerts({alertInfo, closeAlert}) {

    function getAlertTitle() {
        return alertInfo.alertType.charAt(0).toUpperCase() + alertInfo.alertType.slice(1)
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={alertInfo.state}
            onClose={closeAlert}
            autoHideDuration={6000}
        >
            <Alert variant="filled" onClose={closeAlert} severity={alertInfo.alertType} sx={{ width: '100%' }}>
                <AlertTitle>{getAlertTitle()}</AlertTitle>
                {alertInfo.message}
            </Alert>
        </Snackbar>
    )
}