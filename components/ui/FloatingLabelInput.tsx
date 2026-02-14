import React, { useState, InputHTMLAttributes } from 'react';
import styles from './FloatingLabelInput.module.css';

export interface FloatingLabelInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
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
 * Material Design Outlined Text Field with Floating Label
 * 
 * Features:
 * - Floating label animation
 * - Border cut effect using native fieldset/legend
 * - Error states with validation messages
 * - Helper text support
 * - Fully accessible
 * - Dark mode support
 * - Autofill detection
 * 
 * @example
 * ```tsx
 * <FloatingLabelInput 
 *   label="Email Address"
 *   type="email"
 *   helperText="We'll never share your email"
 * />
 * ```
 */
export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ 
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
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    
    // Determine if we should show the label in active (floated) state
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;
    const isActive = isFocused || hasValue;

    // Generate unique ID if not provided
    const inputId = id || `floating-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={`${styles.wrapper} ${wrapperClassName || ''}`}>
        <div className={styles.container}>
          <fieldset 
            className={`${styles.fieldset} ${error ? styles.fieldsetError : ''} ${isFocused ? styles.fieldsetFocused : ''}`}
            aria-hidden="true"
          >
            <legend className={`${styles.legend} ${isActive ? styles.legendActive : ''}`}>
              <span>{label}</span>
            </legend>
          </fieldset>
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
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
          <label 
            htmlFor={inputId}
            className={`${styles.label} ${isActive ? styles.labelActive : ''} ${error ? styles.labelError : ''} ${isFocused ? styles.labelFocused : ''}`}
          >
            {label}
          </label>
        </div>
        {(helperText || errorText) && (
          <span 
            id={`${inputId}-helper-text`}
            className={`${styles.helperText} ${error ? styles.helperTextError : ''}`}
            role={error ? 'alert' : undefined}
          >
            {error ? errorText : helperText}
          </span>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

