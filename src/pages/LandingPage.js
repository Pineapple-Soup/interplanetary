import React, { useState } from 'react';
import Slider from '../components/Slider';
import { planetParams } from '../data/planetParameters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const LandingPage = () => {
    const [pMass, setPMass] = useState(50);
    const [pRadius, setPRadius] = useState(50);
    const [pPeriod, setPPeriod] = useState(50);
    const [sMass, setSMass] = useState(50);
    const [sRadius, setSRadius] = useState(50);
    const [sTemp, setSTemp] = useState(50);
    const [psAge, setPsAge] = useState(50);
    const [sLuminosity, setSLuminosity] = useState(50);
    const [sFlux, setSFlux] = useState(50);

    const [infoPopup, setInfoPopup] = useState(null);


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


    const handleInfoClick = (info) => {
        setInfoPopup(info);
    };

    const closePopup = () => {
        setInfoPopup(null);
    };


    return (
        <div className="flex bg-primary p-8 rounded-lg shadow-lg">
            <div className="w-1/4 p-4 border border-highlight rounded-lg bg-tertiary">
                <h2 className="text-xl font-bold mb-4 text-secondary">Build Your Planet</h2>
                {planetParams.map(slider => {
                    return <div key={slider.id} className="mb-4">
                        <div className="block text-sm font-medium text-secondary">
                            {slider.label}
                            <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    className="ml-2 text-highlight cursor-pointer"
                                    onClick={() => handleInfoClick(slider.info)}
                                />
                        </div>
                        <Slider min={slider.min} max={slider.max} step={slider.step} onChange={stateSetters[slider.state]} />
                    </div>
                })}
            </div>
            <div className="w-3/4 p-4">
                {/* Planet building canvas */}
            </div>
            <div className="w-1/4 p-4 border border-highlight rounded-lg bg-tertiary overflow-y-auto h-screen">
                <div className="text-center">
                    <h2 className="text-xl text-secondary font-bold mb-4">Planet Stats</h2>
                    <div className="mb-4">
                        <div className="block text-sm font-medium text-secondary text-left">
                            {planetParams.map(p => {
                                return <p key={p.id}>{p.label}: {eval(p.state)}</p>
                            })}

                        </div>
                    </div>
                </div>
            </div>
            {infoPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-2">Parameter Info</h3>
                        <p>{infoPopup}</p>
                        <button
                            className="mt-4 bg-primary text-white px-4 py-2 rounded"
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;