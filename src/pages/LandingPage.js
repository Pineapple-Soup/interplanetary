import React, { useState } from 'react';
import Slider from '../components/Slider';
import { planetParams } from '../data/sliders';

const LandingPage = () => {
    const [planetSize, setPlanetSize] = useState(50);
    const [planetColor, setPlanetColor] = useState(50);
    const [pMass, setPMass] = useState(50);
    const [pRadius, setPRadius] = useState(50);
    const [pPeriod, setPPeriod] = useState(50);
    const [sMass, setSMass] = useState(50);
    const [sRadius, setSRadius] = useState(50);
    const [sTemp, setSTemp] = useState(50);
    const [psAge, setPsAge] = useState(50);
    const [sLuminosity, setSLuminosity] = useState(50);
    const [sFlux, setSFlux] = useState(50);


    const stateSetters = {
        pMass: setPMass,
        pRadius: setPRadius,
        pPeriod: setPPeriod,
        sMass: setSMass,
        sRadius: setSRadius,
        sTemp: setSTemp,
        psAge: setPsAge,
        sLuminosity: setSLuminosity,
        sFlux: setSFlux
    };


    return (
        <div className="flex">
            <div className="w-1/4 p-4 border">
                <h2 className="text-xl font-bold mb-4">Build Your Planet</h2>
                {planetParams.map(slider => {
                    return <div key={slider.id} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{slider.label}</label>
                        <Slider min={slider.min} max={slider.max} step={slider.step} onChange={stateSetters[slider.state]} />
                    </div>
                })}

            </div>
            <div className="w-3/4 p-4">
                {/* Planet building canvas */}
            </div>
            <div className="w-1/4 p-4 border overflow-y-auto h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Planet Stats</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Planet Mass</label>
                        <span>{pMass}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;