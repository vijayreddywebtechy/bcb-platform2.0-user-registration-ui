# ActionCard Component

A dynamic, reusable action card component built with Next.js, TypeScript, Tailwind CSS v3, and Lucide Icons.

## Installation

First, make sure you have the required dependencies:

```bash
npm install lucide-react
# or
yarn add lucide-react
# or
pnpm add lucide-react
```

## Features

- ✨ Dynamic status states (completed, active, pending)
- 🎨 Customizable colors and icons
- 🔄 Smooth hover animations
- ❌ Optional close button with custom behavior
- 📱 Responsive design
- ♿ TypeScript support
- 🎯 Click handlers for interactivity

## Usage

### Basic Usage

```tsx
import ActionCard from './ActionCard';
import { User } from 'lucide-react';

function MyPage() {
  return (
    <ActionCard
      stepNumber={1}
      title="Profile Registration"
      description="Create or confirm a new digital profile to access the Business Hub."
      icon={User}
      status="completed"
      onActionClick={() => console.log('Card clicked!')}
    />
  );
}
```

### With Custom Background Color

```tsx
<ActionCard
  stepNumber={2}
  title="Identity Verification"
  description="Scan your face to confirm your identity."
  icon={ScanFace}
  status="active"
  bgColor="bg-blue-600"
  onActionClick={() => handleVerification()}
/>
```

### With Close Button

```tsx
const [isVisible, setIsVisible] = useState(true);

return isVisible ? (
  <ActionCard
    stepNumber={1}
    title="Profile Registration"
    description="Create or confirm a new digital profile."
    icon={User}
    status="completed"
    showClose={true}
    onClose={() => setIsVisible(false)}
    onActionClick={() => console.log('Card clicked')}
  />
) : null;
```

### Full Example with Multiple Cards

```tsx
import ActionCard from './ActionCard';
import { User, ScanFace, Link2 } from 'lucide-react';
import { useState } from 'react';

export default function OnboardingFlow() {
  const [visibleCards, setVisibleCards] = useState([1, 2, 3]);

  const steps = [
    {
      stepNumber: 1,
      title: 'Profile Registration',
      description: 'Create or confirm a new digital profile to access the Business Hub.',
      icon: User,
      status: 'completed' as const,
      bgColor: 'bg-green-600',
    },
    {
      stepNumber: 2,
      title: 'Identity Verification',
      description: 'Scan your face to confirm your identity and link yourself to your Business Hub profile.',
      icon: ScanFace,
      status: 'active' as const,
      bgColor: 'bg-blue-600',
    },
    {
      stepNumber: 3,
      title: 'Business Linking',
      description: "Get authorisation to link and access your business's accounts on the Business Hub.",
      icon: Link2,
      status: 'pending' as const,
      bgColor: 'bg-gray-600',
    },
  ];

  const handleStepClick = (stepNumber: number) => {
    console.log(`Step ${stepNumber} clicked`);
    // Add your navigation or action logic here
  };

  const handleClose = (stepNumber: number) => {
    console.log(`Step ${stepNumber} dismissed`);
    setVisibleCards(visibleCards.filter(id => id !== stepNumber));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps
            .filter(step => visibleCards.includes(step.stepNumber))
            .map((step) => (
              <ActionCard
                key={step.stepNumber}
                {...step}
                showClose={true}
                onActionClick={() => handleStepClick(step.stepNumber)}
                onClose={() => handleClose(step.stepNumber)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stepNumber` | `number` | Yes | The step number to display |
| `title` | `string` | Yes | The card title |
| `description` | `string` | Yes | The card description text |
| `icon` | `LucideIcon` | Yes | Icon component from lucide-react |
| `status` | `'completed' \| 'active' \| 'pending'` | Yes | Current status of the action |
| `bgColor` | `string` | No | Custom Tailwind background color class |
| `showClose` | `boolean` | No | Show close button in top-right corner (default: false) |
| `onActionClick` | `() => void` | No | Callback function when card is clicked |
| `onClose` | `() => void` | No | Callback function when close button is clicked |

## Status States

The component has three built-in status states:

- **completed**: Green background with "Done" badge and checkmark
- **active**: Blue background with arrow indicator
- **pending**: Gray background with arrow indicator

## Close Button

The close button is optional and can be enabled with the `showClose` prop. When enabled:

- Displays an X icon in the top-right corner
- Prevents card click when closing (uses `stopPropagation`)
- Requires both `showClose={true}` and an `onClose` callback
- Commonly used for dismissible notifications or removable steps

**Example use cases:**
- Dismissible onboarding steps
- Removable task cards
- Closeable notifications
- Temporary alerts or tips

```tsx
// Enable close button
<ActionCard
  showClose={true}
  onClose={() => console.log('Card dismissed')}
  // ... other props
/>

// Disable close button (default)
<ActionCard
  showClose={false}
  // or simply omit showClose
  // ... other props
/>
```

## Customization

### Custom Colors

You can override the default colors by passing a `bgColor` prop:

```tsx
<ActionCard
  bgColor="bg-purple-600"
  // ... other props
/>
```

### Custom Icons

Use any icon from the [Lucide Icons](https://lucide.dev/) library:

```tsx
import { Shield, Bell, Settings } from 'lucide-react';

<ActionCard icon={Shield} /* ... */ />
```

## Tailwind Configuration

Make sure your `tailwind.config.js` includes the necessary colors:

```js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Responsive Design

The component is fully responsive:
- Mobile: Single column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

## Browser Support

Works on all modern browsers that support:
- CSS Grid
- Flexbox
- CSS Transitions
- backdrop-filter (for blur effects)

## License

MIT
