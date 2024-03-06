'use client';

import { empty, remove } from "@/lib/features/savedArtists/saved-artists";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CssVarsProvider,
    Link as UILink,
    Sheet,
    Stack,
    Table,
    Typography
} from "@mui/joy";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Artist } from "@/app/components/artist-card/ArtistCard";
import Header from "@/app/components/Header";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Spotify_Logo_RGB_Black.png";
import Footer from "@/app/components/Footer";
import { theme } from "@/app/utilities/css-theme";

export default function ArtistsList() {
    // @ts-ignore
    const savedArtists = useAppSelector((state: RootState) => state.savedArtists.list);
    const dispatch = useAppDispatch();

    const removeArtist = (id: string) => {
        dispatch(remove(id));
    }

    const removeList = () => {
        dispatch(empty(savedArtists));
        localStorage.removeItem('artistSets');
    }

    const saveList = () => {
        localStorage.setItem('artistSets', JSON.stringify(savedArtists));
    }

    if (!savedArtists.length) {
        return (
            <>
                <Header/>
                <Stack justifyContent="center" alignItems="center" minHeight="calc(100vh - 140px)">
                    <Stack width="50%" height="400px" alignItems="center" justifyContent="center">
                        <Card>
                            No artists yet. Make sure to search your favourite artists and add them to your list.
                        </Card>
                    </Stack>
                </Stack>
                <Footer/>
            </>
        )
    }

    return (
        <CssVarsProvider theme={theme}>
            <main>
                <Header/>
                <Stack alignItems="center" justifyContent="flex-start" spacing={2} margin={4}
                       minHeight="calc(100vh - 140px)" height="auto">
                    <Stack width="75%" spacing={4}>
                        <Sheet>
                            <Table
                                color="neutral"
                                size="md"
                                stickyFooter={false}
                                stickyHeader={false}
                                variant="plain"
                            >
                                <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>Avatar</th>
                                    <th>Name</th>
                                    <th>Link</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {savedArtists.map((artist: Artist) => (
                                    <tr key={artist.name}>
                                        <td><Avatar src={artist.images[0].url}/></td>
                                        <td>{<Typography level="title-md">{artist.name}</Typography>}</td>
                                        <td><Link href={artist.external_urls.spotify} target="_blank"
                                                  style={{ textAlign: "center" }}>
                                            <UILink color="neutral" underline="none" variant="plain">
                                                <Stack spacing={1} direction="row" justifyContent="center"
                                                       alignItems="center">
                                                    <Typography level="body-md">Listen on</Typography>
                                                    <Image
                                                        src={logo}
                                                        alt="Spotify logo"
                                                        width={80}/>
                                                </Stack>
                                            </UILink>
                                        </Link></td>
                                        <td>
                                            <Button
                                                color="danger"
                                                variant="soft"
                                                onClick={() => removeArtist(artist.id)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </Table>
                        </Sheet>
                        <Stack width="100%" justifyContent="flex-end" alignItems="flex-end">
                            <ButtonGroup spacing={2}>
                                <Button variant="outlined" color="danger" onClick={removeList}>Remove list</Button>
                                <Button variant="outlined" color="neutral" onClick={saveList}>Save list to your
                                    account</Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>
                </Stack>
                <Footer/>
            </main>
        </CssVarsProvider>
    )
}
