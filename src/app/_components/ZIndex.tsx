"use client";
import React from "react";

export default function ZIndex({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {
                React.Children.map(children, (child, index) => (
                    <div
                        className=""
                        style={{ zIndex: index, marginLeft: index * 30 }}
                    >
                        {child}
                    </div>
                ))
            }
        </div>
    );
}