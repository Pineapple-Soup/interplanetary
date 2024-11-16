import constants
import math


class SEPHI:
    def __init__(self, planet_mass, planet_radius, stellar_mass, stellar_radius, stellar_effective_temperature, planetary_system_age, angular_frequency) -> None:
        self.planet_mass = planet_mass
        self.planet_radius = planet_radius
        self. stellar_mass = stellar_mass
        self.stellar_radius = stellar_radius
        self.stellar_effective_temperature = stellar_effective_temperature
        self.planetary_system_age = planetary_system_age
        self.angular_frequency = angular_frequency
        relative_mass = planet_mass / constants.EARTH_MASS


    def calculate_L4(self):
        density = self.relative_mass / ((4 / 3 * math.pi) * (self.planet_radius ** 3))
        density = density ** (1/2)
        mag_radius = self.planet_radius ** (7 / 2)
        mag_field = density * mag_radius * self.angular_frequency
        return mag_field
