export async function GET(request: Request, { params }: { params: Promise<{ gameId: string }> }) {
    const { gameId } = await params;
    const games = [
        {
            id: 1,
            title: "Catan",
            category: "Strategy",
            image: "https://cf.geekdo-images.com/0XODRpReiZBFUffEcqT5-Q__itemrep@2x/img/81lS9PRn2JwyE4br1l7Z5fgSyFo=/fit-in/492x600/filters:strip_icc()/pic9156909.png",
            description: "A popular strategy board game where players collect resources and build settlements to earn points."
        },
        {
            id: 2,
            title: "Monopoly",
            category: "Board",
            image: "https://cf.geekdo-images.com/4BrenjlkNDKxWgntJouTpQ__itemrep@2x/img/dz-phn-lXUwqrwCF6jthBcWzMyU=/fit-in/492x600/filters:strip_icc()/pic2007865.jpg",
            description: "A classic board game about property trading and building monopolies to bankrupt opponents."
        },
        {
            id: 3,
            title: "Chess",
            category: "Classic",
            image: "https://cf.geekdo-images.com/0_RWFMNapgr5yCrdhvGi_Q__itemrep@2x/img/dF65ixtsL8DCBab1acUS71fBauo=/fit-in/492x600/filters:strip_icc()/pic8785991.jpg",
            description: "A two-player abstract strategy game played on a checkered board with the objective of checkmating the opponent's king."
        },
    ];
    const game = games.find(g => g.id === parseInt(gameId));
    if (game) {
        return Response.json(game);
    } else {
        return new Response("Game not found", { status: 404 });
    }
}