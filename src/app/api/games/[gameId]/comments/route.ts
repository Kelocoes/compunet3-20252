export async function GET(request: Request, { params }: { params: Promise<{ gameId: string }> }) {
    const { gameId } = await params;
    const games = [
        {
            id: '1',
            comments: [
                { id: '1', userid: 1, username: 'Carlos Mendoza', content: 'Great game!', date: '2025-02-01T12:00:00Z' },
                { id: '2', userid: 2, username: 'Ana García', content: 'Loved the graphics.', date: '2025-02-02T15:30:00Z' },
            ],
        },
        {
            id: '2',
            comments: [
                { id: '3', userid: 1, username: 'Carlos Mendoza', content: 'Not my type.', date: '2025-02-03T09:45:00Z' },
                { id: '4', userid: 3, username: 'Luis Rodríguez', content: 'Could be better.', date: '2025-02-04T18:20:00Z' },
            ],
        },
        {
            id: '3',
            comments: [
                { id: '5', userid: 2, username: 'Ana García', content: 'Amazing gameplay!', date: '2025-02-05T11:10:00Z' },
                { id: '6', userid: 1, username: 'Carlos Mendoza', content: 'Highly recommend.', date: '2025-02-06T20:00:00Z' },
            ],
        },
    ];
    const gameComments = games.find(g => g.id === gameId)?.comments;
    if (gameComments) {
        return Response.json(gameComments);
    } else {
        return new Response("Comments not found", { status: 404 });
    }
}