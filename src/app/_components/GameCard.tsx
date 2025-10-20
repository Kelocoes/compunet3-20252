import Link from "next/link";

interface GameCardProps {
    id: number;
    name: string;
    genre: string;
    image: string;
}

export default function GameCard({ id, name, genre, image }: GameCardProps) {
    return (
        <div className="card bg-base-100 w-96 shadow-lg hover:scale-105 transition-transform duration-300 pt-4">
            <figure>
                <img
                    src={image}
                    alt={name}
                    className="h-64 w-64 object-fill"
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">{name}</h2>
                    <div className="badge badge-outline">{genre}</div>
                </div>
                <div className="card-actions justify-end items-center">
                    <Link href={`/dashboard/games/${id}`} className="btn btn-primary rounded-lg btn-sm">View Details</Link>
                </div>
            </div>
        </div>
    );
}