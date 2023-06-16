<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://github.com/CHNsPart/chnsui/assets/58574102/62a0fef5-a070-4f9b-b9d3-c9fc7567e912" height="200px" width="auto" alt="CHNsUI Logo">
</div>


# CHNsUI - React Reusable Component Library with TailwindCSS

CHNsUI is a collection of reusable React components built with TailwindCSS, providing a quick and easy way to create beautiful UIs for your web projects.


## Getting Started

To use CHNsUI in your React project, you can install it via npm:

```bash
npm install chnsui
```

Once installed, you can import and use any component from CHNsUI in your project.  _(Don't forget to import css file)_

```jsx
import { Button } from 'chnsui';
import 'chnsui/dist/styles.css'

function MyComponent() {
  return <Button>Click me!</Button>;
}
```

## Available Components

CHNsUI provides a variety of components that you can use in your projects:
```jsx
<Button
<Heading/>
<Paragraph/>
```

## Button

A customizable button component with various color and size options.

```jsx
import { Button } from 'chnsui';
import 'chnsui/dist/styles.css'

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

### Props

The `Button` component supports several props that can be used to customize its appearance and behavior:

| Prop Name   | Type    | Default     | Description                                                                                                                                  |
| ----------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`   | string  | `'default'` | The variant of the button. Possible values are `'default'`, `'destructive'`, `'outline'`, `'subtle'`, `'ghost'`, `'link'`, and `'withRing'`. |
| `size`      | string  | `'default'` | The size of the button. Possible values are `'default'`, `'sm'`, and `'lg'`.                                                                 |
| `href`      | string  | `undefined` | The URL that the button should link to. If this prop is provided, the button will render as an anchor tag instead of a button.               |
| `target`    | string  | `undefined` | The target attribute for the link.                                                                                                           |
| `className` | string  | `undefined` | Additional classes to be added to the button.                                                                                                |
| `disabled`  | boolean | `false`     | Whether the button is disabled or not.                                                                                                       |

### Examples

Here are some examples of how to use the `Button` component with different props:

```jsx
import React from 'react';
import { Button } from 'chnsui';
import 'chnsui/dist/styles.css'

function App() {
  return (
    <div>
      <Button variant="default">Default Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="subtle">Subtle Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link" href="https://google.com" target="_blank">
        Link Button
      </Button>
      <Button variant="withRing">Button with Ring</Button>
      <Button size="sm">Small Button</Button>
      <Button size="lg">Large Button</Button>
      <Button className="bg-yellow-500">Custom Class Button</Button>
      <Button disabled>Disabled Button</Button>
    </div>
  );
}
```

## Heading

The `Heading` component is a reusable React component that renders a heading element with configurable styles. It provides a range of props that enable the customization of the element's text size, color, font weight, alignment, text transformation, decoration, width, animation, and more. 

Here's a table documentation of the component's props:

| Prop Name      | Type        | Default     | Description                                                                                                                                                                                                                                                                                                                                                            |
| -------------- | ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`      | `string`    | `h1`        | Specifies the size and style of the heading. Accepted values are `h1`, `h2`, `h3`, `h4`, `h5`, and `h6`.                                                                                                                                                                                                                                                               |
| `colors`       | `string`    | `primary`   | Specifies the color scheme of the heading. Accepted values are `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success`, `info`, `dark`, and `light`.                                                                                                                                                                                                        |
| `weight`       | `string`    | `null`      | Specifies the font weight of the heading. Accepted values are `thin`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, and `black`.                                                                                                                                                                                                                       |
| `align`        | `string`    | `null`      | Specifies the alignment of the heading text. Accepted values are `left`, `center`, `right`, and `justify`.                                                                                                                                                                                                                                                             |
| `transform`    | `string`    | `null`      | Specifies the text transformation of the heading. Accepted values are `uppercase`, `lowercase`, `capitalize`, and `normalcase`.                                                                                                                                                                                                                                        |
| `decoration`   | `string`    | `null`      | Specifies the decoration of the heading text. Accepted values are `underline`, `lineThrough`, and `noUnderline`.                                                                                                                                                                                                                                                       |
| `quickie`      | `string`    | `null`      | Applies predefined styles to the heading text. Accepted values are `q_grad_watermelone`, `q_grad_aqua`, `q_grad_rasta`, `q_grad_lemon`, `q_grad_rose`, `q_line`, `q_line_sync`, `qc_leanFull`, `qc_leanLeft`, `qc_leanRight`, `qc_leanHalf`, `qc_leanLeftHalf`, `qc_leanRightHalf`, `qc_short`, `qc_shortLeft`, `qc_shortRight`, `shortCenter`, and `qc_shortJustify`. |
| `animations`   | `string`    | `null`      | Applies predefined CSS animations to the heading. Accepted values are `x_wave`, `x_jello`, `x_rubberBand`, `x_flash`, `x_wiggle`, `x_bounce`, `x_spin`, `x_pulse`, and `x_ping`.                                                                                                                                                                                       |
| `sectionWidth` | `string`    | `null`      | Specifies the width of the heading. Accepted values are `full`, `half`, `third`, and `fourth`.                                                                                                                                                                                                                                                                         |
| `className`    | `string`    | `undefined` | A string of CSS classes to apply to the heading element.                                                                                                                                                                                                                                                                                                               |
| `children`     | `ReactNode` | `undefined` | The content of the heading element.                                                                                                                                                                                                                                                                                                                                    |

And here's an example of how to use the `Heading` component:

```jsx
import React from 'react';
import { Heading } from 'chnsui';
import 'chnsui/dist/styles.css'

const App = () => {
  return (
    <div>
      <Heading 
        variant="h1" 
        colors="primary" 
        weight="bold" 
        align="center" 
        transform="uppercase" 
        decoration="noUnderline" 
        quickie="q_grad_watermelone x_bounce" 
        animations="x_wave" 
        sectionWidth="full"
      >
        Hello, world!
      </Heading>
  )
}
```

In this example, we import the `Heading` component from the Chakra UI library and use it to render a heading on our website. We pass two props to the `Heading` component: `as` and `size`. 

The `as` prop specifies what HTML tag the heading should be rendered as. In this case, we want the heading to be an `<h1>` tag, so we set `as="h1"`. 

The `size` prop specifies the size of the heading. In this case, we want the heading to be extra large, so we set `size="xl"`. 

Inside the `Heading` component, we provide the text we want to display as the heading. In this example, we're displaying the text "Welcome to my website!".


## Paragraph

The `Paragraph` component is a versatile text component that can display text in various styles and colors. It is built using `class-variance-authority` for easy class management and comes with a variety of default and custom variants to choose from.

Props:


| Prop name  | Type      | Description                                                                                                                                                                                                              | Default value       |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| className  | string    | Additional class name(s) to be added to the component's root element.                                                                                                                                                    | `""` (empty string) |
| children   | ReactNode | The content to be rendered inside the paragraph element.                                                                                                                                                                 | `undefined`         |
| variant    | string    | The visual style of the paragraph. Valid values: `"default"`, `"darkGlass"`, `"glass"`, `"bg"`, `"bgGlass"`, `"transparent"`.                                                                                            | `"default"`         |
| colors     | string    | The color scheme of the paragraph. Valid values: `"primary"`, `"secondary"`, `"tertiary"`, `"danger"`, `"warning"`, `"success"`, `"info"`, `"dark"`, `"light"`.                                                          | `"primary"`         |
| badge      | string    | The background color scheme of a badge to be displayed on the paragraph. Valid values: `"default"`, `"secondary"`, `"tertiary"`, `"danger"`, `"warning"`, `"success"`, `"info"`, `"dark"`, `"light"`, `null` (no badge). | `null`              |
| sizes      | string    | The size of the text. Valid values: `"sm"`, `"md"`, `"lg"`, `"xl"`, `null` (default size).                                                                                                                               | `null`              |
| weight     | string    | The font weight. Valid values: `"thin"`, `"light"`, `"normal"`, `"medium"`, `"semibold"`, `"bold"`, `"extrabold"`, `"black"`, `null` (default font weight).                                                              | `null`              |
| align      | string    | The text alignment. Valid values: `"left"`, `"center"`, `"right"`, `"justify"`, `null` (default text alignment).                                                                                                         | `null`              |
| transform  | string    | The text transform. Valid values: `"uppercase"`, `"lowercase"`, `"capitalize"`, `"normalcase"`, `null` (no text transform).                                                                                              | `null`              |
| decoration | string    | The text decoration. Valid values: `"underline"`, `"lineThrough"`, `"noUnderline"`, `null` (no text decoration).                                                                                                         | `null`              |
| bg         | boolean   | Whether to apply a background color to the paragraph or not. Valid values: `true`, `false`.                                                                                                                              | `null`              |


And here's an example of how to use the `Paragraph` component with some of its props:

```jsx
import { Paragraph } from 'chnsui'
import 'chnsui/dist/styles.css'

function MyComponent() {
  return (
    <>
      <Paragraph variant={"transparent"} colors="warning" badge={"warning"}>
        This is a warning message.
      </Paragraph>
      <Paragraph sizes="lg" align="center" decoration="lineThrough">
        This paragraph has large font size, centered text, and a line-through decoration.
      </Paragraph>
    </>
  )
}
```

Example:

```jsx
import { Paragraph } from 'chnsui'
import 'chnsui/dist/styles.css'

const App = () => {
  return (
    <>
      <Paragraph bg colors="secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit voluptatem 
          incidunt deleniti modi voluptate, hic cumque adipisci eveniet error exercitationem,
          vitae voluptatum ducimus. Maiores enim totam aperiam explicabo a quae. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Sit voluptatem incidunt deleniti modi 
          voluptate, hic cumque adipisci eveniet error exercitationem, vitae voluptatum ducimus.
          Maiores enim totam aperiam explicabo a quae.
      </Paragraph>
      
      <div className="w-full flex flex-row gap-5">
        <Paragraph colors="dark" variant={"transparent"} badge={"dark"}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at consectetur. 
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at consectetur.
        </Paragraph>
        <Paragraph colors="warning" badge={"warning"} variant={"transparent"}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at consectetur.
        </Paragraph>
      </div>
    </>
  )
}
``` 

## Table

The Table component is a customizable `Table` wrapper that provides styling and variant options for creating tables in React applications.

Props:

| Prop Name | Type                            | Default Value | Description                                              |
| --------- | ------------------------------- | ------------- | -------------------------------------------------------- |
| variant   | `'default' \| 'bg' \| 'border'` | `null`        | The variant applied to the table head.                   |
| className | `string`                        | `undefined`   | Additional CSS class to apply to the table head element. |
| alignment | `'left' \| 'center' \| 'right'` | `'left'`      | The horizontal alignment of the table head content.      |
| children  | `React.ReactNode \| null`       | `null`        | The content to display within the table head.            |

Note: The `...rest` prop in the `Table` component is used to pass any additional HTML attributes to the underlying `<table>` element.

Example:
```jsx
import { Paragraph } from "chnsui";
import { Table, TableHead, TableBody, Td, Th, Tr } from "chnsui";
import 'chnsui/dist/styles.css'

export const TableRaw: React.FC = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Paragraph>Default Table</Paragraph>
      <Table>
        <Tr>
            <Th>Kings Treasury</Th>
            <Th>Peoples happiness</Th>
        </Tr>
        <Tr>
            <Td>Empty</Td>
            <Td>Overflowing</Td>
        </Tr>
      </Table>
    </div>
  );
};
export const TableRawSecondary: React.FC = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Paragraph>Default Table</Paragraph>
      <Table variant={"bg"}>
        <TableHead alignment="center">
            <Tr variant={"default"}>
                <Th>Kings Treasury</Th>
                <Th>Kings Treasury</Th>
                <Th>Peoples happiness</Th>
                <Th>Peoples happiness</Th>
            </Tr>
         </TableHead>
         <TableBody alignment="center">
            <Tr variant={"bg"}>
                <Td>Empty</Td>
                <Td>Overflowing</Td>
                <Td variant={"bg"}>.</Td>
                <Td>Overflowing</Td>
            </Tr>
            <Tr variant={"bg"}>
                <Td>Empty</Td>
                <Td>Overflowing</Td>
                <Td>Overflowing</Td>
            </Tr>
            <Tr variant={"bg"}>
                <Td variant={"bg"}>.</Td>
                <Td>Overflowing</Td>
                <Td>Overflowing</Td>
                <Td>Overflowing</Td>
            </Tr>
        </TableBody>
      </Table>
    </div>
  );
};

export const TableSimple = () => {
  return (
    <Table padding="all" alignmentment="center" variant="bg" className="custom-table">
      <TableHead variant="bg" alignment="center">
        <Tr>
          <Th>Header 1</Th>
          <Th>Header 2</Th>
        </Tr>
      </TableHead>
      <TableBody>
        <Tr>
          <Td>Cell 1</Td>
          <Td>Cell 2</Td>
        </Tr>
        <Tr>
          <Td>Cell 3</Td>
          <Td>Cell 4</Td>
        </Tr>
      </TableBody>
    </Table>
  );
};


```

And here's an example of how to use the `Table` component with some of its props:

## Author

This React component library with TailwindCSS is created and maintained by Touhidul Islam Chayan.

## License

CHNsUI is licensed under the MIT License. See the [LICENSE](https://github.com/chnspart/chnsui/blob/main/LICENSE) file for more
