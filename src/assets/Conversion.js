// Unit Conversion Class
class Conversion {
    constructor() {
        this.units = {
            "length": {
                "kilometer": 0.001,
                "meter": 1,
                "centimeter": 100,
                "milimeter": 1000,
                "micrometer": 1000000,
                "nanometer": 1000000000,
                "mile": 0.000621371,
                "yard": 1.09361,
                "foot": 3.28084,
                "inch": 39.3701,
                "light year": 1.057e-16,


            },
            "temperature": {
                "C": 1,
                "F": 33.8,
                "K": 274.5,
            },
            "area": {
                'square-kilometer': 0.000001,
                'square-meter': 1,
                'square-centimeter': 10000,
                'square-milimeter': 1000000,
                'square-micrometer': 1000000000000,
                'hectare': 0.0001,
                'square-mile': 3.861e-7,
                'square-yard': 1.19599,
                'square-foot': 10.7639,
                'square-inch': 1550,
                'acre': 0.000247105,

            },
            "volume": {
                'cubic-kilometer': 1e-15,
                'cubic-meter': 1,
                'cubic-centimeter': 1000000,
                'cubic-milimeter': 1000000000,
                'liter': 1000,
                'milliliter': 1000000,
                'gallon': 264.172,
                'quart': 1056.69,
                'pint': 2113.38,
                'cup': 4226.75,
                'fluid-ounce': 33814,
                'tablespoon': 67628.1,
                'teaspoon': 202884,
                'imperial-gallon': 219.969,
                'imperial-quart': 879.877,
                'imperial-pint': 1759.75,
                'imperial-cup': 3519.51,
                'imperial-fluid-ounce': 35195.1,
                'imperial-tablespoon': 56312.2,
                'imperial-teaspoon': 168936,
                'cubic-mile': 2.3991e-10,
                'cubic-yard': 1.30795,
                'cubic-foot': 35.3147,
                'cubic-inch': 61023.7,
            },
            "weight": {
                'kilogram': 1,
                'gram': 1000,
                'miligram': 1000000,
                'metric-ton': 0.001,
                'long-ton': 0.000984207,
                'short-ton': 0.00110231,
                'pound': 2.20462,
                'ounce': 35.274,
                'carrat': 5000,
                'atomic-mass-unit': 6.022e+26,
            },

        
        
        }

    }
    // Convert function
    convert(value, from, to, type) {
        // Check if the units are the same
        if (from === to) {
            // If they are the same, return the value
            return value;
        }
        // Convert the value to base unit
    const valueInBaseUnit = value / this.units[type][from];
    // Convert the value to the target unit
    const convertedValue = valueInBaseUnit * this.units[type][to];
    return convertedValue;
    }
}

export default Conversion;

let con = new Conversion;
// test
