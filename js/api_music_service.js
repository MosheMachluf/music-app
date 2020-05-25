// הגדרנו פונקציה כאנסנכרונית
export const doRestApi = async (queryS = "omer") => {
    let myUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?rapidapi-key=0553c29e4bmsh3a239d5a07dbdb4p1e9ae1jsnc9399dacde13&q=${queryS}`;
    let resp = await fetch(myUrl);
    let data = await resp.json();

    return data.data;
}

// export const playlist = async (_id_album) => {
//     let myUrl = `https://api.deezer.com/album/${_id_album}/tracks`;
//     let resp = await fetch(myUrl);
//     let data = await resp.json();

//     return data.data;
// }