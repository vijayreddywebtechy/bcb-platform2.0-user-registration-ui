import React, { useState, InputHTMLAttributes } from "react";
import styles from "./FloatingTextField.module.css";

export interface FloatingTextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  /** Label text that floats above the input */
  label: string;
  /** Optional helper text displayed below the input */
  helperText?: string;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Error message to display when error is true */
  errorText?: string;
  /** Optional custom class name for the wrapper */
  wrapperClassName?: string;
}

/**
 * Material Design Outlined TextField with Floating Label
 *
 * This component replicates the exact behavior of Material UI's TextField with outlined variant.
 *
 * States:
 * 1. Default - Label inside input, default border
 * 2. Active/Typing - Label floats to top, border highlighted, cursor visible
 * 3. Populated - Label remains floating, value visible, default border
 *
 * Features:
 * - Smooth floating label animation
 * - Native fieldset/legend for border cut effect
 * - Error states with validation messages
 * - Helper text support
 * - Fully accessible (ARIA attributes)
 * - Dark mode support
 * - Autofill detection
 * - Disabled state
 *
 * @example
 * ```tsx
 * <FloatingTextField
 *   label="Username"
 *   helperText="Create a username using letters only, or a combination of letters, numbers and these special characters ! $ & - ? . @ ^ _ ~"
 * />
 *
 * <FloatingTextField
 *   label="Email Address"
 *   type="email"
 *   error={true}
 *   errorText="Please enter a valid email address"
 * />
 * ```
 */
export const FloatingTextField = React.forwardRef<HTMLInputElement, FloatingTextFieldProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorText,
      value,
      defaultValue,
      wrapperClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");

    // Determine if we should show the label in active (floated) state
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue =
      currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;
    const isActive = isFocused || hasValue;

    // Generate unique ID if not provided
    const inputId = id || `floating-textfield-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={`${styles.textfieldWrapper} ${wrapperClassName || ""}`}>
        <div className={styles.textfieldContainer}>
          {/* Fieldset creates the border with native cut effect */}
          <fieldset
            className={`${styles.fieldset} ${error ? styles.fieldsetError : ""} ${isFocused ? styles.fieldsetFocused : ""} ${disabled ? styles.fieldsetDisabled : ""}`}
            aria-hidden="true"
          >
            <legend className={`${styles.legend} ${isActive ? styles.legendActive : ""}`}>
              <span>{label}</span>
            </legend>
          </fieldset>

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${disabled ? styles.inputDisabled : ""}`}
            value={value !== undefined ? value : internalValue}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText || errorText ? `${inputId}-helper-text` : undefined}
            onChange={(e) => {
              if (value === undefined) {
                setInternalValue(e.target.value);
              }
              props.onChange?.(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Floating label */}
          <label
            htmlFor={inputId}
            className={`${styles.label} ${isActive ? styles.labelActive : ""} ${error ? styles.labelError : ""} ${isFocused ? styles.labelFocused : ""} ${disabled ? styles.labelDisabled : ""}`}
          >
            {label}
          </label>
        </div>

        {/* Helper text or error message */}
        {(helperText || errorText) && (
          <span
            id={`${inputId}-helper-text`}
            className={`text-neutral-700 ${styles.helperText} ${error ? styles.helperTextError : ""}`}
            role={error ? "alert" : undefined}
          >
            {error ? errorText : helperText}
          </span>
        )}
      </div>
    );
  }
);

FloatingTextField.displayName = "FloatingTextField";
