"use client";
import { decrementByAmount, incrementByAmount } from "@/lib/feature/myState/stateSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function ComponentC() {
    console.info("Rendering Component C");
    const myState = useAppSelector(state => state.myState.value);
    const dispatch = useAppDispatch();

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
                <button className="btn btn-success mt-4 w-64" onClick={() => dispatch(incrementByAmount(10))}>
                    Incrementar en 10
                </button>
                <button className="btn btn-warning mt-4 w-64" onClick={() => dispatch(decrementByAmount(10))}>
                    Decrementar en 10
                </button>
            </div>
        </div>
    );
}