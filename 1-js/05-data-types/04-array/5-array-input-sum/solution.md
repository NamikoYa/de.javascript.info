Bitte beachte das feine, aber wichtige Detail in dieser Lösung: Wir konventieren `wert` nicht sofort nach dem `promt` in eine Zahl, da wir nach `wert = +wert` einen leeren String von einer Null nicht mehr auseinander halten könnten. Wir konventieren `wert` eifach später.

```js run demo
function sumInput() {
 
  let nummern = [];

  while (true) {

    let wert = prompt("Eine Nummer bitte?", 0);

    // sollen wir abbrechen?
    if (wert === "" || wert === null || !isFinite(wert)) break;

    nummern.push(+wert);
  }

  let sum = 0;
  for (let nummer of nummern) {
    sum += nummer;
  }
  return sum;
}

alert( sumInput() ); 
```

