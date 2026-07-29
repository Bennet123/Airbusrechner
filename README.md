# Schafft der Airbus das?

Ein kleiner Reichweiten-Rechner: Man wählt zwei Flughäfen aus und sieht die Luftlinie
dazwischen — und welche Airbus-Modelle die Strecke ohne Zwischenstopp schaffen würden.

**Live ansehen:** _(Link kommt hier hin, sobald GitHub Pages an ist)_

---

## Wie ich auf die Idee kam

Ich interessiere mich für zwei Sachen: Programmieren und Fliegerei. Ich wollte mal ein
Projekt machen, in dem beides zusammenkommt — und in dem wirklich was gerechnet wird,
nicht nur eine hübsche Seite.

## Die Mathe dahinter (der Teil, der mich am meisten gereizt hat)

Am Anfang dachte ich, man zieht einfach die Koordinaten voneinander ab. Funktioniert
nicht — die Erde ist eine Kugel, keine flache Karte. Dafür gibt es die
**Haversine-Formel**: die rechnet die kürzeste Strecke über eine Kugeloberfläche, also
genau die Luftlinie, die ein Flugzeug fliegt.

Das habe ich mir so lange angeschaut, bis ich es wirklich verstanden habe. Zwei Sachen
waren für mich die Aha-Momente:

- Man muss Grad erst in Bogenmaß umrechnen (`Grad × π / 180`), weil JavaScript intern
  mit Bogenmaß rechnet und nicht mit Grad.
- Zum Prüfen habe ich meine Ergebnisse gegen echte Entfernungen gegengerechnet:
  Hamburg–New York kommt bei mir auf ~6.100 km, das passt (unter 1 % daneben). Der
  kleine Rest kommt daher, dass die Formel mit einer perfekten Kugel rechnet, die Erde
  aber an den Polen leicht abgeflacht ist.

## Ehrlich gesagt

Ich bin erst seit zwei Jahren im Informatikunterricht. Die Mathematik hinter dem
Projekt habe ich verstanden und kann sie erklären — den Code selbst habe ich mit Hilfe
gebaut (Tutorials und KI als Nachschlagewerk). Mein Ziel ist, so etwas im nächsten Jahr
vor dem Studium komplett allein hinzubekommen.

## Wie es aufgebaut ist

| Datei | Was drin ist |
|---|---|
| `index.html` | die Seite selbst |
| `style.css` | das Aussehen, angelehnt an eine Flughafen-Anzeigetafel |
| `flughaefen.js` | die Daten: Flughäfen mit Koordinaten, Airbus-Modelle mit Reichweiten |
| `script.js` | die Logik: rechnen und anzeigen |

Die Daten habe ich extra von der Logik getrennt — so kann ich einen neuen Flughafen
dazupacken, ohne an der Rechnung etwas kaputtzumachen.

## Technik

Nur HTML, CSS und JavaScript, bewusst ohne Framework. Ich wollte erst die Grundlagen
kapieren, bevor ich Werkzeuge benutze, die mir das Denken abnehmen.

## Was als Nächstes kommt

- [x] Umschalten zwischen Kilometern und nautischen Meilen (NM)
- [ ] Suchfeld, damit man den Flughafen tippen kann statt zu scrollen
- [ ] die Strecke auf einer einfachen Weltkarte einzeichnen
- [ ] das Ergebnis über die URL teilbar machen

## Kleiner Hinweis zu den Zahlen

Die Reichweiten sind ungefähre Herstellerangaben unter Idealbedingungen. In echt hängt
das von Beladung, Wind und Route ab — der Rechner ist also eine Näherung, kein Werkzeug
für echte Flugplanung.

---

Bennet Wendt
