"use client";

import { useState } from "react";
import { FloatingTextField } from "./FloatingTextField";

/**
 * Demo page showcasing the FloatingTextField component in all three states:
 * 1. Default (empty, not focused)
 * 2. Active/Typing (focused)
 * 3. Populated (has value, not focused)
 */
export default function FloatingTextFieldDemo() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [populated, setPopulated] = useState("Populated");
  const [errorField, setErrorField] = useState("");

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ marginBottom: "30px", color: "#1c1b1f" }}>FloatingTextField Component Demo</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1c1b1f", fontSize: "18px" }}>
          State 1: Default (Empty)
        </h2>
        <FloatingTextField
          label="Username"
          helperText="Create a username using letters only, or a combination of letters, numbers and these special characters ! $ & - ? . @ ^ _ ~"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1c1b1f", fontSize: "18px" }}>
          State 2: Active/Typing (Click to focus)
        </h2>
        <FloatingTextField
          label="Email Address"
          type="email"
          helperText="We'll never share your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1c1b1f", fontSize: "18px" }}>
          State 3: Populated (Has value)
        </h2>
        <FloatingTextField
          label="Username"
          helperText="Label remains floating when input has value"
          value={populated}
          onChange={(e) => setPopulated(e.target.value)}
        />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#d32f2f", fontSize: "18px" }}>Error State</h2>
        <FloatingTextField
          label="Email Address"
          type="email"
          error={true}
          errorText="Please enter a valid email address"
          value={errorField}
          onChange={(e) => setErrorField(e.target.value)}
        />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1c1b1f", fontSize: "18px" }}>Disabled State</h2>
        <FloatingTextField
          label="Disabled Field"
          value="Cannot edit this"
          disabled={true}
          helperText="This field is disabled"
        />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1c1b1f", fontSize: "18px" }}>
          Various Input Types
        </h2>

        <FloatingTextField label="Password" type="password" helperText="Enter your password" />

        <FloatingTextField label="Phone Number" type="tel" helperText="Format: (123) 456-7890" />

        <FloatingTextField label="Date of Birth" type="date" />
      </div>
    </div>
  );
}
