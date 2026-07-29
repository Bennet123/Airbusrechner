// Flughäfen mit Koordinaten (Breitengrad / Längengrad).
// Die Koordinaten brauche ich später für die Entfernungsberechnung.
// Wenn du mehr Flughäfen willst: einfach unten eine neue Zeile ergänzen.

const FLUGHAEFEN = [
  { code: "HAM", name: "Hamburg",        lat: 53.6304, lon:   9.9882 },
  { code: "FRA", name: "Frankfurt",      lat: 50.0379, lon:   8.5622 },
  { code: "MUC", name: "München",        lat: 48.3538, lon:  11.7861 },
  { code: "BER", name: "Berlin",         lat: 52.3667, lon:  13.5033 },
  { code: "DUS", name: "Düsseldorf",     lat: 51.2895, lon:   6.7668 },
  { code: "AMS", name: "Amsterdam",      lat: 52.3105, lon:   4.7683 },
  { code: "CDG", name: "Paris",          lat: 49.0097, lon:   2.5479 },
  { code: "LHR", name: "London",         lat: 51.4700, lon:  -0.4543 },
  { code: "MAD", name: "Madrid",         lat: 40.4719, lon:  -3.5626 },
  { code: "BCN", name: "Barcelona",      lat: 41.2974, lon:   2.0833 },
  { code: "FCO", name: "Rom",            lat: 41.8003, lon:  12.2389 },
  { code: "LIS", name: "Lissabon",       lat: 38.7756, lon:  -9.1354 },
  { code: "ZRH", name: "Zürich",         lat: 47.4647, lon:   8.5492 },
  { code: "VIE", name: "Wien",           lat: 48.1103, lon:  16.5697 },
  { code: "CPH", name: "Kopenhagen",     lat: 55.6180, lon:  12.6560 },
  { code: "ARN", name: "Stockholm",      lat: 59.6519, lon:  17.9186 },
  { code: "OSL", name: "Oslo",           lat: 60.1939, lon:  11.1004 },
  { code: "HEL", name: "Helsinki",       lat: 60.3172, lon:  24.9633 },
  { code: "DUB", name: "Dublin",         lat: 53.4213, lon:  -6.2701 },
  { code: "ATH", name: "Athen",          lat: 37.9364, lon:  23.9445 },
  { code: "IST", name: "Istanbul",       lat: 41.2753, lon:  28.7519 },
  { code: "KEF", name: "Reykjavík",      lat: 63.9850, lon: -22.6056 },
  { code: "JFK", name: "New York",       lat: 40.6413, lon: -73.7781 },
  { code: "ORD", name: "Chicago",        lat: 41.9742, lon: -87.9073 },
  { code: "LAX", name: "Los Angeles",    lat: 33.9416, lon:-118.4085 },
  { code: "MIA", name: "Miami",          lat: 25.7959, lon: -80.2870 },
  { code: "YYZ", name: "Toronto",        lat: 43.6777, lon: -79.6248 },
  { code: "MEX", name: "Mexiko-Stadt",   lat: 19.4363, lon: -99.0721 },
  { code: "GRU", name: "São Paulo",      lat:-23.4356, lon: -46.4731 },
  { code: "EZE", name: "Buenos Aires",   lat:-34.8222, lon: -58.5358 },
  { code: "CAI", name: "Kairo",          lat: 30.1219, lon:  31.4056 },
  { code: "LOS", name: "Lagos",          lat:  6.5774, lon:   3.3212 },
  { code: "JNB", name: "Johannesburg",   lat:-26.1392, lon:  28.2460 },
  { code: "CPT", name: "Kapstadt",       lat:-33.9715, lon:  18.6021 },
  { code: "DXB", name: "Dubai",          lat: 25.2532, lon:  55.3657 },
  { code: "DOH", name: "Doha",           lat: 25.2731, lon:  51.6081 },
  { code: "DEL", name: "Delhi",          lat: 28.5562, lon:  77.1000 },
  { code: "BKK", name: "Bangkok",        lat: 13.6900, lon: 100.7501 },
  { code: "SIN", name: "Singapur",       lat:  1.3644, lon: 103.9915 },
  { code: "HKG", name: "Hongkong",       lat: 22.3080, lon: 113.9185 },
  { code: "PVG", name: "Shanghai",       lat: 31.1443, lon: 121.8083 },
  { code: "NRT", name: "Tokio",          lat: 35.7720, lon: 140.3929 },
  { code: "SYD", name: "Sydney",         lat:-33.9399, lon: 151.1753 },
  { code: "AKL", name: "Auckland",       lat:-37.0082, lon: 174.7850 }
];

// Airbus-Modelle mit ungefährer maximaler Reichweite in Kilometern.
// Das sind Herstellerangaben unter Idealbedingungen - in der Praxis
// hängt die echte Reichweite von Beladung, Wind und Route ab.
// Die Reisegeschwindigkeit nutze ich für die grobe Flugzeit-Schätzung.

const FLOTTE = [
  { modell: "A220-300",     reichweite:  6300, sitze: "120-150" },
  { modell: "A320neo",      reichweite:  6300, sitze: "150-180" },
  { modell: "A321neo",      reichweite:  7400, sitze: "180-220" },
  { modell: "A321XLR",      reichweite:  8700, sitze: "180-220" },
  { modell: "A330-900neo",  reichweite: 13300, sitze: "260-300" },
  { modell: "A350-900",     reichweite: 15000, sitze: "300-350" },
  { modell: "A350-1000",    reichweite: 16100, sitze: "350-410" }
];

// Durchschnittliche Reisegeschwindigkeit in km/h (grober Richtwert)
const REISEGESCHWINDIGKEIT = 850;
