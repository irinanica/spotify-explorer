import React, { useState } from "react";
import { Button, Stack } from "@mui/joy";
import Input from "@mui/joy/Input";
import "./Search.scss";

interface Props {
    submit: (e: any, artist: string) => void;
    onClear: () => void;
    fullHeight: boolean;
}

export default function Search({ submit, onClear, fullHeight }: Props) {
    const [searchItem, setSearchItem] = useState('');

    const onInputChange = (event: any) => {
        setSearchItem(event.currentTarget.value);

        if (!event.currentTarget.value) {
            onClear();
        }
    }

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: fullHeight ? 'calc(100vh - 140px)' : '70vh' }}
            className="search-wrapper">
            <form onSubmit={(e) => submit(e, searchItem)}>
                <Stack direction="row" spacing={2}>
                    <label htmlFor="default-search"/>
                    {/*@ts-ignore*/}
                    <Input
                        type="search"
                        id="default-search"
                        className="input-search"
                        color="neutral"
                        size="md"
                        variant="outlined"
                        placeholder="Search artist"
                        required
                        onChange={onInputChange}
                    />
                    <Button type="submit">Search</Button>
                </Stack>
            </form>
        </Stack>
    )
}
