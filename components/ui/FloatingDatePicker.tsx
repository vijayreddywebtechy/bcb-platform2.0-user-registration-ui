"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import styles from "./FloatingTextField.module.css";

export interface FloatingDatePickerProps {
  /** Label text that floats above the input */
  label: string;
  /** Currently selected date */
  value?: Date;
  /** Callback when a date is selected */
  onChange?: (date: Date | undefined) => void;
  /** Date format string (date-fns) */
  dateFormat?: string;
  /** Placeholder when no date is selected */
  placeholder?: string;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Error message to display when error is true */
  errorText?: string;
  /** Optional helper text displayed below the input */
  helperText?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Optional custom class name for the wrapper */
  wrapperClassName?: string;
}

export const FloatingDatePicker = React.forwardRef<HTMLButtonElement, FloatingDatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      dateFormat = "dd/MM/yyyy",
      placeholder = "dd/mm/yyyy",
      error = false,
      errorText,
      helperText,
      disabled = false,
      wrapperClassName,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = !!value;
    const isActive = isFocused || hasValue;

    const inputId = `floating-datepicker-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={`${styles.textfieldWrapper} ${wrapperClassName || ""}`}>
        <Popover
          onOpenChange={(open) => {
            setIsFocused(open);
          }}
        >
          <div className={styles.textfieldContainer}>
            {/* Fieldset creates the border with native cut effect */}
            <fieldset
              className={`${styles.fieldset} ${
                error ? styles.fieldsetError : ""
              } ${isFocused ? styles.fieldsetFocused : ""} ${
                disabled ? styles.fieldsetDisabled : ""
              }`}
              aria-hidden="true"
            >
              <legend className={`${styles.legend} ${isActive ? styles.legendActive : ""}`}>
                <span>{label}</span>
              </legend>
            </fieldset>

            {/* Trigger button styled like the text input */}
            <PopoverTrigger asChild disabled={disabled}>
              <button
                ref={ref}
                type="button"
                id={inputId}
                role="combobox"
                aria-expanded={isFocused}
                aria-invalid={error}
                aria-describedby={helperText || errorText ? `${inputId}-helper-text` : undefined}
                className={`${styles.input} ${disabled ? styles.inputDisabled : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: disabled ? "not-allowed" : "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    color: hasValue ? undefined : "hsl(213, 16%, 43%)",
                  }}
                >
                  {hasValue ? format(value, dateFormat) : placeholder}
                </span>
                <CalendarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            </PopoverTrigger>

            {/* Floating label */}
            <label
              htmlFor={inputId}
              className={`${styles.label} ${
                isActive ? styles.labelActive : ""
              } ${error ? styles.labelError : ""} ${
                isFocused ? styles.labelFocused : ""
              } ${disabled ? styles.labelDisabled : ""}`}
            >
              {label}
            </label>
          </div>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={value} onSelect={onChange} autoFocus />
          </PopoverContent>
        </Popover>

        {/* Helper text or error message */}
        {(helperText || errorText) && (
          <span
            id={`${inputId}-helper-text`}
            className={`text-neutral-700 ${styles.helperText} ${
              error ? styles.helperTextError : ""
            }`}
            role={error ? "alert" : undefined}
          >
            {error ? errorText : helperText}
          </span>
        )}
      </div>
    );
  }
);

FloatingDatePicker.displayName = "FloatingDatePicker";
