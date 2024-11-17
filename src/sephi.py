import constants
import math
from enum import Enum

# TODO: Add docstrings to the class and its methods

class PlanetType(Enum):
    ROCKY = 1   
    ICY = 2
    ICE_GIANT = 3
    GAS_GIANT = 4

class EffectiveTemperature(Enum):
    M = 3800
    K = 4800
    G = 5700
    F = 7200

class SEPHI:
    def __init__(self, planet_mass, planet_radius, stellar_mass, stellar_effective_temperature, orbital_period, stellar_luminosity, planet_type) -> None:
        self.planet_mass = planet_mass
        self.planet_radius = planet_radius
        self.stellar_mass = stellar_mass 
        self.stellar_effective_temperature = stellar_effective_temperature
        self.orbital_period = orbital_period #in days
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
    
    def get_orbital_period_in_seconds(self):
        return self.orbital_period * 24 * 60 * 60
    
    def calculate_semi_major_axis(self):
        return math.cbrt(((self.get_orbital_period_in_seconds()**2) * constants.GRAVITATIONAL_CONSTANT * self.stellar_mass) / (4 * (math.pi**2)))
    
    def calculate_semi_major_axis_relative(self):
        return self.calculate_semi_major_axis() / constants.EARTH_SEMI_MAJOR_AXIS

    def get_density(self):
        return self.planet_mass / ((4 / 3) * math.pi * self.planet_radius**3)
    
    def get_relative_luminosity(self):
        return self.stellar_luminosity / constants.SOLAR_LUMINOSITY

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
        sigma2_1 = 1/3
        sigma2_2 = (8.66 - 1) / 3
        if escape_velocity_relative < 1:
            return math.exp(-0.5 * (((escape_velocity_relative - 1)/sigma2_1) ** 2))
        else:
            return math.exp(-0.5 * (((escape_velocity_relative - 1)/sigma2_2) ** 2))

    def calculate_L3(self):
        effective_temperature = self.stellar_effective_temperature.value
        S1 = 1.7753 + (1.4316e-4*(effective_temperature - 5780)) + (2.9875e-9*(effective_temperature - 5780)**2) + ((-7.5702e-12) * (effective_temperature - 5780)**3) + ((-1.1635e-15) * (effective_temperature - 5780)**4)
        S2 = 1.0512 + (1.3242e-4*(effective_temperature - 5780)) + (1.5418e-8*(effective_temperature - 5780)**2) + ((-7.9895e-12) * (effective_temperature - 5780)**3) + ((-1.8328e-16) * (effective_temperature - 5780)**4)
        S3 = 0.3438 + (5.8942e-4*(effective_temperature - 5780)) + (1.6558e-9*(effective_temperature - 5780)**2) + ((-3.0045e-12) * (effective_temperature - 5780)**3) + ((-5.2983e-16) * (effective_temperature - 5780)**4)
        S4 = 0.3179 + (5.4513e-5*(effective_temperature - 5780)) + (1.5313e-9*(effective_temperature - 5780)**2) + ((-2.7786e-12) * (effective_temperature - 5780)**3) + ((-4.8997e-16) * (effective_temperature - 5780)**4)
        D1 = math.sqrt(self.get_relative_luminosity() / S1)
        D2 = math.sqrt(self.get_relative_luminosity() / S2)
        D3 = math.sqrt(self.get_relative_luminosity() / S3)
        D4 = math.sqrt(self.get_relative_luminosity() / S4)
        a = self.calculate_semi_major_axis_relative()
        mu3_1 = D2
        sigma3_1 = (D2 - D1) / 3
        mu3_2 = D3
        sigma3_2 = (D4 - D3) / 3
        if a < D2:
            return math.exp(-0.5 * (((a - mu3_1) / sigma3_1) ** 2))
        elif D2 <= a and a <= D3:
            return 1
        else:
            return math.exp(-0.5 * (((a - mu3_2) / sigma3_2) ** 2))   

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

        # print("L1: ", L1)
        # print("L2: ", L2)
        # print("L3: ", L3)
        # print("L4: ", L4)

        # print("L1 * L2 * L3 * L4: ", L1 * L2 * L3 * L4)
        return (L1 * L2 * L3 * L4) ** (1/4)

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