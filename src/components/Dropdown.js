import React from 'react';

const Dropdown = ({ options, onChange }) => {
    return (
        <select
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-primary text-secondary"
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;