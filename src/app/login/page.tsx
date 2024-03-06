'use client';

import SignIn from "@/app/login/SignIn";
import { SessionProvider } from "next-auth/react";
import { Stack } from "@mui/joy";

export default function Login() {
    return (
        <Stack alignItems="center" justifyContent="center" height="100vh">
            <SessionProvider>
                <SignIn/>
            </SessionProvider>
        </Stack>
    )
}
