'use client';

import Image from "next/image";
import { Button, Card, Chip, Divider, Link as UILink, Stack, Typography } from "@mui/joy";
import Link from "next/link";
import "./ArtistCard.scss";
import logo from '../../../../public/Spotify_Logo_RGB_Black.png';
import { add } from "@/lib/features/savedArtists/saved-artists";
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";

export interface Artist {
    id: string;
    name: string;
    genres: string[];
    external_urls: { spotify: string };
    images: { height: number, url: string, width: number }[];
}

export interface Props {
    artist: Artist;
    onClick: (id: string) => void;
    isSelected: boolean;
}

export default function ArtistCard({ artist, onClick, isSelected }: Props) {
    const { name, id, genres, images, external_urls: { spotify: url } } = artist;
    const [isAddedToList, setIsAddedToList] = useState(false);
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        onClick(id);
    }

    const addToList = () => {
        dispatch(add(artist));
        setIsAddedToList(true);
    }

    return (
        <Stack spacing={4} alignItems='center'>
            <Card
                orientation="vertical"
                size="md"
                variant={isSelected ? "solid" : "outlined"}
                className="artist-card"
                color={"neutral"}
                key={id}
            >
                <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>{name}</Typography>
                <Link href={url} className="artist-link">
                    <Image
                        className="artist-image"
                        src={images[0]?.url}
                        alt="Artist image"
                        width={250}
                        height={250}
                        style={{ objectFit: "cover" }}
                    />
                </Link>
                <Stack gap={1} direction="row" className="genres" flexWrap="wrap">
                    {genres.map(genre => (
                        <Chip>{genre}</Chip>
                    ))}
                </Stack>

                <Divider inset="none"/>

                <Link href={url} target="_blank" style={{ textAlign: "center" }}>
                    <UILink color="neutral" underline="none" variant="plain">
                        <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
                            <p>Listen on</p>
                            <Image
                                src={logo}
                                alt="Spotify logo"
                                objectFit="cover"
                                width={80}/>
                        </Stack>
                    </UILink>
                </Link>
                <Button onClick={addToList} size="md" color="neutral" variant="soft">
                    {isAddedToList ? 'Added to your list' : 'Add to my list'}</Button>
                <Button
                    onClick={onClickHandler}
                    size="md"
                    color="primary"
                    variant="solid">
                    Find more like this
                </Button>
            </Card>
        </Stack>

    )
}