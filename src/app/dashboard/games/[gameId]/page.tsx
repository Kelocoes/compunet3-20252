import CommentsCard from "@/app/_components/CommentsCard";

export const dynamic = 'force-dynamic';

export default async function GameDetailsPage({ params }: { params: Promise<{ gameId: string }> }) {
    const { gameId } = await params;
    const data = await fetch(`http://localhost:3000/api/games/${gameId}`);
    const game = await data.json();
    const commentsData = await fetch(`http://localhost:3000/api/games/${gameId}/comments`);
    const comments = await commentsData.json();
    return (
        <div className="hero bg-base-200 min-h-screen text-black flex flex-col items-center justify-start p-8 max-w-4xl">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={game.image}
                    alt={game.title}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">{game.title}</h1>
                    <p className="py-6">{game.description}</p>
                    <button className="btn btn-primary">Play Now</button>
                </div>
            </div>
            <div className="mt-10 w-full flex flex-col">
                <h2 className="text-3xl font-bold mb-4">Comments</h2>
                <div className="space-y-4">
                    {comments.map((comment: { id: string; userid: number; content: string; date: string, username: string }) => (
                        <CommentsCard key={comment.id} {...comment}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
