# Library Management System

A comprehensive single-page application (SPA) for managing library resources, memberships, transactions, and administrative operations.

## Project Structure

```
├── index.html          - Main HTML entry point
├── app.js              - Core router and page rendering
├── data.js             - Data layer with localStorage CRUD
├── transactions.js     - Transaction management (Issue, Return, Fine)
├── maintenance.js      - Admin maintenance (Add/Update Books, Members, Users)
├── reports.js          - Report generation and viewing
├── styles.css          - Complete styling system
└── README.md           - Project documentation
```

## Features Overview

### 1. **Authentication System**
- Secure login with session management
- Two user roles: Admin and Regular User
- Password input is securely hidden during login
- Demo credentials available on login page

### 2. **Admin Dashboard** (Admin Only)
- View library statistics (Books, Movies, Members, Active Issues)
- Access to all maintenance functions
- Full report generation capabilities
- Manage all system users and data

### 3. **Maintenance Module** (Admin Only)

#### Books/Movies Management
- **Add Book/Movie**: Create new inventory with auto-generated serial numbers
  - Select type (Book or Movie)
  - All fields mandatory: Name, Author/Director, Category, Cost, Procurement Date, Quantity
  - Comprehensive validation with error messages
  
- **Update Book/Movie**: Modify existing inventory
  - Search by name and serial number
  - Update status (Available, Issued, Lost, Under Repair)
  - Validation ensures data integrity

#### Membership Management
- **Add Membership**: Register new members
  - All fields mandatory: Name, Contact, Address, Aadhar Card Number
  - Three membership duration options: 6 months, 1 year, 2 years (default: 6 months)
  - Auto-calculated end date based on duration
  - Dynamic date updates when start date or duration changes

- **Update Membership**: Extend or cancel memberships
  - Membership number lookup with verification
  - Extend membership: 6 months, 1 year, or 2 years options
  - Cancel membership by setting end date to today
  - Automatic status update (Active/Inactive)

#### User Management
- **Add New User**: Create system accounts
  - Username, Full Name, Password (min 3 characters)
  - Permissions: Active/Inactive, Admin privileges
  - Validation prevents duplicate usernames

- **Update Existing User**: Modify user details
  - Search and update user credentials
  - Toggle admin permissions and active status
  - Password change capability

### 4. **Transactions Module** (All Users)

#### Book Availability Search
- Search available books by name or author (at least one required)
- Displays only available items
- Radio button selection for issue workflow
- Clear error messages if no results found

#### Book Issue
- **Field Validations:**
  - Book name: Required, selected from available inventory
  - Author: Auto-populated, non-editable
  - Issue Date: Cannot be before today
  - Return Date: Auto-populated 15 days ahead
    - Editable but must be between issue date and 15 days after
  - Remarks: Optional free text field
- Comprehensive validation with inline error messages

#### Book Return
- **Field Validations:**
  - Book name: Required dropdown selection
  - Serial number: Auto-populated from selected book
  - Issue date: Auto-filled, non-editable
  - Return date: Editable, can be before or after originally scheduled date
- Automatic fine calculation (₹10/day overdue)
- Transitions to payment workflow

#### Fine Payment
- **Display Fields (Read-only):**
  - Book and member information
  - Issue and return dates
  - Serial number and membership ID
- **Fine Handling:**
  - If fine > 0: Checkbox must be marked "Fine Paid" to proceed
  - If fine = 0: Direct confirmation without payment required
  - User receives clear feedback on payment status
- Transaction completion marks book as available

### 5. **Reports Module** (All Users)

Six comprehensive reports available:

1. **Master List of Books** - All books with details and status
2. **Master List of Movies** - All movies with details and status
3. **Master List of Memberships** - Member information, status, and pending fines
4. **Active Issues** - Currently issued books with due dates
5. **Overdue Returns** - Past due items with calculated fines
6. **Pending Issue Requests** - Books requested but not yet fulfilled

All reports include:
- Search-friendly table layouts
- Status badges with color coding
- Fine amounts displayed in currency format
- Quick navigation back to reports list

### 6. **User Experience Features**

#### Form Validations
- **Real-time feedback:** Error messages appear on same page
- **Field-level validation:** Errors show below specific fields
- **Clear messages:** Descriptive error text explains what's needed
- **Phone numbers:** 10-digit pattern validation
- **Dates:** Min/max constraints with auto-calculated values
- **Required fields:** Marked with red asterisk (*)

#### UI Elements
- **Radio Buttons:** Only one option selectable per group
  - Default selections: Book (not Movie), 6 months (for membership), New User
- **Checkboxes:** Checked = Yes, Unchecked = No
  - Used for: Fine paid confirmation, Active status, Admin privileges
- **Password Input:** Always hidden during typing
- **Dropdown Menus:** Auto-populate related fields
- **Date Pickers:** Min/max constraints prevent invalid dates
- **Status Badges:** Color-coded for quick visual scanning

#### Navigation
- **Chart Link:** Available on all pages for flow visualization
- **Consistent Sidebar:** Quick access to main sections
- **Breadcrumb Actions:** Back buttons maintain navigation history
- **Role-based Menu:** Admin sees maintenance options, users don't

---

## Usage Instructions

### Getting Started

1. **Open the Application**
   - Open `index.html` in a modern web browser
   - No server required - everything runs client-side

2. **Login**
   - **Admin Account:** Username: `adm` | Password: `adm`
   - **User Account:** Username: `user` | Password: `user`
   - Credentials visible on login page for demo purposes

### Admin Workflow Example

1. **First-Time Setup**
   - Go to Maintenance → Add Book/Movie to add inventory
   - Go to Maintenance → Add Membership to register members
   - Go to Maintenance → User Management to add staff

2. **Daily Operations**
   - Use Transactions → Issue Book to lend items
   - Use Transactions → Return Book when members return items
   - Pay any fines if overdue
   - View Reports for system overview

### Member Workflow Example

1. **Search & Issue**
   - Go to Transactions → Is book available?
   - Search for desired book by name or author
   - Select book to issue
   - Confirm dates (return date auto-calculated 15 days out)

2. **Return & Pay Fines**
   - Go to Transactions → Return Book
   - Select book to return
   - System calculates fine if overdue
   - Confirm fine payment (if applicable)

3. **Check Reports**
   - View inventory availability
   - Check membership details
   - Track past transactions

---

## Data Persistence

- All data stored in **Browser's LocalStorage**
- Persists across browser sessions
- Clear browser data to reset application to seed state
- No external database or API required

### Seed Data Included

- **2 Demo Users:** Admin (adm) and Member (user)
- **10 Sample Books/Movies:** Science, Economics, Fiction, Children categories
- **4 Sample Members:** Various membership statuses and pending fines
- **2 Sample Issues:** One active, one overdue
- **2 Sample Requests:** For issue request tracking

---

## Technical Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Storage:** Browser LocalStorage API
- **Styling:** CSS3 with CSS Variables
- **Architecture:** Single Page Application (SPA) with client-side routing
- **Framework:** Custom lightweight framework (no dependencies)

---

## Validation Rules

### Book Management
- Name & Author: Not empty
- Category: Must select from predefined list
- Cost: Positive number
- Quantity: At least 1

### Member Management
- First Name & Last Name: Not empty
- Contact Number: Exactly 10 digits
- Aadhar: Alphanumeric (XXXX-XXXX-XXXX format)
- Address: Not empty

### Transactions
- **Issue Date:** Cannot be in the past
- **Return Date:** Must be between issue date and 15 days after
- **Book Selection:** At least one search criterion required
- **Fine Payment:** Checkbox required for overdue items before return completion

### User Management
- Username: Unique (not duplicate for new users)
- Password: Minimum 3 characters
- Name: Not empty

---

## Fine Calculation

- **Rate:** ₹10 per day overdue
- **Calculation:** `Days Overdue × 10`
- **Example:** 5 days overdue = ₹50 fine
- **Payment:** Required before book return is completed (if fine > 0)

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Features Checklist

✅ Login & Authentication
✅ Role-based Access Control (Admin/User)
✅ Password hidden input
✅ Radio buttons (single select)
✅ Checkboxes (yes/no)
✅ Form validations on same page
✅ Automatic field population
✅ Dynamic date calculations
✅ Serial number auto-generation
✅ Fine calculation engine
✅ Book search functionality
✅ Membership management
✅ Comprehensive reports
✅ User management system
✅ Responsive design
✅ Application flow chart
✅ Transaction success/cancel pages

---

## Future Enhancements

- Search functionality in reports
- Export reports to PDF/Excel
- Email notifications for overdue items
- Reservation system for unavailable books
- Member balance/payment history
- Issue search by member name
- Bulk book import
- Advanced analytics dashboard

---

## Support & Troubleshooting

**Q: Browser shows blank page**
- Ensure JavaScript is enabled
- Clear browser cache and reload
- Try a different browser

**Q: Data disappeared after refresh**
- Check browser's storage settings
- Ensure cookies/storage not disabled
- Try incognito/private mode

**Q: Can't login**
- Use exact credentials: `adm/adm` or `user/user`
- Check if caps lock is on (password is case-sensitive)

**Q: Fine calculation seems wrong**
- Verify return date is after original due date
- Calculation: ₹10 per complete day overdue
- Fractional days round up

---

## Project Completion Status

**Mandatory Modules:**
- ✅ Maintenance Module (100%)
- ✅ Transactions Module (100%)
- ✅ Reports Module (100%)

**Feature Completeness:**
- ✅ All validations implemented
- ✅ All error messages in-place
- ✅ All calculations working
- ✅ Full role-based access control
- ✅ Complete transaction flows

---

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready
