

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
        ]
    },
    {
        id: 10,
        type: 'dropdown',
        label: 'Planet Type',
        state: 'pType',
        options: [
            {value: 1, label: "Rocky"},
            {value: 2, label: "Ice Giant"},
            {value: 3, label: "Gas Giant"},
            {value: 4, label: "Icy"}
        ]
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
        units: "Earths"
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
        units: "Earth Radii"
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
        info: "This is the mass of the star in Solar masses."
    },
    {
        id: 5,
        type: 'slider',
        label: 'Stellar Radius',
        state: 'sRadius',
        min: 7,
        max: 70000,
        step: 1,
        info: "This is the radius of the star in Solar radii."
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
        info: "This is the age of the planetary system in billions of years."
    },
    {
        id: 8,
        type: 'slider',
        label: 'Stellar Luminosity',
        state: 'sLuminosity',
        min: 0,
        max: 100,
        step: 1,
        info: "This is the luminosity of the star in Solar luminosities."
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

// dropdowns
export const planetParams2 = [
    {
        id: 1,
        label: 'Stellar Effective Temperature',
        options: ["Class F - 7200K", "Class G - 5700K", "Class K - 4800K", "Class M - 3800K"]
    },
    {
        id: 2,
        label: 'Planet Type',
        options: ["Rocky", "Ice Giant", "Gas Giant", "Icey"],
    }
]