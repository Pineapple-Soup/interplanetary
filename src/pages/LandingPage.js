import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';
import Dropdown from '../components/Dropdown';
import { planetParams } from '../data/planetParameters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'flowbite';

const PLANET_POST_URL = '';


const LandingPage = () => {
    const [pType, setPType] = useState(7200);
    const [sTemp, setSTemp] = useState(1);
    const [pMass, setPMass] = useState(0);
    const [pRadius, setPRadius] = useState(0);
    const [pPeriod, setPPeriod] = useState(1);
    const [sMass, setSMass] = useState(2);
    const [sRadius, setSRadius] = useState(7);
    const [psAge, setPsAge] = useState(0);
    const [sLuminosity, setSLuminosity] = useState(0);
    // const [sFlux, setSFlux] = useState();


    const navigate = useNavigate();


    const stateSetters = {
        sTemp: setSTemp,
        pType: setPType,
        pMass: setPMass,
        pRadius: setPRadius,
        pPeriod: setPPeriod,
        sMass: setSMass,
        sRadius: setSRadius,
        psAge: setPsAge,
        sLuminosity: setSLuminosity,
        // sFlux: setSFlux,

    };

    const handleSubmit = async () => {
        const params = {
            pType,
            sTemp,
            pMass,
            pRadius,
            pPeriod,
            sMass,
            sRadius,
            psAge,
            sLuminosity,
            // sFlux,
        };
        console.log(JSON.stringify(params));
        navigate('/calculate');

        // try {
        //     const response = await fetch(PLANET_POST_URL, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(params),
        //      })
        //      const result = await response.json();

        //      navigate('/calculate', {state: {result}});
        // } catch(e) {
        //     console.error("error sending data to the server", e);
        // }

    }



    return (
        <div className="flex bg-primary p-8 rounded-lg shadow-lg">
            <div className="w-1/4 p-4 border border-highlight rounded-lg bg-tertiary">
                <h2 className="text-xl font-bold mb-4 text-secondary">Build Your Planet</h2>
                {planetParams.map(param => (
                    <div key={param.id} className="mb-4 relative group">
                        <label className="block text-sm font-medium text-secondary">
                            {param.label}
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="ml-2 text-highlight cursor-pointer"
                                data-tooltip-target={`tooltip-${param.id}`}
                            />
                            <div id={`tooltip-${param.id}`} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                                {param.info}
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </label>
                        {param.type === 'slider' ? (
                            <Slider min={param.min} max={param.max} step={param.step} onChange={stateSetters[param.state]} />
                        ) : (
                            <Dropdown options={param.options} onChange={stateSetters[param.state]} />
                        )}
                    </div>
                ))}

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
                                return (
                                    <div key={p.id} className="flex justify-between items-center mb-2 p-2 bg-primary rounded-lg shadow-sm">
                                        <span className="text-sm font-medium text-highlight">{p.label}:</span>
                                        <span className="text-sm font-medium text-secondary">{eval(p.state)}</span>
                                    </div>
                                );
                            })}

                        </div>
                        <button 
                            type="button"
                            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >Make My Planet</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;