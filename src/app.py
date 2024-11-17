from flask import Flask, request
from sephi import SEPHI, PlanetType  # Replace `your_script_name` with the filename of your SEPHI class implementation
import constants  # Ensure constants is correctly defined

app = Flask(__name__)

@app.route('/calculate_sephi', methods=['POST'])
def calculate_sephi():
    try:
        # Parse JSON input
        data = request.json  # Ensure `data` is assigned correctly
        
        # Extract required fields
        required_fields = [
            "planet_mass", "planet_radius", "stellar_mass", "stellar_radius",
            "stellar_effective_temperature", "planetary_system_age", "orbital_period",
            "stellar_luminosity", "planet_type"
        ]

        if not all(field in data for field in required_fields):
            print(data)  # Correct way to check keys
            return "Missing required fields", 400

        # Instantiate SEPHI with input data
        sephi_instance = SEPHI(
            planet_mass=data["planet_mass"],  # Accessing keys correctly
            planet_radius=data["planet_radius"],
            stellar_mass=data["stellar_mass"],
            stellar_radius=data["stellar_radius"],
            stellar_effective_temperature=data["stellar_effective_temperature"],
            planetary_system_age=data["planetary_system_age"],
            orbital_period=data["orbital_period"],
            stellar_luminosity=data["stellar_luminosity"],
            planet_type=PlanetType[data["planet_type"].upper()],  # Accessing keys correctly
        )

        # Calculate SEPHI
        sephi_value = sephi_instance.calculate_sephi()

        # Return the SEPHI value as plain text
        return str(sephi_value)

    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)