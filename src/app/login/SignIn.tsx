import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button, Card, CircularProgress, Stack, Typography } from "@mui/joy";

export default function SignIn() {
    const { data, status }: any = useSession();
    const [isLoading, setIsLoading] = useState(false);

    if (data?.session?.user) {
        if (status === 'authenticated') {
            localStorage.setItem('access_token', data.token.token.account?.access_token)
        }

        setIsLoading(false);
        redirect('/');

        return (
            <>
                Signed in as {data.session.user.email} <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    const onClick = () => {
        setIsLoading(true);

        signIn().then(res => {
            console.log('after sign in', res)
        });
    }

    if (isLoading) {
        return <CircularProgress color="neutral"/>
    }

    return (
        <Card orientation="horizontal" variant="soft">
            <Stack spacing={2} justifyContent="center" alignItems="center" direction="column" width={200}>
                <Typography level="title-md">Not signed in</Typography>
                <Button
                    color="neutral"
                    onClick={onClick}
                    size="md"
                    variant="solid"
                >
                    Sign in
                </Button>
            </Stack>
        </Card>
    )
}

