'use client';

import { signOut } from "next-auth/react";
// @ts-ignore
import { SignOutParams } from "next-auth/src/react/types";
import { Button, Link as UILink, Stack, Typography } from "@mui/joy";
import { usePathname } from 'next/navigation';
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();
    const logOut = () => {
        signOut({ redirect: true, callbackUrl: "/login" } as SignOutParams)
    };

    return (
        <Stack gap={2} direction="row" alignItems="center" justifyContent="right" sx={{
            width: '100%', backgroundColor: '#b16a4159',
            height: 70,
        }}>
            {pathname === '/artists-list' &&
                <Link href='/'>
                    <UILink
                        color="neutral"
                        underline="none"
                        href=""
                    >
                        <Typography level="title-sm">Home</Typography>
                    </UILink>
                </Link>
            }
            {pathname === '/' &&
                <Link href='/artists-list'>
                    <UILink
                        color="neutral"
                        underline="none"
                        href=""
                    >
                        <Typography level="title-sm">Artists List</Typography>
                    </UILink>
                </Link>
            }
            <Button onClick={logOut} color="neutral" variant="soft" size="sm" sx={{ marginRight: 2 }}>Log out</Button>
        </Stack>
    )
}