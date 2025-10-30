"use client";

import type React from "react";
import { useState } from "react";

export default function ComponentC({ myState, setMyState }: { myState: number; setMyState: React.Dispatch<React.SetStateAction<number>> }) {
    console.info("Rendering Component C");
    const [state, setState] = useState("Estado interno!");
    return (
        <div className="card w-max bg-base-100 shadow-md border border-gray-300">
            <div className="card-body">
                <h2 className="card-title">Component C</h2>
                <p>Estado actual: {myState}</p>
                <p>Descripción breve de Component C.</p>
                <p>Estado interno: {state}</p>
                <button className="btn btn-info mt-4 w-64" onClick={() => setState(state + "!")}>
                    Modificar Estado Interno
                </button>
                <button className="btn btn-success mt-4 w-64" onClick={() => setMyState(myState + 10)}>
                    Incrementar en 10
                </button>
                <button className="btn btn-warning mt-4 w-64" onClick={() => setMyState(myState - 10)}>
                    Decrementar en 10
                </button>
            </div>
        </div>
    );
}