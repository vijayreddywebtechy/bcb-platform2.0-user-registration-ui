/**
 * Mobile OTP Authentication Service
 * Handles exchanging credentials for tokens internally through our next proxy API.
 */
export async function authenticateMobileOtp() {
    const response = await fetch("/api/otp-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to authenticate mobile OTP");
    }

    // Store the retrieved token securely
    if (data.access_token) {
        sessionStorage.setItem("sysauth_mobile_otp_token", data.access_token);
    }

    return data;
}
