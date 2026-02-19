"use client";

import React, { useState } from "react";
import { Link2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BusinessRoleDefinitionProps {
  onSelectApprovers?: () => void;
  onCancel?: () => void;
}

function BusinessRoleDefinition({
  onSelectApprovers,
  onCancel,
}: BusinessRoleDefinitionProps) {
  const [isAuthorised, setIsAuthorised] = useState<string>("yes");
  const [isDirector, setIsDirector] = useState<string>("yes");

  const handleSelectApprovers = () => {
    console.log("Select approvers clicked", { isAuthorised, isDirector });
    onSelectApprovers?.();
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    onCancel?.();
  };

  return (
    <>
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
          <Link2 className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-medium text-secondary mb-2">
        Link your business and accounts
      </h1>

      {/* Subtitle */}
      <p className="text-secondary mb-8 leading-relaxed">
        You will need to be authorised to setup the business profile
      </p>

      {/* Question 1 */}
      <div className="mb-8">
        <h2 className="text-secondary font-medium mb-5 leading-snug">
          I have you been authorised to act on the behalf of the business to
          set up and administer it's Bank Business Hub Profile?
        </h2>
        <RadioGroup value={isAuthorised} onValueChange={setIsAuthorised} className="md:pl-4">
          <div className="flex items-center space-x-3 mb-3">
            <RadioGroupItem value="yes" id="auth-yes" />
            <Label
              htmlFor="auth-yes"
              className="text-secondary text-sm cursor-pointer font-normal"
            >
              Yes, I'm authorised
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="no" id="auth-no" />
            <Label
              htmlFor="auth-no"
              className="text-secondary text-sm cursor-pointer font-normal"
            >
              No, I'm not authorised
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 2 */}
      <div className="mb-8">
        <h2 className="text-secondary font-medium mb-5 leading-snug">
          Are you a director/member and appear on the company registration
          document and as a related party on our records?
        </h2>
        <RadioGroup value={isDirector} onValueChange={setIsDirector} className="md:pl-4">
          <div className="flex items-center space-x-3 mb-3">
            <RadioGroupItem value="yes" id="director-yes" />
            <Label
              htmlFor="director-yes"
              className="text-secondary text-sm cursor-pointer font-normal"
            >
              Yes, I'm a director/member
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="no" id="director-no" />
            <Label
              htmlFor="director-no"
              className="text-secondary text-sm cursor-pointer font-normal"
            >
              No, I'm not a director/member
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-white fill-primary-dark" />
          </div>
          <div className="text-sm text-secondary leading-relaxed">
            Admins have full account access to move money, accept offers,
            statements, balances, transactions, security settings, manage
            team access and permissions.{" "}
            <span className="font-medium">
              A request will be sent for approval to business
              director/members.
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleCancel} className="sm:flex-1">
          CANCEL
        </Button>
        <Button onClick={handleSelectApprovers} className="sm:flex-1">
          SELECT APPROVERS
        </Button>
      </div>
    </>
  );
}

export default BusinessRoleDefinition;