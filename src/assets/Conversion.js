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
                "mile": 1 / 1609.344,
                "yard": 1 * 1.094,
                "foot": 1 * 3.281,
                "inch": 1 * 39.37,
                "light year": 1.057e-16,


            },
            "temperature": {
            "C": 1,
            "F": undefined,
            "K": undefined,
            },
            "area": {
                'square-kilometer': 0.000001,
                'square-meter': 1,
                'square-centimeter': 10000,
                'square-milimeter': 1000000,
                'square-micrometer': 1000000000000,
                'hectare': 0.0001,
                'square-mile': 1 / 3.861e-7,
                'square-yard': 1.19599,
                'square-foot': 10.7639,
                'square-inch': 1550,
                'acre': 0.000247105,

            },
            "volume": {
               'cubic-kilometer': 1e-15,
                'cubic-meter': 1,
                'cubic-centimeter': 1e6,
                'cubic-millimeter': 1e9,
                'liter': 1000,
                'milliliter': 1e6,
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
                'cubic-mile': 4.16818e9,
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
                'atomic-mass-unit': 6.022e-26,
            },

        
        
        }

    }
    convertTemperature(value, from, to) {
        switch (`${from}-To-${to}`) {
            case 'C-To-F':
                return (value * 9/5) + 32;
            case 'C-To-K':
                return value + 273.15;
            case 'F-To-C':
                return (value - 32) * 5/9;
            case 'F-To-K':
                return (value - 32) * 5/9 + 273.15;
            case 'K-To-C':
                return value - 273.15;
            case 'K-To-F':
                return (value - 273.15) * 9/5 + 32;
            default:
                throw new Error(`Unknown conversion: ${from} to ${to} with value ${value}`);
        }
    }
    // Convert function
    convert(value, from, to, type) {
        // Check if the units are the same
        if (from === to) {
            // If they are the same, return the value
            return value;
        }
          // Check if the type is temperature
        if (type === 'temperature') {
            // Convert the temperature
            return this.convertTemperature(value, from, to);
        }
        else {
        // Convert the value to base unit
    const valueInBaseUnit = value / this.units[type][from];
    
    // Convert the value to the target unit
    const convertedValue = valueInBaseUnit * this.units[type][to];
    return convertedValue;        
}
    }
}

export default Conversion;

let con = new Conversion;
// test
