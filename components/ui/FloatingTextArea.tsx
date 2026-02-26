import React, { useState, TextareaHTMLAttributes } from "react";
import styles from "./FloatingTextArea.module.css";

export interface FloatingTextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> {
  /** Label text that floats above the textarea */
  label: string;
  /** Optional helper text displayed below the textarea */
  helperText?: string;
  /** Whether the textarea is in an error state */
  error?: boolean;
  /** Error message to display when error is true */
  errorText?: string;
  /** Optional custom class name for the wrapper */
  wrapperClassName?: string;
}

export const FloatingTextArea = React.forwardRef<HTMLTextAreaElement, FloatingTextAreaProps>(
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

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue =
      currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;
    const isActive = isFocused || hasValue;

    const textareaId = id || `floating-textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={`${styles.textareaWrapper} ${wrapperClassName || ""}`}>
        <div className={styles.textareaContainer}>
          {/* Fieldset creates the border with native cut effect */}
          <fieldset
            className={`${styles.fieldset} ${error ? styles.fieldsetError : ""} ${isFocused ? styles.fieldsetFocused : ""} ${disabled ? styles.fieldsetDisabled : ""}`}
            aria-hidden="true"
          >
            <legend className={`${styles.legend} ${isActive ? styles.legendActive : ""}`}>
              <span>{label}</span>
            </legend>
          </fieldset>

          {/* Textarea field */}
          <textarea
            ref={ref}
            id={textareaId}
            className={`${styles.textarea} ${disabled ? styles.textareaDisabled : ""}`}
            value={value !== undefined ? value : internalValue}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText || errorText ? `${textareaId}-helper-text` : undefined}
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
            htmlFor={textareaId}
            className={`${styles.label} ${isActive ? styles.labelActive : ""} ${error ? styles.labelError : ""} ${isFocused ? styles.labelFocused : ""} ${disabled ? styles.labelDisabled : ""}`}
          >
            {label}
          </label>
        </div>

        {/* Helper text or error message */}
        {(helperText || errorText) && (
          <span
            id={`${textareaId}-helper-text`}
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

FloatingTextArea.displayName = "FloatingTextArea";
