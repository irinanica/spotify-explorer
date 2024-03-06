import { createSlice } from '@reduxjs/toolkit'
import { Artist } from "@/app/components/artist-card/ArtistCard";

export interface ArtistListState {
    list: Artist[];
}

const initialArtists: string | null = localStorage.getItem('artistSets');

const initialState: ArtistListState = {
    list: initialArtists ? JSON.parse(initialArtists) : [],
}

export const savedArtists = createSlice({
    name: 'savedArtists',
    initialState,
    reducers: {
        add: (state, action) => {
            state.list.push(action.payload)
        },
        remove: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
        empty: (state) => {
            state.list = [];
        }
    },
})

export const { add, remove, empty } = savedArtists.actions;

export default savedArtists.reducer;