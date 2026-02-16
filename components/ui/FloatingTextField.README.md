# FloatingTextField Component

A reusable React component that replicates Material UI's Outlined TextField with floating label behavior.

## Overview

The `FloatingTextField` component provides a polished, accessible text input field that follows Material Design specifications. It features a smooth floating label animation, proper border states, and comprehensive accessibility support.

## Features

✅ **Three distinct states:**

- **Default**: Label inside input, default border
- **Active/Typing**: Label floats to top, highlighted border, cursor visible
- **Populated**: Label remains floating, value visible, default border

✅ **Material Design compliant:**

- Smooth label animation (16px → 12px)
- Native fieldset/legend for border cut effect
- Proper color transitions and timing

✅ **Accessibility:**

- ARIA attributes for screen readers
- Proper focus management
- Keyboard navigation support

✅ **Additional features:**

- Error states with validation messages
- Helper text support
- Dark mode support
- Autofill detection
- Disabled state
- All standard HTML input attributes

## Installation

The component is already created in your project at:

- `components/ui/FloatingTextField.tsx`
- `components/ui/FloatingTextField.module.css`

## Usage

### Basic Example

```tsx
import { FloatingTextField } from "@/components/ui/FloatingTextField";

function MyForm() {
  return (
    <FloatingTextField label="Username" helperText="Enter your username" />
  );
}
```

### Controlled Component

```tsx
import { useState } from "react";
import { FloatingTextField } from "@/components/ui/FloatingTextField";

function MyForm() {
  const [email, setEmail] = useState("");

  return (
    <FloatingTextField
      label="Email Address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      helperText="We'll never share your email"
    />
  );
}
```

### With Error State

```tsx
<FloatingTextField
  label="Email Address"
  type="email"
  error={true}
  errorText="Please enter a valid email address"
/>
```

### Disabled State

```tsx
<FloatingTextField
  label="Disabled Field"
  value="Cannot edit this"
  disabled={true}
  helperText="This field is disabled"
/>
```

### Different Input Types

```tsx
{
  /* Password */
}
<FloatingTextField label="Password" type="password" />;

{
  /* Phone */
}
<FloatingTextField label="Phone Number" type="tel" />;

{
  /* Date */
}
<FloatingTextField label="Date of Birth" type="date" />;
```

## Props

| Prop               | Type                  | Default        | Description                                 |
| ------------------ | --------------------- | -------------- | ------------------------------------------- |
| `label`            | `string`              | **required**   | Label text that floats above the input      |
| `helperText`       | `string`              | `undefined`    | Helper text displayed below the input       |
| `error`            | `boolean`             | `false`        | Whether the input is in an error state      |
| `errorText`        | `string`              | `undefined`    | Error message to display when error is true |
| `wrapperClassName` | `string`              | `undefined`    | Custom class name for the wrapper div       |
| `id`               | `string`              | auto-generated | HTML id attribute for the input             |
| `disabled`         | `boolean`             | `false`        | Whether the input is disabled               |
| `value`            | `string`              | `undefined`    | Controlled value                            |
| `defaultValue`     | `string`              | `undefined`    | Uncontrolled default value                  |
| `onChange`         | `function`            | `undefined`    | Change event handler                        |
| `onFocus`          | `function`            | `undefined`    | Focus event handler                         |
| `onBlur`           | `function`            | `undefined`    | Blur event handler                          |
| ...rest            | `InputHTMLAttributes` | -              | All standard HTML input attributes          |

## Component States

### 1. Default State

- Label positioned inside the input field
- Border: 1px solid rgba(0, 0, 0, 0.23)
- Label font-size: 16px
- Label color: rgba(0, 0, 0, 0.6)

### 2. Active/Typing State (Focused)

- Label floats to top of border
- Border: 2px solid #1976d2 (primary color)
- Label font-size: 12px
- Label color: #1976d2
- Background color added to label to cover border

### 3. Populated State (Has Value)

- Label remains floating at top
- Border returns to default (1px)
- Value visible in input field
- Label maintains 12px font-size

### 4. Error State

- Border: 1px solid #d32f2f (red)
- Label color: #d32f2f
- Error text displayed below input
- When focused: 2px solid #d32f2f

### 5. Disabled State

- Border: dotted style
- Reduced opacity
- Cursor: not-allowed
- No interaction possible

## Styling

The component uses CSS Modules for scoped styling. All styles are contained in `FloatingTextField.module.css`.

### Customization

You can customize the component by:

1. **Using the `wrapperClassName` prop:**

```tsx
<FloatingTextField label="Username" wrapperClassName="my-custom-wrapper" />
```

2. **Modifying the CSS module:**
   Edit `FloatingTextField.module.css` to change colors, sizes, or animations.

### Color Customization

Key color variables in the CSS:

- Default border: `rgba(0, 0, 0, 0.23)`
- Hover border: `rgba(0, 0, 0, 0.87)`
- Focus border: `#1976d2` (primary)
- Error border: `#d32f2f` (error)
- Label color: `rgba(0, 0, 0, 0.6)`

## Dark Mode

The component automatically supports dark mode via `prefers-color-scheme: dark` media query.

Dark mode colors:

- Border: `rgba(255, 255, 255, 0.23)`
- Focus: `#8ab4f8`
- Label background: `#1c1b1f`

## Accessibility

The component includes:

- Proper `<label>` association with `htmlFor`
- `aria-invalid` for error states
- `aria-describedby` for helper/error text
- `role="alert"` for error messages
- Keyboard navigation support
- Focus visible states

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Demo

A demo page is available at `components/ui/FloatingTextFieldDemo.tsx` showcasing all states and variations.

To view the demo, import and render the component:

```tsx
import FloatingTextFieldDemo from "@/components/ui/FloatingTextFieldDemo";

// In your page
<FloatingTextFieldDemo />;
```

## Comparison with FloatingLabelInput

Both components are available in the project:

| Feature         | FloatingTextField   | FloatingLabelInput |
| --------------- | ------------------- | ------------------ |
| Material Design | ✅ Full spec        | ✅ Full spec       |
| Label animation | 16px → 12px         | Customizable       |
| Border colors   | MD3 colors          | Custom colors      |
| Transitions     | 200ms               | 150ms              |
| Use case        | New implementations | Existing code      |

**Recommendation:** Use `FloatingTextField` for new implementations as it follows the latest Material Design 3 specifications.

## License

Part of the BizHub User Registration project.

## Support

For issues or questions, please contact the development team.
