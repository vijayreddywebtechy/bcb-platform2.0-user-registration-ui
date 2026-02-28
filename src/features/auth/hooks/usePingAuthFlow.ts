import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPingToken, fetchPingUserInfo } from "@/features/auth/services/auth/pingAuthService";
import { STORAGE_KEYS } from "@/config";

export interface UsePingAuthFlowProps {
    onOtpReady: (cellNumber: string, qname: string, otpErrorMsg: string | null) => void;
    onCustomerFetchError: () => void;
}

export function usePingAuthFlow({ onOtpReady, onCustomerFetchError }: UsePingAuthFlowProps) {
    const [tokenError, setTokenError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (error) {
            console.error("[PingAuth] Authorization error received:");
            console.error("  error             :", error);
            console.error("  error_description :", errorDescription);
            setTokenError(`Ping auth error: ${error} – ${errorDescription ?? ""}`);
            return;
        }

        if (code) {
            console.log("[PingAuth] Authorization code received:");
            console.log("  code  :", code);
            console.log("  state :", state);

            fetchPingToken(code)
                .then(async (tokenData) => {
                    console.log("[PingAuth] Token exchange successful:");
                    console.log("  access_token :", tokenData.access_token);
                    console.log("  token_type   :", tokenData.token_type);
                    console.log("  expires_in   :", tokenData.expires_in);
                    console.log("  scope        :", tokenData.scope);

                    try {
                        const userInfo = await fetchPingUserInfo(tokenData.access_token);
                        console.log("[PingAuth] UserInfo received:");
                        console.log("  sub              :", userInfo.sub);
                        console.log("  name             :", userInfo.name);
                        console.log("  email            :", userInfo.email);
                        console.log("  preferred_username:", userInfo.preferred_username);
                        console.log("  full payload      :", JSON.stringify(userInfo, null, 2));

                        sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
                        sessionStorage.setItem(STORAGE_KEYS.PING_ACCESS_TOKEN, tokenData.access_token);

                        const customerUuid = userInfo.id as string;
                        if (customerUuid && typeof customerUuid === "string") {
                            try {
                                const { getCustomerByUuid } = await import("@/services/customers/customerService");
                                const customerProfile = await getCustomerByUuid(customerUuid, tokenData.access_token);
                                console.log("[CustomerAPI] Customer Profile received:", JSON.stringify(customerProfile, null, 2));

                                sessionStorage.setItem(STORAGE_KEYS.CUSTOMER_PROFILE, JSON.stringify(customerProfile));

                                if (customerProfile?.customer?.partyId) {
                                    try {
                                        console.log("[MobileAuth] partyId found, initializing mobile auth...");
                                        const { authenticateMobileOtp } = await import("@/features/auth/services/auth/mobileOtpService");
                                        const mobileOtpAuth = await authenticateMobileOtp();

                                        if (mobileOtpAuth?.access_token) {
                                            const rawCellNumber = "0845484511"; // test format
                                            if (rawCellNumber) {
                                                const cellNumber = rawCellNumber.startsWith("0") ? rawCellNumber.substring(1) : rawCellNumber;
                                                console.log(`[MobileOTP] Sending OTP to ${cellNumber}...`);

                                                const { sendOtp } = await import("@/features/auth/services/otp/unsecuredLendingOtpService");
                                                const otpResponse = await sendOtp(cellNumber, mobileOtpAuth.access_token);
                                                console.log("[MobileOTP] OTP dispatched successfully:", JSON.stringify(otpResponse, null, 2));

                                                const responseCode = otpResponse?.extracted?.responseCode;
                                                const qname = otpResponse?.extracted?.qname || "";

                                                let mappedErrorMsg = null;
                                                if (responseCode !== "0000" && responseCode) {
                                                    mappedErrorMsg = responseCode;
                                                }

                                                // Trigger callback
                                                onOtpReady(cellNumber, qname, mappedErrorMsg);
                                            } else {
                                                console.warn("[MobileOTP] No cellnumber found in userInfo to send OTP.");
                                            }
                                        }
                                    } catch (otpErr: unknown) {
                                        const message = otpErr instanceof Error ? otpErr.message : String(otpErr);
                                        console.error("[MobileOTP] Failed during Mobile Auth / OTP flow:", message);
                                    }
                                }
                            } catch (customerErr: unknown) {
                                const message = customerErr instanceof Error ? customerErr.message : String(customerErr);
                                console.error("[CustomerAPI] Setup failed to fetch customer profile:", message);
                                onCustomerFetchError();
                            }
                        } else {
                            console.warn("[CustomerAPI] No valid id found on user profile to fetch customer details.");
                        }

                    } catch (userInfoErr: unknown) {
                        const message = userInfoErr instanceof Error ? userInfoErr.message : String(userInfoErr);
                        console.error("[PingAuth] UserInfo request failed:", message);
                    }
                })
                .catch((err: unknown) => {
                    const message = err instanceof Error ? err.message : String(err);
                    console.error("[PingAuth] Token exchange failed:", message);
                    setTokenError(message);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return { tokenError };
}
