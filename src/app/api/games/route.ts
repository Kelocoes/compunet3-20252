export async function GET(request: Request) {
    const games = [
        { id: 1, name: "Catan", genre: "Strategy", image: "https://cf.geekdo-images.com/0XODRpReiZBFUffEcqT5-Q__itemrep@2x/img/81lS9PRn2JwyE4br1l7Z5fgSyFo=/fit-in/492x600/filters:strip_icc()/pic9156909.png" },
        { id: 2, name: "Monopoly", genre: "Board", image: "https://cf.geekdo-images.com/4BrenjlkNDKxWgntJouTpQ__itemrep@2x/img/dz-phn-lXUwqrwCF6jthBcWzMyU=/fit-in/492x600/filters:strip_icc()/pic2007865.jpg" },
        { id: 3, name: "Chess", genre: "Classic", image: "https://cf.geekdo-images.com/0_RWFMNapgr5yCrdhvGi_Q__itemrep@2x/img/dF65ixtsL8DCBab1acUS71fBauo=/fit-in/492x600/filters:strip_icc()/pic8785991.jpg" },
    ];
    return Response.json(games);
}