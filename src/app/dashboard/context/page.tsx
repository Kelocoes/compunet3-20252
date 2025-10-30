"use client";
import { useState } from "react";
import ComponentA from "./_components/ComponentA";

export default function ContextPage() {
    console.info("Rendering Context Page");
    const [myState, setMyState] = useState(0);
    return (
        <div className="flex items-center justify-center min-h-screen text-black">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-gray-300">
                <div className="card-body">
                    <h2 className="card-title">Context Page</h2>
                    <p>Estado actual en Context Page: {myState}</p>
                    <button className="btn btn-primary mt-4 w-64" onClick={() => setMyState(myState + 1)}>
                        Incrementar Estado
                    </button>
                    <button className="btn btn-secondary mt-4 w-64" onClick={() => setMyState(myState - 1)}>
                        Decrementar Estado
                    </button>
                    <ComponentA myState={myState} setMyState={setMyState} />
                </div>
            </div>
        </div>
    );
}