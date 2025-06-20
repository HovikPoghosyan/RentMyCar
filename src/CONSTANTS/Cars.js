const carModels = [
   { brand: "Alfa Romeo", models: ["Giulia", "Stelvio", "Tonale"] },
   { brand: "Aston Martin", models: ["DB11", "Vantage", "DBS Superleggera"] },
   { brand: "Audi", models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"] },
   { brand: "Bentley", models: ["Continental GT", "Flying Spur", "Bentayga"] },
   { brand: "BMW", models: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X3", "X5", "X7", "i4", "iX"] },
   { brand: "Bugatti", models: ["Chiron", "Divo", "Bolide", "Mistral"] },
   { brand: "Chevrolet", models: ["Spark", "Sonic", "Cruze", "Malibu", "Impala", "Camaro", "Corvette", "Equinox", "Traverse", "Tahoe", "Suburban", "Silverado"] },
   { brand: "Changan", models: ["CS35", "CS75", "UNI-K"] },
   { brand: "Citroën", models: ["C3", "C4", "C5 Aircross", "Berlingo"] },
   { brand: "Dodge", models: ["Dart", "Challenger", "Charger", "Durango", "Journey", "RAM 1500", "RAM 2500", "Viper"] },
   { brand: "Ferrari", models: ["Portofino", "Roma", "F8 Tributo", "SF90 Stradale", "812 Superfast", "488 Pista", "LaFerrari"] },
   { brand: "Ford", models: ["Fiesta", "Focus", "Fusion", "Mustang", "Taurus", "Escape", "Edge", "Explorer", "Expedition", "F-150", "Ranger", "Bronco"] },
   { brand: "Geely", models: ["Emgrand", "Coolray", "Tugella"] },
   { brand: "Great Wall", models: ["Haval H6", "Wey Coffee 01"] },
   { brand: "Honda", models: ["Fit", "Civic", "Accord", "Insight", "HR-V", "CR-V", "Passport", "Pilot", "Ridgeline"] },
   { brand: "Hyundai", models: ["Accent", "Elantra", "Sonata", "Veloster", "Ioniq", "Kona", "Tucson", "Santa Fe", "Palisade"] },
   { brand: "Jeep", models: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator"] },
   { brand: "Kia", models: ["Rio", "Forte", "Optima", "Stinger", "Soul", "Seltos", "Sportage", "Sorento", "Telluride"] },
   { brand: "Lamborghini", models: ["Huracán", "Aventador", "Urus", "Revuelto"] },
   { brand: "Lucid", models: ["Air", "Gravity"] },
   { brand: "Maserati", models: ["Ghibli", "Levante", "Quattroporte", "MC20"] },
   { brand: "Mazda", models: ["Mazda2", "Mazda3", "Mazda6", "MX-5 Miata", "CX-3", "CX-5", "CX-9"] },
   { brand: "McLaren", models: ["540C", "570S", "600LT", "720S", "Artura", "P1"] },
   { brand: "Mercedes-Benz", models: ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "EQC"] },
   { brand: "NIO", models: ["ES6", "EC6", "ET7"] },
   { brand: "Nissan", models: ["Versa", "Sentra", "Altima", "Maxima", "GT-R", "Leaf", "Juke", "Rogue", "Murano", "Pathfinder", "Armada"] },
   { brand: "Peugeot", models: ["208", "308", "508", "2008", "3008", "5008"] },
   { brand: "Polestar", models: ["Polestar 1", "Polestar 2", "Polestar 3"] },
   { brand: "Porsche", models: ["718 Cayman", "718 Boxster", "911", "Panamera", "Macan", "Cayenne", "Taycan"] },
   { brand: "Renault", models: ["Clio", "Megane", "Captur", "Kadjar", "Talisman"] },
   { brand: "Rivian", models: ["R1T", "R1S"] },
   { brand: "Rolls-Royce", models: ["Ghost", "Wraith", "Phantom", "Cullinan"] },
   { brand: "Subaru", models: ["Impreza", "Legacy", "WRX", "BRZ", "Forester", "Outback", "Ascent"] },
   { brand: "Tesla", models: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster", "Semi"] },
   { brand: "Tata", models: ["Nano", "Tiago", "Altroz", "Harrier", "Safari"] },
   { brand: "Toyota", models: ["Yaris", "Corolla", "Camry", "Avalon", "Supra", "86", "RAV4", "Highlander", "4Runner", "Land Cruiser", "Tacoma", "Tundra"] },
   { brand: "Volkswagen", models: ["Polo", "Golf", "Passat", "Arteon", "Tiguan", "Touareg", "Jetta", "ID.4"] },
   { brand: "VinFast", models: ["VF 8", "VF 9"] },
   { brand: "Volvo", models: ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90", "C40"] }
];
 
 
 export default carModels;

 export const getModels = () => fetch('https://retmycar-production.up.railway.app/api/marks', {
   method: 'GET',
   headers: {
      'Accept': 'application/json',
   },
})
.then(response => response.json())
.then(data => {
   // console.log('Models:', data);
})
.catch(error => {
   // console.error('Error:', error);
});