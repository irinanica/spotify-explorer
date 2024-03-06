import { createSlice } from '@reduxjs/toolkit'
import { Artist } from "@/app/components/artist-card/ArtistCard";

export interface SearchedArtistsState {
    list: Artist[];
}

const initialState: SearchedArtistsState = {
    list: [],
}

export const searchedArtists = createSlice({
    name: 'searchedArtists',
    initialState,
    reducers: {
        update: (state, action) => {
            state.list = action.payload
        },
    },
})

export const { update } = searchedArtists.actions;

export default searchedArtists.reducer;