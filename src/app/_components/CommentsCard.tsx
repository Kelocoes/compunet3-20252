interface CommentsCardProps {
    id: string;
    userid: number;
    content: string;
    date: string;
    username: string;
}

export default function CommentsCard({ id, userid, content, date, username }: CommentsCardProps) {
    const relativeDate = new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="card w-full bg-base-100 card-sm shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{username}</h2>
                <p className="text-sm">{content}</p>
                <p className="text-xs text-gray-500">Posted on {relativeDate}</p>
            </div>
        </div>
    );
}