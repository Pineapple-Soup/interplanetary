


export const planetParams = [
    {
        id: 9,
        type: 'dropdown',
        label: 'Stellar Effective Temperature',
        state: 'sTemp',
        options: [
            {value: 7200, label: "Class F - 7200K"},
            {value: 5700, label: "Class G - 5700K"},
            {value: 4800, label: "Class K - 4800K"},
            {value: 3800, label: "Class M - 3800K"}
        ],
        units: "Kelvin",
        info: "This is the temperature of the star's surface in Kelvin"
    },
    {
        id: 10,
        type: 'dropdown',
        label: 'Planet Type',
        state: 'pType',
        options: [
            {value: "Rocky", label: "Rocky"},
            {value: "Ice Giant", label: "Ice Giant"},
            {value: "Gas Giant", label: "Gas Giant"},
            {value: "Icy", label: "Icy"}
        ],
        units: '',
        info: "This is the type of planet you want to create."
    },
    {
        id: 1,
        type: 'slider',
        label: 'Planet Mass',
        state: 'pMass',
        min: 0,
        max: 60000,
        step: 100,
        info: "This is the mass of the planet in earth masses",
        units: "*10^22 kg"
    },
    {
        id: 2,
        type: 'slider',
        label: 'Planet Radius',
        state: 'pRadius',
        min: 0,
        max: 60000,
        step: 1,
        info : "This is the radius of the planet in Earth radii.",
        units: "*10^4 meters"
    },
    {
        id: 3,
        type: 'slider',
        label: 'Planet Orbital Period',
        state: 'pPeriod',
        min: 1,
        max: 50000,
        step: 1,
        info: "This is the orbital period of the planet in Earth days.",
        units: "Days",
    },
    { 
        id: 4,
        type: 'slider',
        label: 'Stellar Mass',
        state: 'sMass',
        min: 2,
        max: 20000,
        step: 1,
        info: "This is the mass of the star in Solar masses.",
        units: "*10^28 kg"
    },
    {
        id: 5,
        type: 'slider',
        label: 'Stellar Radius',
        state: 'sRadius',
        min: 7,
        max: 70000,
        step: 1,
        info: "This is the radius of the star in Solar radii.",
        units: "*10^6"
    },
    // {
    //     id: 6,
    //     type: 'slider',
    //     label: 'Stellar Effective Temperature',
    //     state: 'sTemp',
    //     min: 2000,
    //     max: 50000,
    //     step: 1,
    //     info: "This is the effective temperature of the star in Kelvin.",
    //     units: "Kelvin"
    // },
    {
        id: 7,
        type: 'slider',
        label: 'Planetary System Age',
        state: 'psAge',
        min: 0,
        max: 12,
        step: 1,
        info: "This is the age of the planetary system in billions of years.",
        units: "Billion Years"
    },
    {
        id: 8,
        type: 'slider',
        label: 'Stellar Luminosity',
        state: 'sLuminosity',
        min: 0,
        max: 100,
        step: 1,
        info: "This is the luminosity of the star in Solar luminosities.",
        units: "*10^24 W/m^2"
    },


    // {
    //     id: 9,
    //     type: 'slider',
    //     label: 'Stellar Flux',
    //     state: 'sFlux',
    //     min: 0,
    //     max: 15000,
    //     step: 1,
    //     info: "This is the flux of the star in Watts per meter squared.",
    //     units: "W/m^2"
    // }
]
