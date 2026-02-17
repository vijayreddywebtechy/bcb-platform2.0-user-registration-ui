# Navigation Flow Documentation

This document outlines the complete navigation structure for the BCB Platform User Registration UI demo.

## 📁 Route Structure

All routes are created using Next.js App Router (`app/` directory):

```
app/
├── page.tsx                                    → / (Home/Welcome)
├── auth/
│   ├── signin/page.tsx                        → /auth/signin
│   ├── otp/page.tsx                           → /auth/otp
│   ├── qr-scan/page.tsx                       → /auth/qr-scan
│   └── business-profiles/page.tsx             → /auth/business-profiles
├── business/
│   └── linking/
│       ├── role-definition/page.tsx           → /business/linking/role-definition
│       ├── select-approvers/page.tsx          → /business/linking/select-approvers
│       ├── capture-details/page.tsx           → /business/linking/capture-details
│       ├── verify-details/page.tsx            → /business/linking/verify-details
│       └── approval-status/page.tsx           → /business/linking/approval-status
├── approval/
│   ├── capture-invitation/page.tsx            → /approval/capture-invitation
│   ├── details/page.tsx                       → /approval/details
│   ├── terms/page.tsx                         → /approval/terms
│   ├── decline-reasons/page.tsx               → /approval/decline-reasons
│   ├── sent/page.tsx                          → /approval/sent
│   └── declined/page.tsx                      → /approval/declined
└── dashboard/page.tsx                         → /dashboard
```

---

## 🎬 Complete User Flows

### **Flow 1: New User - Business Setup Journey**

**Scenario**: A new user signs in and sets up their business profile

```mermaid
/ (AuthWelcome)
    ↓ Click "SIGN IN"
/auth/signin (SignInForm)
    ↓ Submit credentials
/auth/otp (OTPInput)
    ↓ Enter OTP
/auth/qr-scan (SignInWithQR)
    ↓ Click "SIMULATE QR SCAN" (Demo button)
/auth/business-profiles (BusinessProfiles)
    ↓ Select a business
/business/linking/role-definition (BusinessRoleDefinition)
    ↓ Answer attestation questions, click "SELECT APPROVERS"
/business/linking/select-approvers (BusinessSelectApprovers)
    ↓ Select directors/members, click "CAPTURE DETAILS"
/business/linking/capture-details (CaptureApproverDetails)
    ↓ Fill approver details, click "VERIFY DETAILS"
/business/linking/verify-details (BusinessVerifyDetails)
    ↓ Review and click "REQUEST APPROVAL"
/business/linking/approval-status (BusinessApprovalStatus)
    ↓ Click "DONE FOR NOW"
/dashboard (Dashboard Placeholder)
```

**Total Steps**: 10 screens

---

### **Flow 2: Approver - Accept Request Journey**

**Scenario**: An approver receives an email and approves the request

```mermaid
/ (AuthWelcome)
    ↓ Click "USE INVITE"
/approval/capture-invitation (CaptureInvitationDetails)
    ↓ Enter ID and reference code, click "NEXT"
/approval/details (ApprovalDetails)
    ↓ Review details, click "APPROVE"
/approval/terms (TermsAndConditions)
    ↓ Accept all terms, click "APPROVE"
/approval/sent (ApprovalSent)
    ↓ Click "DONE"
/ (Back to Home)
```

**Total Steps**: 5 screens

---

### **Flow 3: Approver - Decline Request Journey**

**Scenario**: An approver receives an email and declines the request

```mermaid
/ (AuthWelcome)
    ↓ Click "USE INVITE"
/approval/capture-invitation (CaptureInvitationDetails)
    ↓ Enter ID and reference code, click "NEXT"
/approval/details (ApprovalDetails)
    ↓ Review details, click "DECLINE REQUEST"
/approval/decline-reasons (DeclineReasons)
    ↓ Select reason and add details, click "DECLINE"
/approval/declined (Declined)
    ↓ Click "DONE"
/ (Back to Home)
```

**Total Steps**: 5 screens

---

## 🔄 Navigation Methods Used

### 1. **Primary Navigation (router.push)**
All components use `useRouter` from `next/navigation` for navigation:

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

const handleClick = () => {
  console.log("Action performed");
  router.push("/next-page");
};
```

### 2. **Back Navigation**
Cancel/Back buttons navigate to the previous logical screen:

```tsx
const handleCancel = () => {
  console.log("Cancel clicked");
  router.push("/previous-page");
};
```

### 3. **Conditional Navigation**
Some components have conditional navigation based on user action:

```tsx
// ApprovalDetails.tsx
const handleApprove = () => {
  router.push("/approval/terms");  // Approve path
};

const handleDecline = () => {
  router.push("/approval/decline-reasons");  // Decline path
};
```

---

## 📝 Component Updates Summary

### Components with Navigation Added:

| Component | File Path | Navigation Added |
|-----------|-----------|------------------|
| AuthWelcome | `components/auth/AuthWelcome.tsx` | ✅ Routes to signin, register, invite |
| SignInForm | `components/auth/signin/SignInForm.tsx` | ✅ Routes to OTP, back to home |
| OTPInput | `components/auth/signin/OTPInput.tsx` | ✅ Routes to QR scan |
| SignInWithQR | `components/auth/signin/SignInWithQR.tsx` | ✅ Routes to business profiles, demo scan button |
| BusinessProfiles | `components/auth/BusinessProfiles.tsx` | ✅ Routes to role definition |
| BusinessRoleDefinition | `components/VerificationDashboard/BusinessRoleDefinition.tsx` | ✅ Routes to select approvers |
| BusinessSelectApprovers | `components/VerificationDashboard/BusinessSelectApprovers.tsx` | ✅ Routes to capture details |
| CaptureApproverDetails | `components/VerificationDashboard/CaptureApproverDetails.tsx` | ✅ Routes to verify details |
| BusinessVerifyDetails | `components/VerificationDashboard/BusinessVerifyDetails.tsx` | ✅ Routes to approval status |
| BusinessApprovalStatus | `components/VerificationDashboard/BusinessApprovalStatus.tsx` | ✅ Routes to dashboard |
| CaptureInvitationDetails | `components/auth/CaptureInvitationDetails.tsx` | ✅ Routes to approval details |
| ApprovalDetails | `components/auth/ApprovalDetails.tsx` | ✅ Routes to terms or decline reasons |
| TermsAndConditions | `components/auth/TermsAndConditions.tsx` | ✅ Routes to approval sent |
| DeclineReasons | `components/auth/DeclineReasons.tsx` | ✅ Routes to declined |
| ApprovalSent | `components/auth/ApprovalSent.tsx` | ✅ Routes to home |
| Declined | `components/auth/Declined.tsx` | ✅ Routes to home |

---

## 🎯 Key Features Implemented

### 1. **Complete Route Structure**
- ✅ All routes created in `app/` directory
- ✅ Each route renders the appropriate component
- ✅ Clean URL structure following REST principles

### 2. **Navigation Logic**
- ✅ `useRouter` added to all interactive components
- ✅ `console.log` statements **preserved** for debugging
- ✅ `router.push()` added **after** console.log statements
- ✅ All existing code **preserved** (nothing removed)

### 3. **Demo Features**
- ✅ "SIMULATE QR SCAN" button in QR screen for demo purposes
- ✅ Dashboard placeholder page until real dashboard is merged
- ✅ All flows are fully clickable and testable

### 4. **Code Quality**
- ✅ TypeScript types maintained
- ✅ Existing callbacks preserved (for flexibility)
- ✅ Comments added explaining navigation choices
- ✅ Professional React.js patterns followed

---

## 🚀 How to Test

### Test Flow 1 (Business Setup):
1. Start at `/` (home page)
2. Click "SIGN IN"
3. Enter any credentials and click "SIGN IN"
4. Enter any 6-digit OTP and click "SUBMIT"
5. Click "SIMULATE QR SCAN (DEMO)"
6. Select any business profile
7. Answer attestation questions, click "SELECT APPROVERS"
8. Select approvers, click "CAPTURE DETAILS"
9. Fill details, click "VERIFY DETAILS"
10. Review and click "REQUEST APPROVAL"
11. Click "DONE FOR NOW" to see dashboard placeholder

### Test Flow 2 (Approve Request):
1. Start at `/` (home page)
2. Click "USE INVITE"
3. Select invitation type, enter ID and reference code
4. Click "NEXT"
5. Review details, click "APPROVE"
6. Check all terms and conditions
7. Click "APPROVE"
8. See success message, click "DONE"

### Test Flow 3 (Decline Request):
1. Start at `/` (home page)
2. Click "USE INVITE"
3. Select invitation type, enter ID and reference code
4. Click "NEXT"
5. Review details, click "DECLINE REQUEST"
6. Select decline reason and add details
7. Click "DECLINE"
8. See confirmation, click "DONE"

---

## 📌 Important Notes

### Code Preservation
- **No code was removed** - all existing logic is preserved
- Old navigation methods are **commented out** with explanations
- All props and callbacks still work (for future flexibility)

### Demo-Specific Features
The following features are **for demo purposes only** and should be removed in production:

1. **Simulate QR Scan Button** (`SignInWithQR.tsx`)
   ```tsx
   {!scanComplete && (
     <Button onClick={handleSimulateScan} className="w-full mb-4 bg-green-600">
       ✓ SIMULATE QR SCAN (DEMO)
     </Button>
   )}
   ```
   - Remove this button in production
   - Replace with actual QR scan WebSocket/polling logic

2. **Dashboard Placeholder** (`app/dashboard/page.tsx`)
   - This is a temporary placeholder
   - Replace with actual dashboard after merging dashboard branch

3. **Hardcoded Demo Data**
   - All components use mock/sample data
   - Replace with actual API calls in production

### Next Steps for Production

1. **Replace mock data with API calls**
2. **Add loading states** (already have placeholders)
3. **Add error handling** and validation
4. **Remove demo-specific buttons**
5. **Add authentication guards** to routes
6. **Implement actual QR scanning logic**
7. **Merge dashboard branch** and update `/dashboard` route
8. **Add session management**
9. **Add form validation** with proper error messages
10. **Add analytics/tracking** for user flows

---

## 🎨 Design Patterns Used

### 1. **Callback + Navigation Pattern**
Components accept optional callbacks AND have navigation:
```tsx
const handleAction = () => {
  console.log("Action performed");
  onCallback?.();  // Call parent callback if provided
  router.push("/next-page");  // Then navigate
};
```

**Why?** This allows components to:
- Work standalone (with navigation)
- Work in parent containers (with callbacks)
- Be tested in isolation

### 2. **Simulate Actions for Demo**
Demo-specific actions are clearly marked:
```tsx
// Demo: Simulate QR Scan Button - Remove in production
<Button onClick={handleSimulateScan}>
  ✓ SIMULATE QR SCAN (DEMO)
</Button>
```

### 3. **Loading State Navigation**
Navigation happens after loading states:
```tsx
const handleSubmit = async () => {
  setLoading(true);
  console.log("Submitting...");
  
  setTimeout(() => {
    setLoading(false);
    router.push("/next-page");
  }, 2000);
};
```

---

## ✅ Checklist

- ✅ 16 routes created
- ✅ 16 components updated with navigation
- ✅ All console.log statements preserved
- ✅ No code removed (only commented with explanations)
- ✅ 3 complete user flows working
- ✅ Demo features clearly marked
- ✅ TypeScript types maintained
- ✅ Professional code standards followed
- ✅ Dashboard placeholder created
- ✅ Documentation completed

---

## 🔧 Troubleshooting

### Navigation not working?
1. Check if route exists in `app/` directory
2. Verify component is client component (`"use client"`)
3. Check browser console for errors
4. Ensure `useRouter` is from `next/navigation` (not `next/router`)

### Page not found?
1. Verify the route path matches the folder structure
2. Check if `page.tsx` exists in the route folder
3. Restart dev server (`npm run dev`)

### Component not updating?
1. Clear `.next` cache
2. Restart dev server
3. Check if changes are saved

---

**Created**: February 17, 2026
**Last Updated**: February 17, 2026
**Status**: ✅ Complete and Ready for Demo
