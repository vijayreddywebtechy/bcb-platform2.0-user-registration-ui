# Quick Comparison Reference

## TL;DR

**FloatingTextField** ✅ is the **NEW, CORRECT** component  
**FloatingLabelInput** ❌ has a **LABEL SIZING BUG**

---

## The Critical Difference

### FloatingLabelInput (OLD - BUG) ❌

```css
.label {
  font-size: 12px; /* ❌ ALWAYS 12px - TOO SMALL when inside! */
}
```

**Visual:**

```
┌─────────────────────────────────────┐
│ Username (tiny)                     │  ← 12px (too small!)
└─────────────────────────────────────┘
```

### FloatingTextField (NEW - CORRECT) ✅

```css
.label {
  font-size: 16px; /* ✅ Normal size when inside */
}

.labelActive {
  font-size: 12px; /* ✅ Smaller when floating */
}
```

**Visual:**

```
┌─────────────────────────────────────┐
│ Username                            │  ← 16px (proper size!)
└─────────────────────────────────────┘
```

---

## Quick Comparison Table

| Feature               | FloatingTextField | FloatingLabelInput |
| --------------------- | ----------------- | ------------------ |
| Label size (default)  | **16px** ✅       | **12px** ❌        |
| Label size (floating) | 12px              | 12px               |
| Material Design 3     | ✅ Yes            | ⚠️ Close           |
| Border colors         | rgba (MD3)        | hex                |
| Transition speed      | 200ms             | 150ms              |
| Label background      | ✅ Yes            | ❌ No              |
| Documentation         | ✅ Full           | ⚠️ Basic           |
| Demo page             | ✅ Yes            | ❌ No              |

---

## What to Use

### ✅ Use FloatingTextField for:

- All new forms
- All new features
- When you want correct Material Design
- When visual quality matters

### ⚠️ Keep FloatingLabelInput for:

- Existing code (don't break it)
- Backward compatibility
- Until you can migrate

---

## Files to Check

### Comparison Demo

📁 `components/ui/ComponentComparison.tsx`  
→ Interactive side-by-side demo showing the bug

### Documentation

📁 `components/ui/COMPONENT_COMPARISON.md`  
→ Full detailed comparison

### New Component

📁 `components/ui/FloatingTextField.tsx`  
📁 `components/ui/FloatingTextField.module.css`  
📁 `components/ui/FloatingTextField.README.md`

### Old Component

📁 `components/ui/FloatingLabelInput.tsx`  
📁 `components/ui/FloatingLabelInput.module.css`

---

## The Bug Explained

**Material Design Spec:**

- Label inside input: **16px** (readable placeholder)
- Label floating above: **12px** (compact)

**FloatingLabelInput mistake:**

- Label inside input: **12px** ❌ (too small!)
- Label floating above: **12px** ✅ (correct)

**Result:** The label looks tiny when it's supposed to be a readable placeholder.

---

## Migration Path

1. **Today:** Use FloatingTextField for new code
2. **Soon:** Replace FloatingLabelInput in bug fixes
3. **Later:** Gradual migration of existing uses
4. **Future:** Deprecate FloatingLabelInput

---

## Visual Test

To see the difference yourself:

1. Open your browser to the running dev server
2. Import and render `ComponentComparison` component
3. Look at the "Default (Empty)" state
4. Notice how FloatingTextField label is larger and more readable

---

## Bottom Line

**FloatingTextField is superior in every way.**  
The label sizing is correct, colors follow MD3 specs, and it has better documentation.

**Use it for all new development!** ✅
