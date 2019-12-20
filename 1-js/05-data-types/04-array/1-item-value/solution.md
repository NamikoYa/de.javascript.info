Das Ergebnis ist `4`:


```js run
let fruechte = ["Apfel", "Birne", "Orange"];

let einkaufsWagen = fruechte;

einkaufsWagen.push("Banane");

*!*
alert( fruechte.length ); // 4
*/!*
```

Das ist so, weil Arrays Objekte sind. Dies bedeutet, dass `einkaufsWagen` sowie `fruechte` Referenzen auf das gleiche Array sind.

