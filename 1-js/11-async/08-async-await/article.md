# Async/await

Es gibt eine spezielle Syntax namens "async/await", die das Arbeiten mit Promises angenehmer macht. Sie ist überraschend einfach zu verstehen und zu gebrauchen.

## Async functions

Beginnen wir mit dem Schlüsselwort `async`. Es kann vor eine Funktion gestellt werden, wie hier:

```js
async function f() {
  return 1;
}
```

Steht das Wort "async" vor einer Funktion bedeutet das lediglich: Eine Funktion gibt immer ein Promise zurück. Andere Werte sind automatisch in einem aufgelösten (resolved?????) Promise verpackt.

Zum Beispiel, diese Funktion gibt ein aufgelöstes Promise mit dem Resultat `1` zurück, testen wirs:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

... Wir können explizit ein Promise zurückgeben, es wäre das Selbe:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Also, `async` stellt sicher, dass die Funktion ein Promise zurückgibt, und verpackt die Werte, die keine Promises sind darin ein. Einfach genug, richtig? Aber da ist mehr. Es gibt auch noch ein anderes Schlüsselwort, nämlich `await`, welches nur in einer `async` Funktion verwendet werden kann und ziemlich cool ist.

## Await

Die Syntax:

```js
// funktioniert nur in einer async Funktion
let wert = await promise;
```

Dieses Schlüsselwort `await` sorgt dafür, dass JavaScript auf die Beendung und den Rückgabewert des Promises wartet.

Hier ist ein Beispiel mit einem Promise, welches sich in einer Sekunde auflöst:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Fertig!"), 1000)
  });

*!*
  let result = await promise; // wartet bis das Promise alles erledigt hat (*)
*/!*

  alert(result); // "Fertig!"
}

f();
```

Die Funktion "pausiert" bei der Linie `(*)`, setzt fort, sobald das Promise fertig ist und füllt `result` mit dem gewünschten Resultat ab. Deswegen zeigt der Code oben nach einer Sekunde "Fertig!" an.

Machen wir es noch deutlicher: `await` buchstäblich bringt JavaScript dazu auf das Promise zu warten und kann erst nach der Beendung mit dem Resultat weiterarbeiten. Es braucht dafür keine Ressourcen der CPU, da der Engine andere Arbeiten gleichzeitig erledigen kann: Scripte ausführen, Events handhaben usw.

Es ist schlichtweg eine elegantere Syntax, um das Result eines Promises zu bekommen als `promise.then`. Dazu noch einfacher zu lesen und gebrauchen.

````warn header="Can't use `await` in regular functions"
If we try to use `await` in non-async function, there would be a syntax error:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

We will get this error if we do not put `async` before a function. As said, `await` only works inside an `async function`.
````

Let's take the `showAvatar()` example from the chapter <info:promise-chaining> and rewrite it using `async/await`:

1. We'll need to replace `.then` calls with `await`.
2. Also we should make the function `async` for them to work.

```js run
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Pretty clean and easy to read, right? Much better than before.

````smart header="`await` won't work in the top-level code"
People who are just starting to use `await` tend to forget the fact that we can't use `await` in top-level code. For example, this will not work:

```js run
// syntax error in top-level code
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

We can wrap it into an anonymous async function, like this:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```


````
````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows to use thenable objects (those with a callable `then` method). The idea is that a 3rd-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use with `await`.

Here's a demo `Thenable` class, the `await` below accepts its instances:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

If `await` gets a non-promise object with `.then`, it calls that method providing built-in functions `resolve`, `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
````

````smart header="Async class methods"
To declare an async class method, just prepend it with `async`:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```
The meaning is the same: it ensures that the returned value is a promise and enables `await`.

````
## Error handling

If a promise resolves normally, then `await promise` returns the result. But in case of a rejection, it throws the error, just as if there were a `throw` statement at that line.

This code:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...Is the same as this:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

In real situations, the promise may take some time before it rejects. In that case there will be a delay before `await` throws an error.

We can catch that error using `try..catch`, the same way as a regular `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

In case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

If we don't have `try..catch`, then the promise generated by the call of the async function `f()` becomes rejected. We can append `.catch` to handle it:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (not always) more convenient.

But at the top level of the code, when we're outside of any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through errors.

Like in the line `(*)` of the example above.
```

````smart header="`async/await` works well with `Promise.all`"
When we need to wait for multiple promises, we can wrap them in `Promise.all` and then `await`:

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

In case of an error, it propagates as usual: from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````

## Summary

The `async` keyword before a function has two effects:

1. Makes it always return a promise.
2. Allows to use `await` in it.

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:

1. If it's an error, the exception is generated, same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy both to read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is a nice thing to wait for many tasks simultaneously.
