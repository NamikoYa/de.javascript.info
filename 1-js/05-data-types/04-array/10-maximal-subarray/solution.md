# Langsame Lösung

Wir können alle möglichen Subsummen berechnen.

Der einfachste Weg dafür ist jedes Element zu nehmen und anfangend von dem die Summen von allen folgenden Subarrays zu berechnen.

Beispiel für `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Wir starten mit -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Wir starten mit 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Wir starten mit 3:
3
3 + (-9)
3 + (-9) + 11

// Wir starten mit -9
-9
-9 + 11

// Wir starten mit 11
11
```

Der Code ist eigentlich ein verschachtelter Loop: Ein externer Loop über die Elemente des Arrays und das interne Zählen der Subsummen vom momentanen Element.

```js run
function getMaxSubSum(arr) {
  let maxSumme = 0; // nehmen wir kein Element, wird null zurückgegeben

  for (let i = 0; i < arr.length; i++) {
    let festerStart = 0;
    for (let j = i; j < arr.length; j++) {
      festerStart += arr[j];
      maxSumme = Math.max(maxSumme, festerStart);
    }
  }

  return maxSumme;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

Die Lösung hat eine Zeitkomplexität von [O(n<sup>2</sup>)](https://de.wikipedia.org/wiki/Landau-Symbole). In anderen Worten, wenn wir die Grösse des Arrays um zwei Mal vergrössern, würde dieser Algorithmus vier Mal länger brauchen.

Solche Algorithmen führen bei grossen Arrays (1000, 10000 oder mehr Elemente) zu extremer Trägheit.

# Schnelle Lösung

Nehmen wir die momentane Teilsumme von Elementen in der Variabel `s`. Wenn `s` irgendwann negativ wird, weisen wir dem `s=0` zu. Das Maximum von allen diesen `s` ist schlussendlich die Antwort.

Falls die Beschreibung zu vage ist, lies dich in den Code ein, er ist kurz genug:

```js run demo
function getMaxSubSum(arr) {
  let maxSumme = 0;
  let teilSumme = 0;

  for (let item of arr) { // für jedes Element von arr
    teilSumme += item; // zur Teilsumme dazuzählen
    maxSumme = Math.max(maxSumme, teilSumme); // das Maximum behalten
    if (teilSumme < 0) teilSumme = 0; // auf null setzen, falls negativ
  }

  return maxSumme;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

Dieser Algorithmus braucht genau ein Durchlauf durch ein Array, heisst die Zeitkomplexität ist O(n).

Hier kannst du mehr detailliertere  Informationen über den Algorithmus finden: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Falls es dann immer noch nicht ganz klar ist warum es so funktioniert, dann zeichne das Beispiel von Oben auf und versuche zu verstehen wie es funktioniert. Das erklärt mehr als Worte.
