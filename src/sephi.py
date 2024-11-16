import constants
import math
<<<<<<< HEAD


=======
>>>>>>> 18aabc29d1178f3bd37c01643917d69981c48dbd
class SEPHI:
    def __init__(self, planet_mass, planet_radius, stellar_mass, stellar_radius, stellar_effective_temperature, planetary_system_age, angular_frequency) -> None:
        self.planet_mass = planet_mass
        self.planet_radius = planet_radius
        self. stellar_mass = stellar_mass
        self.stellar_radius = stellar_radius
        self.stellar_effective_temperature = stellar_effective_temperature
        self.planetary_system_age = planetary_system_age
<<<<<<< HEAD
        self.angular_frequency = angular_frequency
        relative_mass = planet_mass / constants.EARTH_MASS


    def calculate_L4(self):
        density = self.relative_mass / ((4 / 3 * math.pi) * (self.planet_radius ** 3))
        density = density ** (1/2)
        mag_radius = self.planet_radius ** (7 / 2)
        mag_field = density * mag_radius * self.angular_frequency
        return mag_field
=======
    
    def get_relative_mass(self):
        return self.planet_mass / constants.EARTH_MASS
    
    def get_relative_radius(self):
        return self.planet_radius / constants.EARTH_RADIUS

    def calculate_L1(self):
        relative_mass = self.get_relative_mass()
        relative_radius = self.get_relative_radius()
        mu1 = math.cbrt(3 * relative_mass)/(constants.ENSTATITE_DENSITY * math.pi * 4)
        half_density = 0.5 * constants.WATER_DENSITY + 0.5 * constants.ENSTATITE_DENSITY
        mu2 = math.cbrt(3 * relative_mass)/(half_density * math.pi * 4)
        sigma1 = (mu2 - mu1) / 3
        if relative_mass <= mu1:
            return 1
        elif mu2 <= relative_mass:
            return 0
        else:
            return math.exp(-0.5 * ((relative_radius - mu1)/sigma1)**2)
>>>>>>> 18aabc29d1178f3bd37c01643917d69981c48dbd
