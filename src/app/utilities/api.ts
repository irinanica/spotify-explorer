export const spotifyBaseUrl = 'https://api.spotify.com/v1';
export const spotifySearchUrl = `${spotifyBaseUrl}/search`;

export const fetchArtist = (artist: string, onSucceed: (response: any) => void) => {
    const params = {
        q: artist,
        type: 'artist',
    }

    const accessToken = localStorage.getItem('access_token');
    const searchUrl = `${spotifySearchUrl}?${new URLSearchParams(params)}`;
    if (!accessToken) {
        return;
    }

    return fetch(searchUrl, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })
        .then(response => response.json())
        .then(onSucceed)
        .catch(error => {
            throw new Error('Error finding artist', error);
        })
}

export const findSimilarArtists = (id: string) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return;
    }

    const url = `${spotifyBaseUrl}/artists/${id}/related-artists`;
    return fetch(url, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })
        .then(res => res.json())
        .catch(error => {
            throw new Error('Error finding similar artists', error);
        });
}

export const testArtist =
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2"
        },
        "followers": {
            "href": null,
            "total": 26679284
        },
        "genres": [
            "british invasion",
            "classic rock",
            "merseybeat",
            "psychedelic rock",
            "rock"
        ],
        "href": "https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2",
        "id": "3WrFJ7ztbogyGnTHbHJFl2",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5ebe9348cc01ff5d55971b22433",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174e9348cc01ff5d55971b22433",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178e9348cc01ff5d55971b22433",
                "width": 160
            }
        ],
        "name": "The Beatles",
        "popularity": 84,
        "type": "artist",
        "uri": "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2"
    }