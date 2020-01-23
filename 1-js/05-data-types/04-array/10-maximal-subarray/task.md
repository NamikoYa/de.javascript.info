Wichtigkeit: 2

---

# Ein maximales Subarray

Die Eingabe ist ein Array gefüllt mit Nummern, bsp. `arr = [1, -2, 3, 4, -9, 6]`.

Die Aufgabe lautet: Finde die benachbarten Subarrays von `arr` mit der maximalen Summe aller Elemente.

Brauche die Funktion `getMaxSubSum(arr)` für die Berechnung der Summe.

Beispiel: 

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) = 5 (Summe von hervorgehobenen Elementen)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) = 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) = 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) = 100
getMaxSubSum([*!*1, 2, 3*/!*]) = 6 (take all)
```

Wenn alle Elemente negativ sind, nehmen wir keine (Subarray ist leer), dewegen ist die Summe dann null:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Bitte versuche eine schnelle, effiziente Lösung zu finden: [O(n<sup>2</sup>)](https://de.wikipedia.org/wiki/Landau-Symbole) oder sogar O(n), wenn du kannst.
