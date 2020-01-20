Wichtigkeit: 5

---

# Aufruf im Kontext von einem Array

Was ist das Ergebnis? Warum?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

