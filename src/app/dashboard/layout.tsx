"use client";

import { useRouter } from "next/navigation";
import NavBar from "../_components/NavBar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [hasToken, setHasToken] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/sign-in");
        } else {
            setHasToken(true);
        }
    }, [router]);

    return (
        <div id="dashboard-layout" className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="flex justify-center mt-6">
                {hasToken ? children : <p>Please log in to view this content.</p>}
            </div>
        </div>
    );
}
