export default function CustomButton({ title, onClick }: { title?: string; onClick?: () => void }) {
    return (
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition
            ease-in-out transform hover:scale-103 active:scale-100 will-change-transform cursor-pointer"
            onClick={onClick}
        >
            {title || "Click Me"}
        </button>
    );
}