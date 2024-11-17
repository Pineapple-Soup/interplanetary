import constants
import math
from enum import Enum

# TODO: Add docstrings to the class and its methods

class PlanetType(Enum):
    ROCKY = 1   
    ICY = 2
    ICE_GIANT = 3
    GAS_GIANT = 4

class SEPHI:
    def __init__(self, planet_mass, planet_radius, stellar_mass, stellar_radius, stellar_effective_temperature, planetary_system_age, orbital_period, stellar_luminosity, planet_type) -> None:
        self.planet_mass = planet_mass
        self.planet_radius = planet_radius
        self.stellar_mass = stellar_mass
        self.stellar_radius = stellar_radius
        self.stellar_effective_temperature = stellar_effective_temperature
        self.planetary_system_age = planetary_system_age    
        self.orbital_period = orbital_period
        self.stellar_luminosity = stellar_luminosity
        self.planet_type = planet_type

    
    def get_relative_mass(self):
        return self.planet_mass / constants.EARTH_MASS 
    
    def get_relative_radius(self):
        return self.planet_radius / constants.EARTH_RADIUS
    
    def get_planet_surface_gravity(self):
        return constants.GRAVITATIONAL_CONSTANT * self.planet_mass / self.planet_radius**2
    
    def get_relative_gravity(self):
        return self.get_planet_surface_gravity() / constants.EARTH_GRAVITY
    
    def get_angular_frequency(self):
        return 2 * math.pi / self.orbital_period
    
    def get_density(self):
        return self.planet_mass / ((4 / 3) * math.pi * self.planet_radius**3)

    def calculate_L1(self):
        relative_mass = self.get_relative_mass()
        relative_radius = self.get_relative_radius()
        mu1 = math.cbrt((3 * self.planet_mass)/(constants.ENSTATITE_DENSITY * math.pi * 4))
        half_density = 0.5 * (constants.WATER_DENSITY +constants.ENSTATITE_DENSITY)
        mu2 = math.cbrt((3 * self.planet_mass)/(half_density * math.pi * 4))
        sigma1 = (mu2 - mu1) / 3
        print("mu1: ", mu1)
        if relative_radius <= mu1:
            print("returning 1")
            return 1
        elif mu2 <= relative_radius:
            print("mu2: ", mu2)
            print ("relative_radius: ", self.planet_radius)
            print("returning 0")
            return 0
        else:
            print("this is corrct please be here")
            return math.exp(-0.5 * ((relative_radius - mu1)/sigma1)**2)

    def calculate_L2(self):
        g_relative = self.get_relative_gravity()
        r_relative = self.get_relative_radius()
        escape_velocity_relative = math.sqrt(2 * g_relative * r_relative)
        sigma_21 = 1/3
        sigma_22 = (8.66 - 1) / 3
        if escape_velocity_relative < 1:
            return math.exp(-0.5 * ((escape_velocity_relative - 1)/sigma_21) ** 2)
        else:
            return math.exp(-0.5 * ((escape_velocity_relative - 1)/sigma_22) ** 2)

    def calculate_L3(self):
        return 1

    def calculate_L4(self):
        density, r, F = 0, 0, 0
        alpha = 1
        sigma4 = 1/3
        if self.planet_type == PlanetType.ROCKY:
            density = 1
            r =  self.get_relative_radius()
            F = self.get_relative_radius()
        elif self.planet_type == PlanetType.ICY:
            density = 0.45
            r = 1.8 * self.get_relative_radius()
            F = 4 * self.get_relative_radius()
        elif self.planet_type == PlanetType.ICE_GIANT:
            density = 0.18
            r = 4.5 * self.planet_radius / constants.NEPTUNE_RADIUS
            F = 20 * self.planet_radius / constants.NEPTUNE_RADIUS
        elif self.planet_type == PlanetType.GAS_GIANT:
            density = 0.16
            r = 16 * (self.planet_radius / constants.JUPITER_RADIUS) * (self.planet_mass / constants.JUPITER_MASS)
            F = 100 * (self.planet_radius / constants.JUPITER_RADIUS) * (self.planet_mass / constants.JUPITER_MASS)
        magnetic_moment_relative = alpha * math.sqrt(density) * (r ** (10/3)) * math.cbrt(F)
        return math.exp(-0.5 * ((magnetic_moment_relative - 1)/sigma4)**2) if (magnetic_moment_relative < 1) else 1

    def calculate_sephi(self):
        L1 = self.calculate_L1()
        L2 = self.calculate_L2()
        L3 = self.calculate_L3()
        L4 = self.calculate_L4()

        print("L1: ", L1)
        print("L2: ", L2)
        print("L3: ", L3)
        print("L4: ", L4)

        print("L1 * L2 * L3 * L4: ", L1 * L2 * L3 * L4)
        return L1 * L2 * L3 * L4

def __main__():
    earth_sephi = SEPHI(
    planet_mass= 5.972e24,
    planet_radius= 6371e3,
    stellar_mass=1.989e30,
    stellar_radius=6.957e8,
    stellar_effective_temperature= 5778,
    planetary_system_age=4.5e9,
    orbital_period=365.25,  # Earth's orbital period
    stellar_luminosity= 3.828e26,
    planet_type="ROCKY"  # Earth is a rocky planet
    )

    print("earth:", earth_sephi.calculate_sephi())

if __name__ == "__main__":
    __main__()