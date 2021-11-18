# Q&A

- [What is CSS BEM?](#What-is-CSS-BEM)
- [Event loop](#Event-loop)
- [What is the difference between Call, Apply and Bind?](#What-is-the-difference-between-Call,-Apply-and-Bind)
- [Application Programming Interface (API)](#Application-Programming-Interface-(API))
- [function chaining](#function-chaining)
- [Equality (==) vs. Identity (===)](#Equality-(==)-vs-Identity-(===))
- [virtual dom](#virtual-dom)
- [What is the purpose of race method in promise?](#What-is-the-purpose-of-race-method-in-promise)
- [Hoisting](#Hoisting)
- [await](#await)
- [DOM](#DOM)
- [What is a closure, and how/why would you use one?](#What-is-a-closure,-and-how_why-would-you-use-one)
- [async](#async)
- [prototype](#prototype)
- [Explain Ajax in as much detail as possible.](#Explain-Ajax-in-as-much-detail-as-possible)
- [What is BDD (Behavior Driven Development)? | Agile Alliance](#What-is-BDD-(Behavior-Driven-Development)-|-Agile-Alliance)
- [What's the difference between a variable that is: 'null', 'undefined' or undeclared? How would you go about checking for any of these states?](#What's-the-difference-between-a-variable-that-is:-'null',-'undefined'-or-undeclared-How-would-you-go-about-checking-for-any-of-these-states)
- [What is promise chaining?](#What-is-promise-chaining)
- [Can you give an example of a curry function and why this syntax offers an advantage?](#Can-you-give-an-example-of-a-curry-function-and-why-this-syntax-offers-an-advantage)
- [JavaScript Template Literals](#JavaScript-Template-Literals)
- [What are the advantages and disadvantages of using Ajax?](#What-are-the-advantages-and-disadvantages-of-using-Ajax)
- [Promise](#Promise)
- [jagged array](#jagged-array)
- [Fetch API](#Fetch-API)
- [What are the differences between variables created using 'let', 'var' or 'const'?](#What-are-the-differences-between-variables-created-using-'let',-'var'-or-'const')
- [timer](#timer)
- [Export and Import](#Export-and-Import)
- [Can you describe the main difference between a '.forEach' loop and a '.map()' loop and why you would pick one versus the other?](#Can-you-describe-the-main-difference-between-a-'forEach'-loop-and-a-'map()'-loop-and-why-you-would-pick-one-versus-the-other)
- [What is promise.all()?](#What-is-promiseall())
- [Explain how 'this' works in JavaScript](#Explain-how-'this'-works-in-JavaScript)
- [What is REST?](#What-is-REST)
- [data-\*](#data-\*)
- [What does i18n stand for?](#What-does-i18n-stand-for)
- [doctype](#doctype)
- [Quirks Mode and Standards Mode](#Quirks-Mode-and-Standards-Mode)
- [http request](#http-request)
- [download order](#download-order)
- [span vs div](#span-vs-div)
- [div, section & article](#div,-section-&-article)


---------

<a name="What-is-CSS-BEM"></a>
## What is CSS BEM?

The BEM (Block Element Modifier) methodology is a naming convention for CSS classes in order to keep CSS more maintainable by defining namespaces to solve scoping issues. A Block is a standalone component that is reusable across projects and acts as a "namespace" for sub components (Elements). Modifiers are used as flags when a Block or Element is in a certain state or is different in structure or style.

```css
/* block component */
.block {
}
/* element */
.block__element {
}
/* modifier */
.block__element--modifier {
}
```

Example

```css
.button {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #d5d5d5;
  background-image: linear-gradient(#eee, #ddd);
  font: 700 13px/18px Helvetica, arial;
}
.button--state-success {
  color: #fff;
  background: #569e3d linear-gradient(#79d858, #569e3d) repeat-x;
  border-color: #4a993e;
}
.button--state-danger {
  color: #900;
}
```

```html
<button class="button">Normal button</button>
<button class="button button--state-success">Success button</button>
<button class="button button--state-danger">Danger button</button>
```

### Benefits

- Modularity: Block styles are never dependent on other elements on a page, so you will never experience problems from cascading.
- Reusability: Composing independent blocks in different ways, and reusing them intelligently, reduces the amount of CSS code that you will have to maintain.
- Structure: BEM methodology gives your CSS code a solid structure that remains simple and easy to understand.

#### resourse

- https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/
- https://github.com/learning-zone/css-interview-questions


---------

<a name="Event-loop"></a>
## Event loop

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

If you haven't already checked out Philip Robert's [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html), you should. It is one of the most viewed videos on JavaScript.

![](../../img/event_loop.png)

```js
window.setTimeout(calculate, 500);
```

#### References

- https://www.taniarascia.com/asynchronous-javascript-event-loop-callbacks-promises-async-await/
- https://www.geeksforgeeks.org/what-is-an-event-loop-in-javascript/
- https://javascript.info/event-loop
- https://geekflare.com/javascript-event-loops/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
- https://darrylmendonez.medium.com/javascript-execution-order-e1bebc3976ca
- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html


---------

<a name="What-is-the-difference-between-Call,-Apply-and-Bind"></a>
## What is the difference between Call, Apply and Bind?

**a.) call()**

The call() method invokes a function with a given `this` value and arguments provided one by one

```javascript
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

invite.call(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?
invite.call(employee2, "Hello", "How are you?"); // Hello Jimmy Baily, How are you?
```

**b.) apply()**

Invokes the function and allows you to pass in arguments as an array

```javascript
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?
invite.apply(employee2, ["Hello", "How are you?"]); // Hello Jimmy Baily, How are you?
```

**c.) bind()**

returns a new function, allowing you to pass in an array and any number of arguments

```javascript
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

var inviteEmployee1 = invite.bind(employee1);
var inviteEmployee2 = invite.bind(employee2);
inviteEmployee1("Hello", "How are you?"); // Hello John Rodson, How are you?
inviteEmployee2("Hello", "How are you?"); // Hello Jimmy Baily, How are you?
```

#### References


---------

<a name="Application-Programming-Interface-(API)"></a>
## Application Programming Interface (API)

**Application programming interfaces**, or APIs, simplify software development and innovation by enabling applications to exchange data and functionality easily and securely.

### What is an application programming interface (API)?

An application programming interface, or API, enables companies to open up their applications’ data and functionality to external third-party developers, business partners, and internal departments within their companies. This allows services and products to communicate with each other and leverage each other’s data and functionality through a documented interface. Developers don't need to know how an API is implemented; they simply use the interface to communicate with other products and services. API use has surged over the past decade, to the degree that many of the most popular web applications today would not be possible without APIs.

#### References

- https://www.ibm.com/cloud/learn/api


---------

<a name="function-chaining"></a>
## function chaining

Function chaining is a pattern in JavaScript where multiple functions are called on the same object consecutively. Using the same object reference, multiple functions can be invoked. It increases the readability of the code and means less redundancy.23 Sep 2019

```js
var Obj = {
  result: 0,
  addNumber: function (a, b) {
    this.result = a + b;
    return this;
  },
  multiplyNumber: function (a) {
    this.result = this.result * a;
    return this;
  },
  divideNumber: function (a) {
    this.result = this.result / a;
    return this;
  },
};
Obj.addNumber(10, 20).multiplyNumber(10).divideNumber(10);
```

`Method chaining` is the mechanism of calling a method on another method of the same object. This ensures a cleaner and readable code. `Method chaining` uses `this` keyword in the object's class to access its methods. In javascript, the `this` keyword refers to the current object in which it is called. When a method returns `this`, it simply returns an instance of the object in which it is returned. in another word, to chain methods together, we need to make sure that each method we define has a return value so that we can call another method on it.

```js
class chaining {
  method1() {
    console.log(method1);
    return this;
  }

  method2() {
    console.log(method2);
    return this;
  }
}

const chaining_obj = new chaining();
chaining_obj.method1().method2();

// output
method1;
method2;
```

```js
class Arithmetic {
  constructor() {
    this.value = 0;
  }
  sum(...args) {
    this.value = args.reduce((sum, current) => sum + current, 0);
    return this;
  }
  addition(value) {
    this.value = this.value + value;
    return this;
  }
  subtraction(value) {
    this.value = this.value - value;
    return this;
  }
  average(...args) {
    this.value = args.length
      ? this.sum(...args).value / args.length
      : undefined;
    return this;
  }
}

const Arithmetic1 = new Arithmetic();
Arithmetic1.sum(1, 3, 6) // => { value: 10 }
  .subtract(3) // => { value: 7 }
  .add(4).value; // => { value: 11 } // => 11
```

#### Conclusion

Each of the functions in “Function Chaining” returns the current “Execution Context” or current executing object. The functions can be chained together because the previous execution returns results that can be processed further.

#### References

- https://medium.com/technofunnel/javascript-function-chaining-8b2fbef76f7f
- https://blog.segunolalive.com/posts/understanding-method-chaining-in-javascript/
- https://dev.to/isiakaabd/method-chaining-in-javascript-154a


---------

<a name="Equality-(==)-vs-Identity-(===)"></a>
## Equality (==) vs. Identity (===)

Remember when performing comparisons, **the equality operator** (`==`) will attempt to make the data types the same before proceeding. On the other hand, **the identity operator** (`===`) requires both data types to be the same, as a prerequisite.

Let’s understand with an example. See the code below :

```js
var valueOne = 3;
var valueTwo = "3";
if (valueOne == valueTwo) {
  console.log("ValueOne and ValueTwo are the same"); // <--
} else {
  console.log("ValueOne and ValueTwo are NOT the same");
}
```

Can you guess the output? You may or may not be surprised, but these values are considered to be the same.

> Output is: ValueOne and ValueTwo are the same

The reason why the `==` operator reasons that `"3"` and `3` are the same is because it actually coverts the operands (the values either side of the `==` operator) to the same type before it does the comparison.

However, if we change the operator to an identity operator, as shown here, we see quite different output:

```js
var valueOne = 3;
var valueTwo = "3";
if (valueOne === valueTwo) {
  console.log("ValueOne and ValueTwo are the same");
} else {
  console.log("ValueOne and ValueTwo are NOT the same"); // <--
}
```

Now with identity operator, output is:

> Output is: ValueOne and ValueTwo are NOT the same

Since we used the `===` operator on this occasion, and because this operator does not do any type conversion, we see that the string value `"3"` and the number `3` are not the same after all.

**When in doubt, a relatively safe choice is simply to use the identity operator (`===`) as a matter of habit. Of course, the safest choice is to familiarize yourself with the differences, so that you know what is actually happening under the hood.**

## summary

KEY DIFFERENCES:

- `=` is used for assigning values to a variable, `==` is used for comparing two variables, but it ignores the datatype of variable whereas `===` is used for comparing two variables, but this operator also checks datatype and compares two values.
- `=` is called as assignment operator, `==` is called as comparison operator whereas It is also called as comparison operator.
- `=` does not return true or false, `==` Return true only if the two operands are equal while `===` returns true only if both values and data types are the same for the two variables.

### What is the difference between `==` and `===`?

`==` is the abstract equality operator while `===` is the strict equality operator. The `==` operator will compare for equality after doing any necessary type conversions. The `===` operator will not do type conversion, so if two values are not the same type `===` will simply return `false`. When using `==`, funky things can happen, such as:

```js
1 == "1"; // true
1 == [1]; // true
1 == true; // true
0 == ""; // true
0 == "0"; // true
0 == false; // true
```

My advice is never to use the `==` operator, except for convenience when comparing against `null` or `undefined`, where `a == null` will return `true` if `a` is `null` or `undefined`.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

#### References

- https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons
- https://www.guru99.com/difference-equality-strict-operator-javascript.html
- https://howtodoinjava.com/javascript/javascript-equality-vs-identity-operators/
- https://medium.com/@ludico8/identity-vs-equality-battle-of-understanding-vs-758d396e922


---------

<a name="virtual-dom"></a>
## virtual dom

While building client-side apps, a team at Facebook developers realized that the DOM is slow (The Document Object Model (DOM) is an application programming interface (API) for HTML and XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated). So, to make it faster, React implements a virtual DOM that is basically a DOM tree representation in Javascript. So when it needs to read or write to the DOM, it will use the virtual representation of it. Then the virtual DOM will try to find the most efficient way to update the browsers DOM.

Unlike browser DOM elements, React elements are plain objects and are cheap to create. React DOM takes care of updating the DOM to match the React elements. The reason for this is that JavaScript is very fast and it is worth keeping a DOM tree in it to speedup its manipulation.

#### References


---------

<a name="What-is-the-purpose-of-race-method-in-promise"></a>
## What is the purpose of race method in promise?

`Promise.race()` method will return the promise instance which is firstly resolved or rejected. Let us take an example of race() method where promise2 is resolved first

```javascript
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value); // "two" // Both promises will resolve, but 	promise2 is faster
});
```

#### References


---------

<a name="Hoisting"></a>
## Hoisting

JavaScript Hoisting refers to the process whereby the interpreter allocates memory for variable and function declarations prior to execution of the code. Declarations that are made using var are initialized with a default value of undefined. Declarations made using let and const are not initialized as part of hoisting.

**Conceptually hoisting is often presented as the interpreter "splitting variable declaration and initialization, and moving (just) the declarations to the top of the code".**

```js
console.log(num); // Returns 'undefined' from hoisted var declaration (not 6)
var num; // Declaration
num = 6; // Initialization
```

This allows variables to appear in code before they are defined. Note however, that any variable initialization in the original code will not happen until the line of code is executed.

```js
function hoist() {
  a = 20;
  var b = 100;
}

hoist();

console.log(a);
/*
Accessible as a global variable outside hoist() function
Output: 20
*/

console.log(b);
/*
Since it was declared, it is confined to the hoist() function scope.
We can't print it out outside the confines of the hoist() function.
Output: ReferenceError: b is not defined
*/
```

## Conclusion

Let’s summarise what we’ve learned so far:

- While using es5 `var`, trying to use undeclared variables will lead to the variable being assigned a value of undefined upon hoisting.
- While using es6 `let` and `const`, using undeclared variables will lead to a Reference Error because the variable remains uninitialised at execution.

Therefore,

- We should make it a habit to declare and initialise JavaScript variables before use.
- Using strict mode in JavaScript es5 can help expose undeclared variables.

#### References

- https://www.w3schools.com/js/js_hoisting.asp
- https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
- https://www.digitalocean.com/community/tutorials/understanding-hoisting-in-javascript


---------

<a name="await"></a>
## await

The `await` operator is used to wait for a `Promise`. It can only be used inside an `async` function within regular JavaScript code; however it can be used on its own with JavaScript modules.

---

The await expression causes `async` function execution to pause until a `Promise` is settled (that is, fulfilled or rejected), and to resume execution of the `async` function after fulfillment. When resumed, the value of the await expression is that of the fulfilled Promise.

If the `Promise` is rejected, the `await` expression throws the rejected value.

If the value of the expression following the await operator is not a `Promise`, it's converted to a resolved `Promise`.

An `await` splits execution flow, allowing the caller of the `async` function to resume execution. After the await defers the continuation of the `async` function, execution of subsequent statements ensues. If this await is the last expression executed by its function, execution continues by returning to the function's caller a pending `Promise` for completion of the await's function and resuming execution of that caller.

```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}

f1();
```

## see also

- [promes](promes.md)
- [promes2](promes2.md)
- [async](async.md)
- [await](await.md)

#### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function


---------

<a name="DOM"></a>
## DOM

The Document Object Model (DOM) is an application programming interface (API) for HTML and XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated.

The HTML DOM model is constructed as a tree of Objects:

![](../../img/pic_htmltree.gif)

## What is the HTML DOM?

The HTML DOM is a standard object model and programming interface for HTML. It defines:

- The HTML elements as objects
- The properties of all HTML elements
- The methods to access all HTML elements
- The events for all HTML elements

In other words: The HTML DOM is a standard for how to get, change, add, or delete HTML elements.

#### References

- https://www.taniarascia.com/introduction-to-the-dom/
- https://www.w3.org/TR/WD-DOM/introduction.html
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
- https://www.w3schools.com/js/js_htmldom.asp


---------

<a name="What-is-a-closure,-and-how_why-would-you-use-one"></a>
## What is a closure, and how/why would you use one?

A closure is the combination of a function and the lexical environment within which that function was declared. The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned.

> A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

**Why would you use one?**

- Data privacy / emulating private methods with closures. Commonly used in the [module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
- [Partial applications or currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

#### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36


---------

<a name="async"></a>
## async

An async function is a function declared with the `async` keyword, and the `await` keyword is permitted within them. The `async` and `await` keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

Async functions may also be defined as expressions.

```js
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

asyncCall();
```

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  let result = await promise; // wait until the promise resolves (*)
  alert(result); // "done!"
}
f();
```

The function execution “pauses” at the line (\*) and resumes when the promise settles, with result becoming its result. So the code above shows “done!” in one second.

**Let’s emphasize:** `await` literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn’t cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

## see also

- [promes](promes.md)
- [promes2](promes2.md)
- [async](async.md)
- [await](await.md)

#### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function


---------

<a name="prototype"></a>
## prototype

All JavaScript objects inherit properties and methods from a prototype.

```js
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}

const myFather = new Person("John", "Doe", 50, "blue");
const myMother = new Person("Sally", "Rally", 48, "green");
```

We also learned that you can not add a new property to an existing object constructor:

```js
Person.nationality = "English";
```

To add a new property to a constructor, you must add it to the constructor function:

```js
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.nationality = "English";
}
```

#### Prototype Inheritance

All JavaScript objects inherit properties and methods from a prototype:

- `Date` objects inherit from `Date.prototype`
- `Array` objects inherit from `Array.prototype`
- `Person` objects inherit from `Person.prototype`

The `Object.prototype` is on the top of the prototype inheritance chain:

`Date` objects, `Array` objects, and `Person` objects inherit from `Object.prototype`.

#### References

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
- https://www.w3schools.com/js/js_object_prototypes.asp


---------

<a name="Explain-Ajax-in-as-much-detail-as-possible"></a>
## Explain Ajax in as much detail as possible.

Ajax (**asynchronous JavaScript and XML**) is a set of web development techniques using many web technologies on the client side to create asynchronous web applications.

With Ajax, web applications can send data to and retrieve from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows for web pages, and by extension web applications, to change content dynamically without the need to reload the entire page.

In practice, modern implementations commonly use JSON instead of XML, due to the advantages of JSON being native to JavaScript.

The `XMLHttpRequest` API is frequently used for the asynchronous communication or these days, the `fetch` API.

### see also

- [ajax](ajax.md)
- [ajax2](ajax2.md)
- [promes](promes.md)
- [promes2](promes2.md)
- [async](async.md)
- [await](await.md)

#### References

- https://en.wikipedia.org/wiki/Ajax_(programming)
- https://developer.mozilla.org/en-US/docs/AJAX


---------

<a name="What-is-BDD-(Behavior-Driven-Development)-|-Agile-Alliance"></a>
## What is BDD (Behavior Driven Development)? | Agile Alliance

Behaviour Driven Development (BDD) is a synthesis and refinement of practices stemming from Test Driven Development (TDD) and Acceptance Test Driven Development (ATDD).

BDD augments TDD and ATDD with the following tactics:

- Apply the “Five Why’s” principle to each proposed user story, so that its purpose is clearly related to business outcomes
- thinking “from the outside in”, in other words implement only those behaviors which contribute most directly to these business outcomes, so as to minimize waste
- describe behaviors in a single notation which is directly accessible to domain experts, testers and developers, so as to improve communication
- apply these techniques all the way down to the lowest levels of abstraction of the software, paying particular attention to the distribution of behavior, so that evolution remains cheap

### Also Known As

BDD is also referred to as Specification by Example.

### Expected Benefits

Teams already using TDD or ATDD may want to consider BDD for several reasons:

- BDD offers more precise guidance on organizing the conversation between developers, testers and domain experts
- notations originating in the BDD approach, in particular the given-when-then canvas, are closer to everyday language and have a shallower learning curve compared to those of tools such as Fit/FitNesse
- tools targeting a BDD approach generally afford the automatic generation of technical and end user documentation from BDD “specifications”

#### References

- https://www.agilealliance.org/glossary/bdd/
- https://en.wikipedia.org/wiki/Behavior-driven_development


---------

<a name="What's-the-difference-between-a-variable-that-is:-'null',-'undefined'-or-undeclared-How-would-you-go-about-checking-for-any-of-these-states"></a>
## What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?

Undeclared variables are created when you assign a value to an identifier that is not previously created using `var`, `let` or `const`. Undeclared variables will be defined globally, outside of the current scope. In strict mode, a `ReferenceError` will be thrown when you try to assign to an undeclared variable. Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a `try`/`catch` block.

```js
function foo() {
  x = 1;
} // Throws a ReferenceError in strict mode
foo();
console.log(x); // 1
```

A variable that is `undefined` is a variable that has been declared, but not assigned a value. It is of type `undefined`. If a function does not return any value as the result of executing it is assigned to a variable, the variable also has the value of `undefined`. To check for it, compare using the strict equality (`===`) operator or typeof which will give the `'undefined'` string. Note that you should not be using the abstract equality operator to check, as it will also return `true` if the value is `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === "undefined"); // true
console.log(foo == null); // true. Wrong, don't use this to check!
function bar() {}
var baz = bar();
console.log(baz); // undefined
```

A variable that is `null` will have been explicitly assigned to the `null` value. It represents no value and is different from undefined in the sense that it has been explicitly assigned. To check for `null`, simply compare using the strict equality operator. Note that like the above, you should not be using the abstract equality operator (`==`) to check, as it will also return `true` if the value is `undefined`.

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === "object"); // true
console.log(foo == undefined); // true. Wrong, don't use this to check!
```

As a personal habit, I never leave my variables undeclared or unassigned. I will explicitly assign `null` to them after declaring if I don't intend to use it yet. If you use a linter in your workflow, it will usually also be able to check that you are not referencing undeclared variables.

### References

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined


---------

<a name="What-is-promise-chaining"></a>
## What is promise chaining?

The process of executing a sequence of asynchronous tasks one after another using promises is known as Promise chaining.

```javascript
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 3;
  })
  .then(function (result) {
    console.log(result); // 6
    return result * 4;
  });
```

In the above handlers, the result is passed to the chain of .then() handlers with the below work flow,

1. The initial promise resolves in 1 second,
2. After that `.then` handler is called by logging the result(1) and then return a promise with the value of result \* 2.
3. After that the value passed to the next `.then` handler by logging the result(2) and return a promise with result \* 3.
4. Finally the value passed to the last `.then` handler by logging the result(6) and return a promise with result \* 4.

## see also

- [promes](promes.md)
- [promes2](promes2.md)
- [async](async.md)
- [await](await.md)

#### References


---------

<a name="Can-you-give-an-example-of-a-curry-function-and-why-this-syntax-offers-an-advantage"></a>
## Can you give an example of a curry function and why this syntax offers an advantage?

Currying is a pattern where a function with more than one parameter is broken into multiple functions that, when called in series, will accumulate all of the required parameters one at a time. This technique can be useful for making code written in a functional style easier to read and compose. It's important to note that for a function to be curried, it needs to start out as one function, then broken out into a sequence of functions that each accepts one parameter.

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function (newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument);
      }
      return _curried(depth - 1, [...args, newArgument]);
    };
  }

  return _curried(fn.length, []);
}

function add(a, b) {
  return a + b;
}

var curriedAdd = curry(add);
var addFive = curriedAdd(5);

var result = [0, 1, 2, 3, 4, 5].map(addFive); // [5, 6, 7, 8, 9, 10]
```

---

Currying is when you break down a function that takes multiple arguments into a series of functions that each take only one argument. Here's an example in JavaScript:

```js
function add(a, b) {
  return a + b;
}

add(3, 4); // returns 7
```

This is a function that takes two arguments, a and b, and returns their sum. We will now curry this function:

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

This is a function that takes one argument, `a`, and returns `a` function that takes another argument, `b`, and that function returns their sum.

```js
add(3)(4);

var add3 = add(3);

add3(4);
```

The first statement returns `7`, like the `add(3, 4)` statement. The second statement defines a new function called `add3` that will add `3` to its argument. (This is what some may call a closure.) The third statement uses the `add3` operation to add `3` to `4`, again producing `7` as a result.

#### References

- https://stackoverflow.com/questions/36314/what-is-currying
- https://javascript.info/currying-partials
- https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
- https://hackernoon.com/currying-in-js-d9ddc64f162e


---------

<a name="JavaScript-Template-Literals"></a>
## JavaScript Template Literals

Template literals are literals delimited with backticks (`\``), allowing embedded expressions called substitutions.

Synonyms:

- Template Literals
- Template Strings
- String Templates
- Back-Tics Syntax

### Variable Substitutions

Template literals allow variables in strings:

```js
let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`;
```

> Automatic replacing of variables with real values is called string interpolation.

```js
let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;
```

```js
et header = "Templates Literals";
let tags = ["template literals", "javascript", "es6"];

let html = `<h2>${header}</h2><ul>`;
for (const x of tags) {
  html += `<li>${x}</li>`;
}

html += `</ul>`;
```

#### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
- https://www.w3schools.com/JS//js_string_templates.asp


---------

<a name="What-are-the-advantages-and-disadvantages-of-using-Ajax"></a>
## What are the advantages and disadvantages of using Ajax?

**Advantages**

- Better interactivity. New content from the server can be changed dynamically without the need to reload the entire page.
- Reduce connections to the server since scripts and stylesheets only have to be requested once.
- State can be maintained on a page. JavaScript variables and DOM state will persist because the main container page was not reloaded.
- Basically most of the advantages of an SPA.

**Disadvantages**

- Dynamic webpages are harder to bookmark.
- Does not work if JavaScript has been disabled in the browser.
- Some webcrawlers do not execute JavaScript and would not see content that has been loaded by JavaScript.
- Webpages using Ajax to fetch data will likely have to combine the fetched remote data with client-side templates to update the DOM. For this to happen, JavaScript will have to be parsed and executed on the browser, and low-end mobile devices might struggle with this.
- Basically most of the disadvantages of an SPA.


---------

<a name="Promise"></a>
## Promise

The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.
![](../../img/promises.png)

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);
```

```js
myPromise
  .then(handleResolvedA)
  .then(handleResolvedB)
  .then(handleResolvedC)
  .catch(handleRejectedAny);
```

```js
promise1
  .then((value) => {
    return value + " and bar";
  })
  .then((value) => {
    return value + " and bar again";
  })
  .then((value) => {
    return value + " and again";
  })
  .then((value) => {
    return value + " and again";
  })
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });
```

## basic example

```js
let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function () {
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});
```

## see also

- [promes](promes.md)
- [promes2](promes2.md)
- [async](async.md)
- [await](await.md)

#### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


---------

<a name="jagged-array"></a>
## jagged array

> A ragged array, also known as a jagged array, is an array of arrays of which the member arrays can be of different sizes and producing rows of jagged edges when visualized as output. — Wikipedia

**Introduction to JavaScript multidimensional array**

```js
var measurements = [
  [22, 10],
  [10, 13, 15, 14],
  [5, 27, 33],
];
var total = 0;
var average = 0.0;
for (var row = 0; row < measurements.length; row++) {
  for (var col = 0; col < measurements[row].length; col++) {
    total += measurements[row][col];
  }
  average = total / measurements[row].length;
  console.log(`Student ${parseInt(row + 1)} average is  ${average.toFixed(2)}`);
  total = 0;
  average = 0.0;
}
```

#### References

- https://dev.to/osejudith/jagged-array-in-javascript-18og
- https://www.javascripttutorial.net/javascript-multidimensional-array/


---------

<a name="Fetch-API"></a>
## Fetch API

The `Fetch` API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used `XMLHttpRequest`, but the new API provides a more powerful and flexible feature set.

`fetch()` allows you to make network requests similar to `XMLHttpRequest` (XHR). The main difference is that the Fetch API uses Promises, which enables a simpler and cleaner API, avoiding callback hell and having to remember the complex API of `XMLHttpRequest`.

```js
fetch(url)
  .then((response) => {
    // handle the response
  })
  .catch((error) => {
    // handle the error
  });
```

reading response

```js
fetch("/readme.txt")
  .then((response) => response.text())
  .then((data) => console.log(data));
```

In practice, you often use the `async`/`await` with the `fetch()` method like this:

```js
async function fetchText() {
  let response = await fetch("/readme.txt");
  let data = await response.text();
  console.log(data);
}
```

#### References

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://javascript.info/fetch-api
- https://developers.google.com/web/updates/2015/03/introduction-to-fetch
- https://www.javascripttutorial.net/javascript-fetch-api/


---------

<a name="What-are-the-differences-between-variables-created-using-'let',-'var'-or-'const'"></a>
## What are the differences between variables created using `let`, `var` or `const`?

Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).

```js
function foo() {
  // All variables are accessible within functions.
  var bar = "bar";
  let baz = "baz";
  const qux = "qux";

  console.log(bar); // bar
  console.log(baz); // baz
  console.log(qux); // qux
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

```js
if (true) {
  var bar = "bar";
  let baz = "baz";
  const qux = "qux";
}

// var declared variables are accessible anywhere in the function scope.
console.log(bar); // bar
// let and const defined variables are not accessible outside of the block they were defined in.
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var` allows variables to be hoisted, meaning they can be referenced in code before they are declared. `let` and `const` will not allow this, instead throwing an error.

```js
console.log(foo); // undefined

var foo = "foo";

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = "baz";

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = "bar";
```

Redeclaring a variable with `var` will not throw an error, but `let` and `const` will.

```js
var foo = "foo";
var foo = "bar";
console.log(foo); // "bar"

let baz = "baz";
let baz = "qux"; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// This is fine.
let foo = "foo";
foo = "bar";

// This causes an exception.
const baz = "baz";
baz = "qux";
```

#### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const


---------

<a name="timer"></a>
## timer

check out [even loop](event_loop.md) why this is

```js
(function () {
  console.log("this is the start");

  setTimeout(function cb() {
    console.log("Callback 1: this is a msg from call back");
  }); // has a default time value of 0

  console.log("this is just a message");

  setTimeout(function cb1() {
    console.log("Callback 2: this is a msg from call back");
  }, 0);

  console.log("this is the end");
})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "Callback 1: this is a msg from call back"
// "Callback 2: this is a msg from call back"
```

#### References


---------

<a name="Export-and-Import"></a>
## Export and Import

The export statement is used when creating JavaScript modules to export objects, functions, variables from the module so they can be used by other programs with the help of the import statements.
There are two types of exports. One is Named Exports and other is Default Exports.

### Named Exports

Named exports are useful to export several values. During the import, it is mandatory to use the same name of the corresponding object.

```js
// file math.js
function square(x) { return x * x; }
function cube(x) { return x * x; }
export { square, cube };


// while importing square function in test.js
import { square, cube } from './math;
console.log(square(8)) //64
console.log(cube(8)) //512
```

### Default Exports

Default exports are useful to export only a single object, function, variable. During the import, we can use any name to import.

```js
// file module.js
var x = 4;
export default x;

// test.js
// while importing x in test.js
import y from "./module";
// note that y is used import x instead of
// import x, because x was default export
console.log(y);
// output will be 4
```

```js
// file math.js
export default function square(x) { return x * x; }

//while importing square function in test.js
import square from './math;
console.log(square(8)) //64
```

#### References

- https://www.geeksforgeeks.org/what-is-export-default-in-javascript/
- https://javascript.info/import-export


---------

<a name="Can-you-describe-the-main-difference-between-a-'forEach'-loop-and-a-'map()'-loop-and-why-you-would-pick-one-versus-the-other"></a>
## Can you describe the main difference between a `.forEach` loop and a `.map()` loop and why you would pick one versus the other?

To understand the differences between the two, let's look at what each function does.

**`forEach`**

- Iterates through the elements in an array.
- Executes a callback for each element.
- Does not return a value.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

- Iterates through the elements in an array.
- "Maps" each element to a new element by calling the function on each element, creating a new array as a result.

```js
const a = [1, 2, 3];
const doubled = a.map((num) => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

The main difference between `.forEach` and `.map()` is that `.map()` returns a new array. If you need the result, but do not wish to mutate the original array, `.map()` is the clear choice. If you simply need to iterate over an array, `forEach` is a fine choice.

#### References

- https://codeburst.io/javascript-map-vs-foreach-f38111822c0f


---------

<a name="What-is-promiseall()"></a>
## What is promise.all()?

`Promise.all` is a promise that takes an array of promises as an input (an iterable), and it gets resolved when all the promises get resolved or any one of them gets rejected.

```javascript
Promise.all([Promise1, Promise2, Promise3])
	.then(result) => {
		console.log(result)
		})
	.catch(error => console.log(`Error in promises ${error}`));
```

_Note: Remember that the order of the promises(output the result) is maintained as per input order_.

## see also

- [promes](promes.md)
- [promes2](promes2.md)
- [async](async.md)
- [await](await.md)

#### References


---------

<a name="Explain-how-'this'-works-in-JavaScript"></a>
## Explain how `this` works in JavaScript

There's no simple explanation for `this`; it is one of the most confusing concepts in JavaScript. A hand-wavey explanation is that the value of `this` depends on how the function is called. I have read many explanations on `this` online, and I found [Arnav Aggrawal](https://medium.com/@arnav_aggarwal)'s explanation to be the clearest. The following rules are applied:

1. If the `new` keyword is used when calling the function, `this` inside the function is a brand new object.
2. If `apply`, `call`, or `bind` are used to call/create a function, `this` inside the function is the object that is passed in as the argument.
3. If a function is called as a method, such as `obj.method()` — `this` is the object that the function is a property of.
4. If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, `this` is the global object. In a browser, it is the `window` object. If in strict mode (`'use strict'`), `this` will be `undefined` instead of the global object.
5. If multiple of the above rules apply, the rule that is higher wins and will set the `this` value.
6. If the function is an ES2015 arrow function, it ignores all the rules above and receives the `this` value of its surrounding scope at the time it is created.

For an in-depth explanation, do check out his [article on Medium](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3).

#### Can you give an example of one of the ways that working with this has changed in ES6?

ES6 allows you to use [arrow functions](http://2ality.com/2017/12/alternate-this.html#arrow-functions) which uses the [enclosing lexical scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this). This is usually convenient, but does prevent the caller from controlling context via `.call` or `.apply`—the consequences being that a library such as `jQuery` will not properly bind `this` in your event handler functions. Thus, it's important to keep this in mind when refactoring large legacy applications.

#### References

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946


---------

<a name="What-is-REST"></a>
## What is REST?

REST APIs provide a flexible, lightweight way to integrate applications, and have emerged as the most common method for connecting components in microservices architectures.

### What is REST architecture?

REST stands for REpresentational State Transfer. REST is web standards based architecture and uses HTTP Protocol. It revolves around resource where every component is a resource and a resource is accessed by a common interface using HTTP standard methods. REST was first introduced by Roy Fielding in 2000.

A REST Server simply provides access to resources and REST client accesses and modifies the resources using HTTP protocol. Here each resource is identified by URIs/ global IDs. REST uses various representation to represent a resource like text, JSON, XML but JSON is the most popular one.

#### References

- https://www.ibm.com/cloud/learn/rest-apis
- https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm


---------

<a name="data-\*"></a>
## data-\*

Question: What is the use of data- attribute?

Answer: allow you to store extra information/data in the DOM. u can write valid html with embedded private data. You can easily access data attribute by using javascript and hence a lot of libraries like knockout uses it.

```html
<div id="myDiv" data-user="jsDude" data-list-size="5" data-maxage="180"></div>
```


---------

<a name="What-does-i18n-stand-for"></a>
## What does i18n stand for?

Internationalization

Internationalization is the design and development of a product, application or document content that enables easy localization for target audiences that vary in culture, region, or language. Internationalization is often written in English as `i18n`, where `18` is the number of letters between `i` and `n` in the English word.

---

Question

What do the terms 'internationalization' and 'localization' mean, and how are they related?

Answer:

Everyone has their own preferred definitions for these terms. We provide some general, high-level descriptions here of how we tend to use these terms on the W3C Internationalization site.

### What is the difference between localization and internationalization?

Internationalization is the process of designing a software application so that it can be adapted to various languages and regions without engineering changes. Localization is the process of adapting internationalized software for a specific region or language by translating text and adding locale-specific components.

#### References

- https://www.w3.org/International/questions/qa-i18n


---------

<a name="doctype"></a>
## doctype

Question: What is doctype? Why do u need it?

Answer: doctype is an instruction to the browser to inform about the version of html document and how browser should render it.

It ensures how element should be displayed on the page by most of the browser. And it also makes browser's life easier. otherwise, browser will guess and will go to **quirks mode**. Moreover, doctype is required to validate markup.

```html
<!DOCTYPE html>

<meta charset="UTF-8" />
```

extra: this the first tag of html file, don't need a closing tag and not case sensitive.

## related

- [quirks-mode](quirks-mode.md)


---------

<a name="Quirks-Mode-and-Standards-Mode"></a>
## Quirks Mode and Standards Mode

Quirks mode refers to a technique used by some web browsers for the sake of maintaining backward compatibility with web pages designed for old web browsers instead of strictly complying with W3C and IETF standards in standards mode.

In quirks mode, layout emulates nonstandard behavior in Navigator 4 and Internet Explorer 5. ... In full standards mode, the behavior is (hopefully) the behavior described by the HTML and CSS specifications. In almost standards mode, there are only a very small number of quirks implemented.28 Jul 2021

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>
  <body></body>
</html>
```

## related

- [doctype](doctype.md)

#### References

- https://en.wikipedia.org/wiki/Quirks_mode
- https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode


---------

<a name="http-request"></a>
## http request

Question: Does the following trigger http request at the time of page load?

```html
<img src="mypic.jpg" style="visibility: hidden" alt="My photo" />
```

Answer: yes

```html
<div style="display: none;">
  <img src="mypic.jpg" alt="My photo" />
</div>
```

Answer: yes

#### References


---------

<a name="download-order"></a>
## download order

Question: Does style1.css have to be downloaded and parsed before style2.css can be fetched?

```html
<head>
  <link href="style1.css" rel="stylesheet" />
  <link href="style2.css" rel="stylesheet" />
</head>
```

Answer: No

Question: Does style2.css have to be downloaded and parsed before Paragraph 1 is rendered on the page?

```html
<head>
  <link href="style1.css" rel="stylesheet" />
</head>
<body>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <link href="style2.css" rel="stylesheet" />
</body>
```

Answer: yes

## load and execute order of scripts

If you aren't dynamically loading scripts or marking them as `defer` or `async`, then scripts are loaded in the order encountered in the page. It doesn't matter whether it's an external script or an inline script - they are executed in the order they are encountered in the page. Inline scripts that come after external scripts are held until all external scripts that came before them have loaded and run.

`Async` scripts (regardless of how they are specified as `async`) load and run in an unpredictable order. The browser loads them in parallel and it is free to run them in whatever order it wants.

There is no predictable order among multiple `async` things. If one needed a predictable order, then it would have to be coded in by registering for load notifications from the `async` scripts and manually sequencing javascript calls when the appropriate things are loaded.

When a script tag is inserted dynamically, how the execution order behaves will depend upon the browser. You can see how Firefox behaves in this reference article. In a nutshell, the newer versions of Firefox default a dynamically added script tag to `async` unless the script tag has been set otherwise.

A script tag with `async` may be run as soon as it is loaded. In fact, the browser may pause the parser from whatever else it was doing and run that script. So, it really can run at almost any time. If the script was cached, it might run almost immediately. If the script takes awhile to load, it might run after the parser is done. The one thing to remember with `async` is that it can run anytime and that time is not predictable.

A script tag with `defer` waits until the entire parser is done and then runs all scripts marked with `defer` in the order they were encountered. This allows you to mark several scripts that depend upon one another as `defer`. They will all get postponed until after the document parser is done, but they will execute in the order they were encountered preserving their dependencies. I think of `defer` like the scripts are dropped into a queue that will be processed after the parser is done. Technically, the browser may be downloading the scripts in the background at any time, but they won't execute or block the parser until after the parser is done parsing the page and parsing and running any inline scripts that are not marked `defer` or `async`.

![](../../img/lHuHk.png)

#### References

- https://addyosmani.com/blog/script-priorities/
- https://stackoverflow.com/questions/8996852/load-and-execute-order-of-scripts
- https://www.fatalerrors.org/a/loading-order-of-content-in-html-page-easy-to-understand.html
- https://flaviocopes.com/javascript-async-defer/


---------

<a name="span-vs-div"></a>
## span vs div

Question: What is the difference between `span` and `div`?

Answer: `div` is a block element and `span` is inline element.

Extra: It is illegal to put block element inside inline element. `div` can have `a`,`p` tag and `a`,`p` tag can have a `span`. However, `span` can't have a `div` or `p` tag inside.

#### References

ref: Stackoverflow: div vs span


---------

<a name="div,-section-&-article"></a>
## div, section & article

Question: When should you use section, div or article?

Answer:

<section>, group of content inside is related to a single theme, and should appear as an entry in an outline of the page. It’s a chunk of related content, like a subsection of a long article, a major part of the page (eg the news section on the homepage), or a page in a webapp’s tabbed interface. A section normally has a heading (title) and maybe a footer too.

<article>, represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.

<div>, on the other hand, does not convey any meaning, aside from any found in its class, lang and title attributes.

Good Summary:div, section & article

Extra: Authors are strongly encouraged to view the div element as an element of last resort, for when no other element is suitable. Use of more appropriate elements instead of the div element leads to better accessibility for readers and easier maintainability for authors.

ref: (copied from) W3C: section, W3C: div, W3c: article


---------

