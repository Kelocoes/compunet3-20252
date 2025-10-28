export default function CustomButton({ title, onClick }: { title?: string; onClick?: () => void }) {
    return (
        <button
            className=""
            onClick={onClick}
        >
            {title || "Click Me"}
        </button>
    );
}