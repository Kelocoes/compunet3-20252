import type React from "react";
import ComponentB from "./ComponentB";

export default function ComponentA({ myState, setMyState }: { myState: number; setMyState: React.Dispatch<React.SetStateAction<number>> }) {
    console.info("Rendering Component A");
    return (
        <div className="card w-max bg-base-100 shadow-md border border-gray-300">
            <div className="card-body">
                <h2 className="card-title">Component A</h2>
                <p>Estado actual: {myState}</p>
                <p>Descripción breve de Component A.</p>
                <ComponentB myState={myState} setMyState={setMyState} />
            </div>
        </div>
    );
}