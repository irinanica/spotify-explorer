import { configureStore } from '@reduxjs/toolkit';
import savedArtistsReducer from './features/savedArtists/saved-artists';
import searchedArtistsReducer from "@/lib/features/searchedArtists/searched-artists";

export const savedArtistsStore = () => {
    return configureStore({
        reducer: {
            savedArtists: savedArtistsReducer,
            searchedArtists: searchedArtistsReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof configureStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];