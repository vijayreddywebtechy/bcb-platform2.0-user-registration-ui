# ReactSelect Component

A reusable wrapper around react-select with built-in custom styles that match the shadcn design system.

## Usage

### Basic Example

```tsx
import { ReactSelect, SelectOption } from "@/components/ui/react-select";

const options: SelectOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  );

  return (
    <ReactSelect
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      placeholder="Select an option..."
    />
  );
}
```

### With Label

```tsx
import { ReactSelect, SelectOption } from "@/components/ui/react-select";
import { Label } from "@/components/ui/label";

function MyComponent() {
  const [value, setValue] = useState<SelectOption | null>(null);

  return (
    <div>
      <Label htmlFor="my-select">Choose an option</Label>
      <ReactSelect
        id="my-select"
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Select..."
      />
    </div>
  );
}
```

### Custom Styles Override (Optional)

If you need to override specific styles:

```tsx
import { ReactSelect } from "@/components/ui/react-select";
import { StylesConfig } from "react-select";

const customOverrides: StylesConfig = {
  control: (base) => ({
    ...base,
    minHeight: "60px", // Override the default height
  }),
};

function MyComponent() {
  return (
    <ReactSelect
      options={options}
      customStyles={customOverrides}
      placeholder="Select..."
    />
  );
}
```

## Features

- ✅ Pre-configured styles matching shadcn design system
- ✅ Consistent with other form inputs (Input, Button, etc.)
- ✅ Proper focus states and hover effects
- ✅ Responsive dropdown with proper spacing
- ✅ TypeScript support with SelectOption type
- ✅ Optional custom style overrides

## Props

All standard react-select props are supported, plus:

- `customStyles` (optional): StylesConfig to override default styles
- All other props from react-select's Props interface

## SelectOption Type

```typescript
interface SelectOption {
  value: string;
  label: string;
}
```
