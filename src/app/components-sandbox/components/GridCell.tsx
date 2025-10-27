type GridCellProps = {
    title?: string;
    children: React.ReactNode;
};

export default function GridCell({ title, children }: Readonly<GridCellProps>) {
    return (
        <div
            id="grid-cell"
            className="aspect-square border-gray-300 shadow-md rounded-3xl transition hover:scale-105 ease-in-out 
            hover:shadow-lg flex items-center p-4 bg-white flex-col">
            {title && <h3 className="text-lg font-semibold mb-2 text-gray-600">{title}</h3>}
            <div className="grow flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}