import React, { useState } from 'react';

const Slider = ({ min, max, step, onChange }) => {
    const [value, setValue] = useState(min);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                      background: `linear-gradient(to right, #4a5568 ${value}%, #2d3748 ${value}%)`
                }}
            />
            <div className="text-center mt-2">
                <span className="text-lg font-medium text-secondary">{value}</span>
            </div>
        </div>
    );
};

export default Slider;