export default function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute top-full mt-2 p-1 w-max max-w-xs bg-gray-500 text-white text-sm rounded-md shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {text}
            </div>
        </div>
    );
}