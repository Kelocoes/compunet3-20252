export default function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
    return (
        <div className="">
            {children}
            <div className="">
                {text}
            </div>
        </div>
    );
}