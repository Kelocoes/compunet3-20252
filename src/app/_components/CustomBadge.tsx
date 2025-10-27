export default function CustomBadge({ badgeContent, children }: { badgeContent?: number; children: React.ReactNode }) {
    return (
        <div className="relative">
            {children}
            <span
                className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-semibold rounded-full z-1"
            >
                {badgeContent !== undefined ? badgeContent : "!"}
            </span>
        </div>
    );
}