"use client";

import React, { useState } from "react";
import Select, {
  Props as SelectProps,
  StylesConfig,
  components,
  DropdownIndicatorProps,
} from "react-select";
import Image from "next/image";
import ArrowDownIcon from "@/assets/images/icons/icn_arrow_solid_down.svg";
import styles from "./FloatingSelect.module.css";

// Define the option type
export interface SelectOption {
  value: string;
  label: string;
}

// Extend the react-select props
export interface FloatingSelectProps extends Omit<SelectProps<SelectOption, false>, "styles"> {
  /** Label text that floats above the select */
  label: string;
  /** Optional helper text displayed below the select */
  helperText?: string;
  /** Whether the select is in an error state */
  error?: boolean;
  /** Error message to display when error is true */
  errorText?: string;
  /** Optional custom class name for the wrapper */
  wrapperClassName?: string;
  /** Custom styles for react-select */
  customStyles?: StylesConfig<SelectOption, false>;
}

// Custom Dropdown Indicator
const CustomDropdownIndicator = (props: DropdownIndicatorProps<SelectOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src={ArrowDownIcon}
        alt="dropdown"
        width={24}
        height={24}
        className="transition-transform duration-200"
        style={{
          transform: props.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </components.DropdownIndicator>
  );
};

/**
 * Material Design Outlined Select with Floating Label
 *
 * This component replicates the FloatingTextField behavior but for select dropdowns.
 *
 * States:
 * 1. Default - Label inside select, default border
 * 2. Active/Open - Label floats to top, border highlighted
 * 3. Selected - Label remains floating, value visible, default border
 *
 * @example
 * ```tsx
 * <FloatingSelect
 *   label="Country"
 *   options={[
 *     { value: 'za', label: 'South Africa' },
 *     { value: 'us', label: 'United States' }
 *   ]}
 *   helperText="Select your country"
 * />
 * ```
 */
export const FloatingSelect = React.forwardRef<any, FloatingSelectProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorText,
      value,
      wrapperClassName,
      id,
      isDisabled,
      customStyles: userCustomStyles,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determine if we should show the label in active (floated) state
    const hasValue = value !== undefined && value !== null;
    const isActive = isFocused || hasValue;

    // Generate unique ID if not provided
    const selectId = id || `floating-select-${label.toLowerCase().replace(/\\s+/g, "-")}`;

    // Custom styles that match FloatingTextField - NO BORDERS on control
    const floatingSelectStyles: StylesConfig<SelectOption, false> = {
      control: (base, state) => ({
        ...base,
        minHeight: "48px",
        border: "none", // Remove border - fieldset handles it
        borderRadius: "0",
        backgroundColor: "transparent",
        boxShadow: "none",
        cursor: "pointer",
        "&:hover": {
          border: "none",
        },
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "12px 16px",
      }),
      input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
        color: "hsl(213, 50%, 20%)", // secondary
        fontSize: "16px",
        lineHeight: "1.5",
      }),
      placeholder: (base) => ({
        ...base,
        color: "transparent", // Hide placeholder, we use floating label
        fontSize: "16px",
      }),
      singleValue: (base) => ({
        ...base,
        color: "hsl(213, 50%, 20%)", // secondary
        fontSize: "16px",
      }),
      menu: (base) => ({
        ...base,
        borderRadius: "4px",
        marginTop: "4px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        border: "1px solid hsl(213, 16%, 43%)",
        overflow: "hidden",
        zIndex: 100,
      }),
      menuList: (base) => ({
        ...base,
        padding: 0,
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "hsl(214, 100%, 44%)" // primary
          : state.isFocused
            ? "hsl(210, 40%, 96%)" // light blue
            : "white",
        color: state.isSelected ? "white" : "hsl(213, 50%, 20%)",
        cursor: "pointer",
        padding: "12px 16px",
        fontSize: "16px",
        "&:active": {
          backgroundColor: "hsl(214, 100%, 44%)",
        },
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        padding: "8px",
        color: error
          ? "hsl(0, 84%, 60%)"
          : state.isFocused
            ? "hsl(214, 100%, 44%)"
            : "hsl(213, 16%, 43%)",
        "&:hover": {
          color: "hsl(214, 100%, 44%)",
        },
      }),
      clearIndicator: (base) => ({
        ...base,
        color: "hsl(213, 16%, 43%)",
        padding: "8px",
        "&:hover": {
          color: "hsl(214, 100%, 44%)",
        },
      }),
    };

    // Merge user custom styles with default styles if provided
    const finalStyles = userCustomStyles
      ? { ...floatingSelectStyles, ...userCustomStyles }
      : floatingSelectStyles;

    return (
      <div className={`${styles.textfieldWrapper} ${wrapperClassName || ""}`}>
        <div className={styles.textfieldContainer}>
          {/* Fieldset creates the border with native cut effect */}
          <fieldset
            className={`${styles.fieldset} ${error ? styles.fieldsetError : ""} ${isFocused ? styles.fieldsetFocused : ""} ${isDisabled ? styles.fieldsetDisabled : ""}`}
            aria-hidden="true"
          >
            <legend className={`${styles.legend} ${isActive ? styles.legendActive : ""}`}>
              <span>{label}</span>
            </legend>
          </fieldset>

          {/* React Select - positioned like input */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Select
              ref={ref}
              inputId={selectId}
              value={value}
              isDisabled={isDisabled}
              styles={finalStyles}
              classNamePrefix="react-select"
              instanceId={selectId}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
              aria-invalid={error}
              aria-describedby={helperText || errorText ? `${selectId}-helper-text` : undefined}
              onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              onChange={(newValue, actionMeta) => {
                onChange?.(newValue, actionMeta);
              }}
              {...props}
            />
          </div>

          {/* Floating label */}
          <label
            htmlFor={selectId}
            className={`${styles.label} ${isActive ? styles.labelActive : ""} ${error ? styles.labelError : ""} ${isFocused ? styles.labelFocused : ""} ${isDisabled ? styles.labelDisabled : ""}`}
            style={{ pointerEvents: "none" }}
          >
            {label}
          </label>
        </div>

        {/* Helper text or error message */}
        {(helperText || errorText) && (
          <span
            id={`${selectId}-helper-text`}
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

FloatingSelect.displayName = "FloatingSelect";
