import ComponentC from "./ComponentC";

export default function ComponentB() {
    console.info("Rendering Component B");
    return (
        <div className="card w-max bg-base-100 shadow-md border border-gray-300">
            <div className="card-body">
                <h2 className="card-title">Component B</h2>
                <p>Descripción breve de Component B.</p>
                <ComponentC />
            </div>
        </div>
    );
}