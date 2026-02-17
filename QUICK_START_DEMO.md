# Quick Start Demo Guide

## 🚀 Start the Demo

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 🎬 Three Complete Demo Flows

### **Flow 1: Business Setup** (10 steps)
**URL**: Start at `/`

1. Click **"SIGN IN"**
2. Enter credentials → Click **"SIGN IN"**
3. Enter 6-digit OTP → Click **"SUBMIT"**
4. Click **"✓ SIMULATE QR SCAN (DEMO)"** (green button)
5. Select any business profile
6. Answer questions → Click **"SELECT APPROVERS"**
7. Select 2+ directors → Click **"CAPTURE DETAILS"**
8. Fill details → Click **"VERIFY DETAILS"**
9. Review → Click **"REQUEST APPROVAL"**
10. Click **"DONE FOR NOW"** → See dashboard

---

### **Flow 2: Approve Request** (5 steps)
**URL**: Start at `/` OR directly at `/approval/capture-invitation`

1. Click **"USE INVITE"**
2. Select type + Enter ID + Reference → Click **"NEXT"**
3. Review details → Click **"APPROVE"**
4. Check all 3 checkboxes → Click **"APPROVE"**
5. Click **"DONE"** → Back to home

---

### **Flow 3: Decline Request** (5 steps)
**URL**: Start at `/` OR directly at `/approval/capture-invitation`

1. Click **"USE INVITE"**
2. Select type + Enter ID + Reference → Click **"NEXT"**
3. Review details → Click **"DECLINE REQUEST"**
4. Select reason + Add details → Click **"DECLINE"**
5. Click **"DONE"** → Back to home

---

## 📍 Direct URL Access

You can jump to any screen directly:

| Screen | URL |
|--------|-----|
| Home/Welcome | `/` |
| Sign In | `/auth/signin` |
| OTP | `/auth/otp` |
| QR Scan | `/auth/qr-scan` |
| Business Profiles | `/auth/business-profiles` |
| Role Definition | `/business/linking/role-definition` |
| Select Approvers | `/business/linking/select-approvers` |
| Capture Details | `/business/linking/capture-details` |
| Verify Details | `/business/linking/verify-details` |
| Approval Status | `/business/linking/approval-status` |
| Capture Invitation | `/approval/capture-invitation` |
| Approval Details | `/approval/details` |
| Terms & Conditions | `/approval/terms` |
| Decline Reasons | `/approval/decline-reasons` |
| Approval Sent | `/approval/sent` |
| Declined | `/approval/declined` |
| Dashboard | `/dashboard` |

---

## 🎯 Demo Tips

1. **No validation required** - You can enter any values
2. **All buttons work** - Full navigation implemented
3. **Demo-specific features**:
   - Green "SIMULATE QR SCAN" button (remove in production)
   - Dashboard placeholder (merge actual dashboard later)
4. **Console logs** - Check browser console to see flow progress
5. **Mobile responsive** - Try on different screen sizes

---

## 🔍 What to Show in Demo

### **Highlight #1: Complete User Journey**
- Show end-to-end flow from sign-in to dashboard
- Demonstrate all validation screens
- Show approval status tracking

### **Highlight #2: Approver Experience**
- Show invitation-based access
- Demonstrate approval/decline paths
- Show terms acceptance flow

### **Highlight #3: UI/UX Quality**
- Consistent design across all screens
- Professional Standard Bank branding
- Responsive mobile-first design
- Loading states and feedback

---

## 📊 Screen Count

- **Total Screens**: 17
- **Auth Screens**: 7
- **Business Linking**: 5
- **Approval Flow**: 5
- **Dashboard**: 1 (placeholder)

---

## ⚡ Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🎨 Key Features Demonstrated

- ✅ Multi-step registration flow
- ✅ OTP verification
- ✅ QR code scanning (simulated)
- ✅ Business profile selection
- ✅ Role-based attestation
- ✅ Approver management
- ✅ Invitation-based approval
- ✅ Terms & conditions acceptance
- ✅ Decline with reasons
- ✅ Status tracking
- ✅ Professional UI/UX
- ✅ Mobile responsive
- ✅ Consistent branding

---

## 📝 Notes for Presentation

1. **Start with Flow 1** - Shows complete business setup
2. **Then show Flow 2** - Demonstrates approver experience
3. **Mention Flow 3** - Quick decline path
4. **Highlight**: All screens are production-ready UI components
5. **Note**: Dashboard integration pending (from other branch)

---

## 🚨 Known Demo Limitations

1. **No backend** - All data is mocked
2. **No real OTP** - Any 6 digits work
3. **No real QR scan** - Demo button simulates success
4. **No validation** - Forms accept any input
5. **Dashboard placeholder** - Actual dashboard in separate branch

These are **expected for UI demo** and will be integrated in production.

---

**Ready to Demo!** 🎉

Just run `npm run dev` and start at `/`
