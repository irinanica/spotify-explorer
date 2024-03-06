'use client';

import Header from "@/app/components/Header";
import { CssVarsProvider, Stack } from "@mui/joy";
import React, { useEffect } from "react";
import background from '../../public/search-background.avif';
import Search from "@/app/components/search/Search";
import { theme } from "./utilities/css-theme";
import { fetchArtist, findSimilarArtists } from "@/app/utilities/api";
import { Artist } from "@/app/components/artist-card/ArtistCard";
import ArtistSet from "@/app/components/artist-set/ArtistSet";
import Footer from "@/app/components/Footer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { update } from "@/lib/features/searchedArtists/searched-artists";
import { RootState } from "@/lib/store";

export default function Home() {
    // @ts-ignore
    const artistSets = useAppSelector((state: RootState) => state.searchedArtists.list);
    const dispatch = useAppDispatch();


    const searchArtist = (event: any, artist: string) => {
        event.preventDefault();

        fetchArtist(artist, res => {
            dispatch(update([[res.artists.items[0]]]));
        });
    }

    const onSearchClear = () => {
        dispatch(update([]));
    }

    const getSimilarArtists = async (id: string, setId: number) => {
        const response = await findSimilarArtists(id);
        const newArtists: Artist[] = response.artists.slice(0, 5);

        const updatedList = artistSets.slice(0, setId + 1)
        updatedList.push(newArtists)

        dispatch(update(updatedList));
    }

    useEffect(() => {
        dispatch(update(artistSets))
    }, artistSets);

    return (
        <CssVarsProvider theme={theme}>
            <main>
                <Stack spacing={artistSets.length ? 4 : 0}>
                    <Stack
                        sx={{
                            backgroundImage: `url(${background.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        direction='column'
                        justifyContent="flex-start"
                    >
                        <Header/>
                        <Search submit={searchArtist} onClear={onSearchClear} fullHeight={!artistSets.length}/>
                    </Stack>

                    {artistSets.length > 0 &&
                        <>
                            {artistSets.map((set: Artist[], index: number) => (
                                <ArtistSet
                                    set={set}
                                    onClick={getSimilarArtists}
                                    key={index}
                                    setId={index}/>
                            ))}
                        </>
                    }
                    <Footer/>
                </Stack>
            </main>
        </CssVarsProvider>
    );
}
