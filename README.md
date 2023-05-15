# CHNsUI - React Reusable Component Library with TailwindCSS

CHNsUI is a collection of reusable React components built with TailwindCSS, providing a quick and easy way to create beautiful UIs for your web projects.

## Getting Started

To use CHNsUI in your React project, you can install it via npm:

```bash
npm install chnsui
```

Once installed, you can import and use any component from CHNsUI in your project:

```jsx
import { Button } from 'chnsui';

function MyComponent() {
  return <Button>Click me!</Button>;
}
```

## Available Components

CHNsUI provides a variety of components that you can use in your projects:

### Button

A customizable button component with various color and size options.

```jsx
import { Button } from 'chnsui';

function MyComponent() {
  return (
    <div>
      <Button>Click me!</Button>
      <Button color="red" size="sm">Click me!</Button>
      <Button color="blue" size="lg">Click me!</Button>
    </div>
  );
}
```

## License

CHNsUI is licensed under the MIT License. See the [LICENSE](https://github.com/chnspart/chnsui/blob/main/LICENSE) file for more