"use client";

import React from "react";
import Select, {
  Props as SelectProps,
  StylesConfig,
  components,
  DropdownIndicatorProps,
} from "react-select";
import Image from "next/image";
import ArrowDownIcon from "@/assets/images/icons/icn_arrow_solid_down.svg";

// Define the option type
export interface SelectOption {
  value: string;
  label: string;
}

// Custom styles that match the shadcn design system
const customStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "48px",
    borderColor: state.isFocused ? "hsl(var(--primary))" : "hsl(213, 16%, 43%)",
    borderWidth: "1px",
    borderRadius: "0.5rem",
    backgroundColor: "hsl(var(--background))",
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "hsl(var(--primary))" : "hsl(var(--primary))",
    },
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0.5rem 0.75rem",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "hsl(var(--secondary))",
    fontSize: "0.875rem",
    "@media (min-width: 768px)": {
      fontSize: "1rem",
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: "hsl(220, 13%, 69%)",
    fontSize: "0.875rem",
    "@media (min-width: 768px)": {
      fontSize: "1rem",
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--secondary))",
    fontSize: "0.875rem",
    "@media (min-width: 768px)": {
      fontSize: "1rem",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    marginTop: "0.25rem",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    border: "1px solid hsl(var(--border))",
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "hsl(var(--primary))"
      : state.isFocused
        ? "hsl(var(--accent))"
        : "white",
    color: state.isSelected ? "white" : "hsl(var(--secondary))",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    "&:active": {
      backgroundColor: "hsl(var(--primary))",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0.5rem",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "hsl(var(--secondary))",
    padding: "0.5rem",
    "&:hover": {
      color: "hsl(var(--primary))",
    },
  }),
};

//   }),
// };

// Custom Dropdown Indicator using the custom SVG icon
const CustomDropdownIndicator = (props: DropdownIndicatorProps<SelectOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src={ArrowDownIcon}
        alt="dropdown"
        width={24}
        height={24}
        className="transition-transform duration-200"
        // style={{
        //   transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        // }}
      />
    </components.DropdownIndicator>
  );
};

// Extend the react-select props
interface ReactSelectProps extends Omit<SelectProps<SelectOption, false>, "styles"> {
  // You can add custom props here if needed
  customStyles?: StylesConfig<SelectOption, false>;
}

const ReactSelect = React.forwardRef<any, ReactSelectProps>(
  ({ customStyles: userCustomStyles, className, id, ...props }, ref) => {
    // Merge user custom styles with default styles if provided
    const finalStyles = userCustomStyles ? { ...customStyles, ...userCustomStyles } : customStyles;

    return (
      <Select
        ref={ref}
        styles={finalStyles}
        className={className}
        classNamePrefix="react-select"
        instanceId={id} // Use the id prop as instanceId to prevent hydration mismatch
        components={{ DropdownIndicator: CustomDropdownIndicator }}
        {...props}
      />
    );
  }
);

ReactSelect.displayName = "ReactSelect";

export { ReactSelect };
export default ReactSelect;
