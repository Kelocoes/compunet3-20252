import ComponentB from "./ComponentB";

export default function ComponentA() {
    console.info("Rendering Component A");
    return (
        <div className="card w-max bg-base-100 shadow-md border border-gray-300">
            <div className="card-body">
                <h2 className="card-title">Component A</h2>
                <p>Descripción breve de Component A.</p>
                <ComponentB />
            </div>
        </div>
    );
}