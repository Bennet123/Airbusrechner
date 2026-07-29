// Schafft der Airbus das? - mein Reichweiten-Rechner

const startFeld = document.getElementById("start");
const zielFeld = document.getElementById("ziel");
const berechnenBtn = document.getElementById("berechnen");
const ergebnisBox = document.getElementById("ergebnis");
const routeText = document.getElementById("route");
const distanzText = document.getElementById("distanz");
const flugzeitText = document.getElementById("flugzeit");
const flotteListe = document.getElementById("flotte");
const hinweisText = document.getElementById("hinweis");
const einheitText = document.getElementById("einheit")
const einheitBtn = document.getElementById("einheitWechslen")

let zeigeMeilen = false;


// beide Dropdowns (Start + Ziel) mit allen Flughäfen füllen
function auswahlFuellen() {
  FLUGHAEFEN.forEach(function (flughafen) {
    const text = flughafen.name + " (" + flughafen.code + ")";

    const optionStart = document.createElement("option");
    optionStart.value = flughafen.code;
    optionStart.textContent = text;
    startFeld.appendChild(optionStart);

    const optionZiel = document.createElement("option");
    optionZiel.value = flughafen.code;
    optionZiel.textContent = text;
    zielFeld.appendChild(optionZiel);
  });

  startFeld.value = "HAM";
  zielFeld.value = "JFK";
}


// Haversine: kürzeste Strecke über die Kugel = Luftlinie.
// Koordinaten einfach abziehen geht nicht, die Erde ist rund.
// Achtung: Math rechnet in Bogenmaß, nicht in Grad -> erst umrechnen.

function gradInBogenmass(grad) {
  return grad * Math.PI / 180;
}

function entfernungBerechnen(a, b) {
  const ERDRADIUS = 6371; // km

  const deltaLat = gradInBogenmass(b.lat - a.lat);
  const deltaLon = gradInBogenmass(b.lon - a.lon);

  const h = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
          + Math.cos(gradInBogenmass(a.lat))
          * Math.cos(gradInBogenmass(b.lat))
          * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const winkel = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return ERDRADIUS * winkel;
}


// Flughafen zum Kürzel finden (z.B. "HAM")
function flughafenFinden(code) {
  return FLUGHAEFEN.find(function (f) {
    return f.code === code;
  });
}

// Aus 8.4 Stunden mach "8 h 24 min"
function flugzeitFormatieren(stunden) {
  const ganzeStunden = Math.floor(stunden);
  const minuten = Math.round((stunden - ganzeStunden) * 60);
  return ganzeStunden + " h " + minuten + " min";
}


function berechnen() {
  const start = flughafenFinden(startFeld.value);
  const ziel = flughafenFinden(zielFeld.value);

  if (start.code === ziel.code) {
    hinweisText.textContent = "Start und Ziel sind derselbe Flughafen. Wähl mal zwei verschiedene.";
    ergebnisBox.hidden = true;
    return;
  }

  const distanz = entfernungBerechnen(start, ziel);
  const flugzeit = distanz / REISEGESCHWINDIGKEIT;

  routeText.textContent = start.code + " → " + ziel.code;

  let anzeige;

  if (zeigeMeilen) {
    anzeige = distanz / 1.852;
    einheitText.textContent = "NM";
    einheitBtn.textContent = "in Kilometer (km) anzeigen";
  } else {
    anzeige = distanz;
    einheitText.textContent = "km";
    einheitBtn.textContent = "in Meilen (NM) anzeigen";
  }

  distanzText.textContent = Math.round(anzeige).toLocaleString("de-DE");
  flugzeitText.textContent = "ca. " + flugzeitFormatieren(flugzeit) + " reine Flugzeit";

  flotteListe.innerHTML = "";
  let schaffenEs = 0;

  FLOTTE.forEach(function (flugzeug) {
    const schafftEs = flugzeug.reichweite >= distanz;
    if (schafftEs) {
      schaffenEs++;
    }

    const eintrag = document.createElement("li");
    eintrag.className = schafftEs ? "kann" : "kann-nicht";
    eintrag.innerHTML =
      '<span class="modell">' + flugzeug.modell + '</span>' +
      '<span class="reichweite">' + flugzeug.reichweite.toLocaleString("de-DE") + ' km</span>' +
      '<span class="status">' + (schafftEs ? "schafft es" : "zu weit") + '</span>';

    flotteListe.appendChild(eintrag);
  });

  if (schaffenEs === 0) {
    hinweisText.textContent = "Kein Modell schafft diese Strecke ohne Zwischenstopp.";
  } else if (schaffenEs === FLOTTE.length) {
    hinweisText.textContent = "Diese Strecke schafft jedes Modell der Liste.";
  } else {
    hinweisText.textContent = schaffenEs + " von " + FLOTTE.length + " Modellen schaffen die Strecke.";
  }

  ergebnisBox.hidden = false;
}


auswahlFuellen();
berechnenBtn.addEventListener("click", berechnen);
einheitBtn.addEventListener("click", function () {
  zeigeMeilen = !zeigeMeilen;
  berechnen();
});


// Ideen für später:
// - Suchfeld, damit man den Flughafen tippen kann statt zu scrollen
// - Umschalter zwischen Kilometern und nautischen Meilen
// - Strecke auf einer Weltkarte einzeichnen
// - Ergebnis über die URL teilbar machen
