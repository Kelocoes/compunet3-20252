"use client";

export default function CheckBox({ label, checked, onChange }: { label?: string; checked?: boolean; onChange?: (checked: boolean) => void }) {
    return (
        <label className="">
            <input
                type="checkbox"
                className=""
                checked={checked}
                onChange={(e) => onChange && onChange(e.target.checked)}
            />
            {label && <span className="text-gray-700">{label}</span>}
        </label>
    );
}