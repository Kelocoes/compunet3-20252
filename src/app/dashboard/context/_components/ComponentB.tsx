import type React from "react";
import ComponentC from "./ComponentC";

export default function ComponentB({ myState, setMyState }: { myState: number; setMyState: React.Dispatch<React.SetStateAction<number>> }) {
    console.info("Rendering Component B");
    return (
        <div className="card w-max bg-base-100 shadow-md border border-gray-300">
            <div className="card-body">
                <h2 className="card-title">Component B</h2>
                <p>Estado actual: {myState}</p>
                <p>Descripción breve de Component B.</p>
                <ComponentC myState={myState} setMyState={setMyState} />
            </div>
        </div>
    );
}