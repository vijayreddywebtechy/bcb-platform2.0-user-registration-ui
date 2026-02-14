# FloatingLabelInput Component

A professional, fully-featured Material Design outlined text field with floating label animation.

## Features

✅ **Material Design Compliant** - Follows Google's Material Design specifications  
✅ **Floating Label Animation** - Smooth label transition on focus/input  
✅ **Border Cut Effect** - Native fieldset/legend implementation (no white background hack)  
✅ **Fully Accessible** - ARIA labels, keyboard navigation, screen reader support  
✅ **Error States** - Built-in validation message display  
✅ **Helper Text** - Optional descriptive text below input  
✅ **Dark Mode Support** - Automatic dark mode detection  
✅ **Autofill Detection** - Handles browser autofill gracefully  
✅ **Disabled State** - Proper disabled styling  
✅ **TypeScript** - Full type safety with exported interfaces  
✅ **Isolated Styles** - CSS modules ensure no style conflicts

## Installation

The component is self-contained in the `components/ui` directory:

- `FloatingLabelInput.tsx` - Component logic
- `FloatingLabelInput.module.css` - Scoped styles

## Basic Usage

```tsx
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";

function MyForm() {
  return <FloatingLabelInput label="Email Address" type="email" />;
}
```

## Controlled Component

```tsx
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { useState } from "react";

function MyForm() {
  const [email, setEmail] = useState("");

  return (
    <FloatingLabelInput
      label="Email Address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
```

## With Helper Text

```tsx
<FloatingLabelInput
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

## With Error State

```tsx
<FloatingLabelInput
  label="Email"
  type="email"
  value={email}
  error={!isValidEmail(email)}
  errorText="Please enter a valid email address"
/>
```

## With All Props

```tsx
<FloatingLabelInput
  label="Username"
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  helperText="Choose a unique username"
  error={usernameExists}
  errorText="This username is already taken"
  disabled={isLoading}
  required
  minLength={3}
  maxLength={20}
  wrapperClassName="my-custom-wrapper"
/>
```

## Props

| Prop                        | Type      | Default        | Description                                 |
| --------------------------- | --------- | -------------- | ------------------------------------------- |
| `label`                     | `string`  | **required**   | Label text that floats above the input      |
| `helperText`                | `string`  | `undefined`    | Helper text displayed below the input       |
| `error`                     | `boolean` | `false`        | Whether the input is in an error state      |
| `errorText`                 | `string`  | `undefined`    | Error message to display when error is true |
| `wrapperClassName`          | `string`  | `undefined`    | Custom class name for the wrapper div       |
| `value`                     | `string`  | `undefined`    | Controlled value                            |
| `defaultValue`              | `string`  | `undefined`    | Uncontrolled default value                  |
| `disabled`                  | `boolean` | `false`        | Whether the input is disabled               |
| `id`                        | `string`  | auto-generated | HTML id attribute                           |
| ...all standard input props |           |                | Supports all native HTML input attributes   |

## Styling Customization

The component uses CSS modules for complete style isolation. To customize:

1. **Override via wrapper class:**

```tsx
<FloatingLabelInput label="Custom" wrapperClassName="my-custom-styles" />
```

2. **Modify the CSS module directly:**
   Edit `FloatingLabelInput.module.css` to change colors, spacing, etc.

## Accessibility

The component is fully accessible:

- ✅ Proper `label` and `htmlFor` associations
- ✅ `aria-invalid` for error states
- ✅ `aria-describedby` linking to helper text
- ✅ `role="alert"` for error messages
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Examples

### Login Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <FloatingLabelInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FloatingLabelInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </form>
  );
}
```

### Registration Form with Validation

```tsx
function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateUsername = (value: string) => {
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    setUsernameError("");
    return true;
  };

  return (
    <FloatingLabelInput
      label="Username"
      value={username}
      onChange={(e) => {
        setUsername(e.target.value);
        validateUsername(e.target.value);
      }}
      error={!!usernameError}
      errorText={usernameError}
      helperText="Choose a unique username (3-20 characters)"
    />
  );
}
```

## Notes

- The component is **completely isolated** - styles won't affect other components
- Uses native browser `<fieldset>` and `<legend>` for the border cut effect
- No white background hack - works on any background color
- Supports both controlled and uncontrolled modes
- Auto-generates unique IDs if not provided
- Handles browser autofill automatically
