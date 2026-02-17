"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { FloatingSelect, SelectOption } from "@/components/ui/FloatingReactSelect";

export default function DeclineReasons() {
    const router = useRouter();
    const [declineReason, setDeclineReason] = useState<SelectOption | null>(null);
    const [declineDetails, setDeclineDetails] = useState("");
    const [loading, setLoading] = useState(false);

    const maxCharacters = 140;
    const remainingCharacters = maxCharacters - declineDetails.length;

    // Decline reason options
    const declineReasonOptions: SelectOption[] = [
        { value: "not-authorised", label: "Requester is not authorised for that role" },
        { value: "incorrect-details", label: "Incorrect details provided" },
        { value: "security-concerns", label: "Security concerns" },
        { value: "other", label: "Other reason" },
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log("Decline submitted:", { declineReason, declineDetails });
        
        // Simulate API call to submit decline
        setTimeout(() => {
            setLoading(false);
            // Navigate to declined confirmation page
            router.push("/approval/declined");
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Cancel clicked");
        // Navigate back to approval details
        router.push("/approval/details");
    };

    return (
        <AuthLayout>
            <AuthCard className="w-full max-w-lg mx-auto mb-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-xl sm:text-2xl md:text-3xl text-secondary mb-2">
                        Decline Reasons
                    </h1>
                    <p className="text-neutral-900 text-sm sm:text-base leading-relaxed">
                        Capture the reasons why you are declining this request
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Decline Reason Dropdown */}
                    <FloatingSelect
                        label="Decline Reason"
                        options={declineReasonOptions}
                        value={declineReason}
                        onChange={(newValue) => setDeclineReason(newValue)}
                        helperText="*Required"
                        placeholder="Select a reason"
                        required
                    />

                    {/* Decline Details Textarea */}
                    <div>
                        <label htmlFor="decline-details" className="sr-only">
                            Add decline details
                        </label>
                        <textarea
                            id="decline-details"
                            value={declineDetails}
                            onChange={(e) => {
                                if (e.target.value.length <= maxCharacters) {
                                    setDeclineDetails(e.target.value);
                                }
                            }}
                            placeholder="Add decline details"
                            className="w-full h-32 px-4 py-3 text-base text-secondary bg-white border border-neutral-700 rounded focus:border-primary focus:outline-none focus:ring-0 transition-colors resize-none"
                            maxLength={maxCharacters}
                        />
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-neutral-700">Capture details</p>
                            <p className="text-xs text-neutral-700">
                                {remainingCharacters}/{maxCharacters}
                            </p>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="py-4">
                        <div className="flex gap-2">
                            <div className="flex-shrink-0">
                                <Info className="w-5 h-5 text-white fill-primary-dark" />
                            </div>
                            <div className="text-sm text-secondary leading-relaxed">
                                Decline reasons will not be shared with the requester.
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                        <Button type="submit" className="w-full" disabled={!declineReason || loading}>
                            {loading ? "DECLINING..." : "DECLINE"}
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
