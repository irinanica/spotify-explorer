import ArtistCard, { Artist } from "@/app/components/artist-card/ArtistCard";
import { Stack } from "@mui/joy";
import { useEffect, useRef, useState } from "react";

export interface Props {
    set: Artist[];
    onClick: (id: string, setId: number) => void;
    setId: number;
}

export default function ArtistSet({ set, onClick, setId }: Props) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const sectionRef = useRef<null | HTMLDivElement>(null);

    const onClickHandler = (id: string) => {
        setSelectedId(id);
        onClick(id, setId);
    }

    useEffect(() => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, []);

    return (
        <Stack direction="row" spacing={4} flexWrap="wrap" alignItems="center" justifyContent="center"
               ref={sectionRef}>
            {set.map(artist =>
                <ArtistCard
                    artist={artist}
                    key={artist.id}
                    onClick={onClickHandler}
                    isSelected={selectedId === artist.id}
                />
            )}
        </Stack>
    )
}