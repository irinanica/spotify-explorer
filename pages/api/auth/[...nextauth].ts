import NextAuth, {AuthOptions} from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
// @ts-ignore
import {Account, CallbacksOptions, Session, User} from "next-auth/src/core/types";
// @ts-ignore
import {JWT} from "next-auth/src/jwt";

export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async jwt(token: JWT, account: Account) {
            if (account) {
                token.id = account.id
                token.accessToken = account.accessToken
            }
            return token
        },
        async session(session: Session, user: User) {
            session.user = user
            return session
        }
    } as Partial<CallbacksOptions>,
}

export default NextAuth(authOptions as AuthOptions);