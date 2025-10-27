"use client";
import React from "react";

export default function ZIndex({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-[100px] h-[50px]">
            {
                React.Children.map(children, (child, index) => (
                    <div
                        className="absolute"
                        style={{ zIndex: index, marginLeft: index * 30 }}
                    >
                        {child}
                    </div>
                ))
            }
        </div>
    );
}