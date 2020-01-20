Der Aufruf `arr[2]()` ist syntaktisch das gute alte `obj[method]()`, in der Rolle von `obj` haben wir `arr` und in der Rolle von `method` haben wir `2`.

Das heisst wir rufen die Funktion `arr[2]` auf als eine Objektmethode. Es erhält `this`, das das Objekt `arr` referenziert, und gibt somit das Array aus:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // "a","b",function
```

Das Array hat 3 Werte: ursprünglich hatte es zwei, plus die Funktion.
The array has 3 values: initially it had two, plus the function. 
