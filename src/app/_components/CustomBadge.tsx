export default function CustomBadge({ badgeContent, children }: { badgeContent?: number; children: React.ReactNode }) {
    return (
        <div className="relative">
            {children}
            <span
                className=""
            >
                {badgeContent !== undefined ? badgeContent : "!"}
            </span>
        </div>
    );
}