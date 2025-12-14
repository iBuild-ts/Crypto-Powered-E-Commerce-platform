# CryptoCart - Testing Guide

## 🚀 Quick Start

### Servers Running
- **Frontend**: http://localhost:3000 ✅
- **Backend**: http://localhost:5000 ✅
- **Database**: SQLite (dev.db) ✅

---

## 🧪 Test Cases

### Test 1: Wallet Connection Flow
**Steps:**
1. Go to http://localhost:3000
2. Click "Get Started" button
3. MetaMask popup should appear
4. Click "Connect" in MetaMask
5. Should redirect to /store/create

**Expected Result:** ✅ Wallet connected, redirected to store creation

---

### Test 2: Create Store
**Steps:**
1. After wallet connection, you're on /store/create
2. Fill in:
   - Store Name: "My Test Store"
   - Description: "Test store description"
   - Slug auto-fills: "my-test-store"
3. Click "Create Store"
4. Should redirect to /store/my-test-store

**Expected Result:** ✅ Store created, redirected to store page

---

### Test 3: Navigate Store Dashboard
**Steps:**
1. On store page (/store/my-test-store)
2. Click "Products" card
3. Should go to /store/my-test-store/products
4. Click back button
5. Should return to store page

**Expected Result:** ✅ Navigation works, products page loads

---

### Test 4: Store Settings
**Steps:**
1. On store page, click "Settings" card
2. Should go to /store/my-test-store/settings
3. Fill in some settings
4. Click "Save Settings"
5. Should show saving state then success

**Expected Result:** ✅ Settings page loads, save button works

---

### Test 5: Analytics
**Steps:**
1. On store page, click "Analytics" card
2. Should go to /store/my-test-store/analytics
3. Should show stats and charts

**Expected Result:** ✅ Analytics page loads with data

---

### Test 6: Dashboard
**Steps:**
1. Click "Dashboard" in navbar
2. Should show all stores
3. Click "New Store" button
4. Should go to /store/create

**Expected Result:** ✅ Dashboard loads, new store button works

---

### Test 7: Wallet Disconnect
**Steps:**
1. In navbar, click "Disconnect" button
2. Wallet should disconnect
3. Try to access /dashboard
4. Should show "Connect Your Wallet" message

**Expected Result:** ✅ Disconnect works, protected routes work

---

### Test 8: Account Settings
**Steps:**
1. Click "Settings" in navbar
2. Should go to /settings
3. Wallet address should be displayed (read-only)
4. Fill in display name and email
5. Click "Save Settings"

**Expected Result:** ✅ Settings page loads, form works

---

## 🔍 Button Checklist

### Home Page
- [ ] "Get Started" → Connects wallet
- [ ] "Learn More" → Links to docs
- [ ] "Create Your Store Now" → Goes to store creation

### Navbar
- [ ] "Connect Wallet" → Opens wallet connection
- [ ] Wallet address → Shows when connected
- [ ] "Disconnect" → Disconnects wallet
- [ ] "Dashboard" → Goes to dashboard
- [ ] "Stores" → Goes to stores list
- [ ] "Settings" → Goes to account settings

### Dashboard
- [ ] "New Store" → Goes to store creation
- [ ] Store cards → Click to manage store

### Store Pages
- [ ] "Products" → Goes to products page
- [ ] "Settings" → Goes to settings page
- [ ] "Analytics" → Goes to analytics page
- [ ] "Add Product" → Button works
- [ ] "Save Settings" → Button works
- [ ] Back buttons → All working

---

## 🐛 Troubleshooting

### MetaMask Not Connecting
- Make sure MetaMask extension is installed
- Check if MetaMask is unlocked
- Try refreshing the page

### 404 Errors
- All routes should now be working
- If you see 404, try refreshing
- Check browser console for errors

### Wallet Not Showing
- Make sure you're connected to MetaMask
- Check if wallet address is in navbar
- Try disconnecting and reconnecting

### Store Not Creating
- Check backend is running (http://localhost:5000)
- Check browser console for errors
- Make sure wallet is connected

---

## 📝 Notes

- Wallet address is used as store owner identifier
- Each wallet can create multiple stores
- Store slug must be unique
- All forms have validation
- Loading states show during operations

---

## ✅ All Systems Go!

Everything is now functional and ready for testing. Enjoy! 🚀

---

## 🙏 Connect With Me

**Buy me a coffee with ETH**
```
0xdf49e29b6840d7ba57e4b5acddc770047f67ff13
```

**Follow me on X**
https://X.com/lahwealth

**Work with me on Upwork**
https://www.upwork.com/freelancers/~01857093015b424e00

---

**Copyright © 2025 - Built with ❤️ by Horlah**
