"use client";

import { useState, FormEvent } from "react";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add your sign in logic here
    console.log("Sign in with:", { username, password });
    setTimeout(() => setLoading(false), 2000);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Add your navigation or logic here
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Sign in</h1>
          <p className="text-gray-900 text-base leading-relaxed">
            Use your username & password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">
              Username*
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Typing..."
              required
            />
            <p className="text-xs text-gray-600">*Required</p>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password*
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                required
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600">*Required</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full"
            >
              CANCEL
            </Button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
