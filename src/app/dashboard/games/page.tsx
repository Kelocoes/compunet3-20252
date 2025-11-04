import GameCard from "@/app/_components/GameCard";

export const dynamic = 'force-dynamic';

export default async function GamesPage() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`)
    const gamesList = await data.json();

    return (
        <div id="games-page" className="p-6 flex justify-center">
            <div id="games-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
                {gamesList.map((game: { id: number; name: string; genre: string, image: string }) => (
                    <GameCard key={game.id} {...game} />
                ))}
            </div>
        </div>
    );
}