## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

Pure Component decides if it should be re-rendered based on shallow props comparison and will ignore potential re-renders based on the context changes.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Similar as with Pure Component, shouldComponentUpdate is looking only for props and state changes ignoring everything else. If our app depends on the changes within context we may miss important UI update.

## 3. Describe 3 ways to pass information from a component to its PARENT.
 - Passing callback from parent to child that would call it with its data making it available for the parent
 - Using methods that comes from the context, to update either directly parent or some other ancestor component in the tree that would finally pass the data to the parent
 - Parent may get access to child via forwardRef method where once created ref within parent might be passed to the children

## 4. Give 2 ways to prevent components from re-rendering.
 - Use empty dependency array while using hooks
 - Use React.memo and to provide logic when component should be updated

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
 - React maintains component tree and every component should start from single node. Using fragment would allow us to not artificially create DOM elements where we don't need them. 

## 6. Give 3 examples of the HOC pattern.
 - Connecting presentational component to store or any other context related logic so the component itself does not need to know about where the data comes from
 - Composing components to create several variations of the same main component like : success, error, warning notifications where they all share `message` base component
 - Adding validation to form elements where every error message is being displayed in the unified way

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
  - We use .catch method from the promise to handle errors `Promise.reject(new Error('Something went wrong')).then(...).catch((err => // do something here ). We can also chain catch methods
  - Callbacks provide a structure where usually first arguments stands for error and second for data. Handling multiple errors requires nesting multiple callbacks leading to unmaintainable code
  - Within async await we need to provide try catch blocks around code that would throw an exception because we approach the code as it was synchronous one

## 8. How many arguments does setState take and why is it async
 - `setState` takes 2 arguments, the value to update state with and callback called when state is actually being updated. setState is async to allow for batching several state updates together and other optimizations within the library

## 9. List the steps needed to migrate a Class to Function Component.
 - Make sure it's well tested before refactoring
 - Identify the initial state and move it to useState hooks
 - Migrate shouldComponentUpdate or pure component extend to react.memo
 - Move lifecycle methods to use useEffect
 - Move the code from bound methods to useCallbacks to prevent accidental re-renders
 - Move code from the render to the return value of the function component
 - Run the tests to make sure everything works as expected
 - Check for accidental re-renders with `why-did-you-render` tools within an actual app

## 10. List a few ways styles can be used with components.
- Inline styles
- Providing classNames from regular css stylesheets
- Providing classNames from imported module scoped CSS modules
- Using CSS in JS library to inject styles dynamically

## 11. How to render an HTML string coming from the server.
- Once we have html being rendered in the browser we can hydrate it with the code bundled in JS file to add all interactivity. We can hydrate entire component tree at once or try to selectively, partially hydrate the elements that we need at the moment
