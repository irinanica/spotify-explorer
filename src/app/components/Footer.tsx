import { Stack, Typography } from "@mui/joy";
import React from "react";

export default function Footer() {
    return (
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{
            width: '100%',
            backgroundColor: '#373F51',
            height: 70
        }}>
            <Typography level="body-md" sx={{ color: '#fff' }}>
                Developed using the Spotify API
            </Typography>
        </Stack>
    )
}