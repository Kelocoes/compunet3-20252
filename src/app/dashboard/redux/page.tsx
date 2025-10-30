"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ComponentA from "./_components/ComponentA";
import { decrement, increment } from "@/lib/feature/myState/stateSlice";
import { setAlert } from "@/lib/feature/alert/alertSlice";

export default function ContextPage() {
    console.info("Rendering Context Page");
    const myState = useAppSelector(state => state.myState.value);
    const dispatch = useAppDispatch();
    return (
        <div className="flex items-center justify-center min-h-screen text-black">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-gray-300">
                <div className="card-body">
                    <button className="btn btn-ghost btn-sm absolute top-4 right-4" onClick={() => dispatch(setAlert("This is a Redux Alert!"))}>
                        Alert!
                    </button>
                    <h2 className="card-title">Redux Page</h2>
                    <p>Estado actual en Context Page: {myState}</p>
                    <button className="btn btn-primary mt-4 w-64" onClick={() => dispatch(increment())}>
                        Incrementar Estado
                    </button>
                    <button className="btn btn-secondary mt-4 w-64" onClick={() => dispatch(decrement())}>
                        Decrementar Estado
                    </button>
                    <ComponentA />
                </div>
            </div>
        </div>
    );
}