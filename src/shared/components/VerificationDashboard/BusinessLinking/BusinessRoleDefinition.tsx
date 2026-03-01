"use client";

import React, { useState, useEffect } from "react";
import { Link2, Info } from "lucide-react";
import { STORAGE_KEYS } from "@/config";
import { Button } from "@/shared/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { getCustomerAccountList } from "@/services/customers/customerAccountListService";

interface BusinessRoleDefinitionProps {
  onSelectApprovers?: () => void;
  onCancel?: () => void;
}

const DEFAULT_ROLES = [
  {
    value: "admin",
    label: "Admin/Owner",
    description:
      "Full account access to move money, view balances and transactions, manage team account and profile access.",
  },
  {
    value: "initiator",
    label: "Initiator/Capturer",
    description:
      "Initiate payments and payment instructions, view account balances, account documents and transactions.",
  },
  {
    value: "approver",
    label: "Approver",
    description:
      "Approve payments and payment instructions, view account balances, account documents and transactions.",
  },
  {
    value: "releaser",
    label: "Releaser",
    description:
      "Release payments and payment instructions, view account balances, account documents and transactions.",
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "View account balances, account documents and transactions.",
  },
];

function BusinessRoleDefinition({ onSelectApprovers, onCancel }: BusinessRoleDefinitionProps) {
  const [rolesList, setRolesList] = useState<{ value: string; label: string; description: string }[]>(DEFAULT_ROLES);
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  const [isAuthorised, setIsAuthorised] = useState<string>("yes");
  const [isDirector, setIsDirector] = useState<string>("yes");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedRolesStr = localStorage.getItem(STORAGE_KEYS.USER_ROLES);
      if (storedRolesStr) {
        const parsedData = JSON.parse(storedRolesStr);
        if (parsedData?.items && Array.isArray(parsedData.items) && parsedData.items.length > 0) {
          const mappedRoles = parsedData.items.map((r: any) => ({
            value: r.roleId || r.roleCode,
            label: r.roleName,
            description: r.description || "",
          }));
          setRolesList(mappedRoles);
          if (mappedRoles.length > 0) {
            setSelectedRole(mappedRoles[0].value);
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse roles from local storage:", e);
    }
  }, []);

  const handleSelectApprovers = async () => {
    try {
      setIsLoading(true);
      const selectedCustomerStr = localStorage.getItem(STORAGE_KEYS.SELECTED_CUSTOMER);
      if (selectedCustomerStr) {
        const selectedCustomer = JSON.parse(selectedCustomerStr);
        if (selectedCustomer?.bpid) {
          const response = await getCustomerAccountList(selectedCustomer.bpid);
          if (response.success && response.data) {
            localStorage.setItem(STORAGE_KEYS.SELECTED_CUSTOMER_DETAILS, JSON.stringify(response.data));
          } else {
            console.error("Failed to fetch customer details:", response.error);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    } finally {
      setIsLoading(false);
      onSelectApprovers?.();
    }
  };

  const handleCancel = () => {
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
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">
        Link your business and accounts
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-8 leading-relaxed">
        To secure your business profile and allow your business greater control we need to establish
        an administrator/owner for the Business Hub. Not an administrator, no worries, your
        designated admin/owner will approve your access once their admin access is approved.
      </p>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Left: Role Selection */}
        <div className="flex-none min-w-[320px] lg:min-w-[400px]">
          <RadioGroup
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="grid grid-cols-1 auto-rows-[1fr] gap-3"
          >
            {rolesList.map((role) => {
              const isSelected = selectedRole === role.value;
              return (
                <label
                  key={role.value}
                  htmlFor={`role-${role.value}`}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all h-full ${isSelected ? "border-primary bg-blue-50" : "border-neutral-300 bg-white hover:border-gray-300"
                    }`}
                >
                  <RadioGroupItem
                    value={role.value}
                    id={`role-${role.value}`}
                    className="mt-1 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-secondary text-lg md:text-xl whitespace-nowrap">
                      {role.label}
                    </p>
                    <p className="text-xs text-neutral-800 leading-relaxed mt-2 line-clamp-3">
                      {role.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        {/* Right: Authorization Questions */}
        <div className="flex flex-col gap-6">
          {/* Question 1 */}
          <div>
            <h2 className="text-secondary font-medium mb-4 leading-snug text-sm">
              I have you been authorised to act on the behalf of the business to set up and
              administer it's Business Hub Profile?
            </h2>
            <RadioGroup
              value={isAuthorised}
              onValueChange={setIsAuthorised}
              className="pl-2 flex flex-col gap-3"
            >
              <div className="flex items-center space-x-3">
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
          <div>
            <h2 className="text-secondary font-medium mb-4 leading-snug text-sm">
              Are you a director/member and appear on the company registration document and as a
              related party on our records?
            </h2>
            <RadioGroup
              value={isDirector}
              onValueChange={setIsDirector}
              className="pl-2 flex flex-col gap-3"
            >
              <div className="flex items-center space-x-3">
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
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-white fill-primary-dark" />
              </div>
              <p className="text-sm text-secondary leading-relaxed font-medium">
                A request will be sent for approval to business director/members.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-[482px]">
        <Button variant="outline" onClick={handleCancel} className="sm:flex-1" disabled={isLoading}>
          CANCEL
        </Button>
        <Button onClick={handleSelectApprovers} className="sm:flex-1" disabled={isLoading}>
          {isLoading ? "LOADING..." : "SELECT APPROVERS"}
        </Button>
      </div>
    </>
  );
}

export default BusinessRoleDefinition;
