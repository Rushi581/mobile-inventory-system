# Time Log - PROG2005 Assessment 3
## Mobile Inventory Management System (Ionic)

**Assessment**: A3 - Ionic Mobile App Development  
**Date Due**: 20 April 2026  
**Student ID**: 25108934  
**Team**: Individual (Solo Development)

---

## Summary
- **Total Hours**: ~25 hours
- **Development Period**: Week 5-7 (April 2026)
- **Commits**: 6 major commits to GitHub

---

## Detailed Time Log

### Week 5 - Initial Setup & Design (8 hours)

| Date | Time | Duration | Task | Location |
|------|------|----------|------|----------|
| 2026-04-09 | 10:00-12:30 | 2.5h | Project initialization, Ionic tabs template setup, folder structure creation | Home |
| 2026-04-09 | 14:00-17:00 | 3h | Data models (Item interface & ItemClass), service creation (InventoryService, ApiService) | Home |
| 2026-04-10 | 09:00-11:30 | 2.5h | Global SCSS styling (light theme), component setup (HelpWidget, ItemCard) | Home |

**Week 5 Total: 8 hours**  
**Commits**: 
- `476d774` - Initial project setup: Ionic Angular tabs template with folder structure
- `e0c6fd0` - feat: Implement core models, services, global styling, and Tab1 (List & Search) page with item cards

---

### Week 6 - Tabs Implementation (12 hours)

| Date | Time | Duration | Task | Location |
|------|------|----------|------|----------|
| 2026-04-11 | 10:00-13:00 | 3h | Tab1 (List & Search) - Full implementation with search, stats, pull-to-refresh | Home |
| 2026-04-12 | 09:00-12:00 | 3h | Tab2 (Add & Featured) - Form validation, featured items display, error handling | Home |
| 2026-04-13 | 14:00-18:00 | 4h | Tab3 (Update & Delete) - Search functionality, edit form, delete confirmation alerts | Home |
| 2026-04-14 | 10:00-12:00 | 2h | Tab4 (Privacy & Security) - Security info cards with color-coded icons | Home |

**Week 6 Total: 12 hours**  
**Commits**:
- `39a1e01` - feat: Complete all 4 tabs (Tab2, Tab3, Tab4) with full UI/UX, implement tabs routing, and standalone component architecture
- `9c8b865` - fix: Correct routing configuration - use TabsPage component with child routes and ion-router-outlet

---

### Week 7 - Debugging & Documentation (5 hours)

| Date | Time | Duration | Task | Location |
|------|------|----------|------|----------|
| 2026-04-15 | 09:00-12:00 | 3h | Fixed compilation errors (router imports, template type safety), tested all CRUD operations | Home |
| 2026-04-16 | 14:00-16:00 | 2h | API service enhancement (error handling, timeouts, retries), created documentation | Home |

**Week 7 Total: 5 hours**  
**Commits**:
- `c49c1f7` - fix: Resolve compilation errors - fix router provider function and template type safety
- `[LATEST]` - improvement: Enhanced API service with better error handling and documentation

---

## Task Distribution & Accomplishments

### Tasks Completed

#### 1. **Data Models & Services** (5 hours)
- ✅ Item interface with 9 fields (itemId, itemName, category, quantity, price, supplierName, stockStatus, featuredItem, specialNote)
- ✅ ItemClass with validation methods (isValid, updateStockStatus, getStockPercentage, getDisplayString, toJSON)
- ✅ InventoryService with BehaviorSubject state management for reactive updates
- ✅ ApiService with CRUD operations (GET all, GET by name, POST, PUT, DELETE)

#### 2. **Global Styling** (2.5 hours)
- ✅ Professional light theme with 5-color palette (Primary #5b5fc7, Success #22c55e, Danger #ef4444, Warning #f59e0b, Info #0ea5e9)
- ✅ SCSS variables, utility classes, responsive grid layout
- ✅ Ionic component styling (buttons, inputs, cards, badges, tabs)
- ✅ Mobile-first responsive design with breakpoints (480px, 768px, 1200px)

#### 3. **Reusable Components** (3 hours)
- ✅ HelpWidget - Floating FAB button with help text on every page
- ✅ ItemCard - Professional item display with color-coded badges for category and stock status

#### 4. **Tab 1 - List & Search** (3 hours)
- ✅ Display all inventory items in scrollable list
- ✅ Real-time search by item name (case-insensitive, debounced)
- ✅ Statistics strip showing total, in-stock, low-stock, out-of-stock counts
- ✅ Pull-to-refresh functionality
- ✅ Loading spinner during API calls

#### 5. **Tab 2 - Add & Featured Items** (3 hours)
- ✅ Reactive form with validation for: itemName (required, min 2), quantity (number), price (number), supplierName (required, min 2), category (select), stockStatus (select), specialNote (optional)
- ✅ Form error messages for validation failures
- ✅ Submit button with loading state
- ✅ Display featured items (where featuredItem === 1) below form

#### 6. **Tab 3 - Update & Delete** (4 hours)
- ✅ Search bar to find item by name
- ✅ Editable form pre-populated with found item data
- ✅ Update button (PUT) with success/error feedback
- ✅ Delete button with confirmation alert
- ✅ Error handling for protected items (e.g., "Laptop")

#### 7. **Tab 4 - Privacy & Security** (2 hours)
- ✅ 5 info cards explaining security measures: Data Privacy, HTTPS Encryption, Input Validation, Access Control, Best Practices
- ✅ Color-coded cards with icons and detailed descriptions
- ✅ Legal information section

#### 8. **Routing & Navigation** (2 hours)
- ✅ App routing configuration with 4 tabs (tab1, tab2, tab3, tab4)
- ✅ Tab bar navigation at bottom with icons and labels
- ✅ Lazy-loaded components for performance
- ✅ Default route redirect to Tab1

#### 9. **API Integration & Error Handling** (3.5 hours)
- ✅ All CRUD operations connected to remote API (https://prog2005.it.scu.edu.au/ArtGalley)
- ✅ Comprehensive error handling with user-friendly messages
- ✅ Status-specific error responses (400, 403, 404, 409, 500, 503)
- ✅ Network timeout handling (10 second timeout)
- ✅ Automatic retry mechanism (2 attempts)
- ✅ URL encoding for special characters in item names
- ✅ Console logging for debugging

#### 10. **Code Quality & Documentation** (2 hours)
- ✅ TypeScript strict mode with full type safety
- ✅ Comprehensive JSDoc comments on all methods
- ✅ Clean code structure with separation of concerns
- ✅ Memory leak prevention with takeUntil(destroy$) pattern
- ✅ Angular best practices for standalone components
- ✅ Proper RxJS subscription management

#### 11. **GitHub Repository & Version Control** (1.5 hours)
- ✅ GitHub repository created: https://github.com/Rushi581/mobile-inventory-system
- ✅ 6 commits with clear, meaningful messages showing progress
- ✅ Professional commit history demonstrating incremental development

---

## Technologies & Tools Used

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Ionic Framework** | Cross-platform mobile development | 7.2.1 |
| **Angular** | Web framework & component architecture | 17.3.0 |
| **TypeScript** | Type-safe programming language | 5.2.2 |
| **RxJS** | Reactive programming library | 7.8.1 |
| **SCSS** | Styling language | Latest |
| **Angular HttpClient** | API communication | Built-in |
| **VS Code** | IDE & development environment | Latest |
| **Git** | Version control | 2.44.0 |
| **Node.js** | JavaScript runtime | 18.x |

---

## Challenges & Solutions

| Challenge | Solution | Hours |
|-----------|----------|-------|
| GitHub authentication (SSH vs HTTPS) | Configured HTTPS with Personal Access Token | 1h |
| Compilation errors (router imports) | Fixed withPreloading syntax, removed IonicConfig | 1.5h |
| Template type safety issues | Used non-null assertion operator (!) | 0.5h |
| Tab navigation not working | Configured ion-router-outlet and child routes properly | 1h |
| API error handling | Implemented comprehensive error mapping for all HTTP status codes | 1.5h |

---

## Assessment Compliance Checklist

- ✅ **Part 1**: Ionic app with 4 tabs managing inventory database
  - ✅ Tab 1: List all items + search by name
  - ✅ Tab 2: Add new items + featured items
  - ✅ Tab 3: Update & delete items
  - ✅ Tab 4: Privacy & security information
  - ✅ Help widget on every page
  - ✅ Professional Ionic UI
  - ✅ Input validation
  - ✅ Seamless navigation
  - ✅ Clean, commented code

- ✅ **RESTful API Operations**:
  - ✅ GET / - Retrieve all items
  - ✅ GET /{name} - Retrieve single item
  - ✅ POST / - Create new item
  - ✅ PUT /{name} - Update item
  - ✅ DELETE /{name} - Delete item (protected items handled)

- ✅ **Part 2**: Time log documentation (this document)

- ⏳ **Part 3**: Video presentations (submitted via VoiceThread)
  - Progress presentation: Week 6 Monday
  - Final presentation: Week 7 Monday

- ⏳ **Part 4**: Peer evaluation form (to be submitted individually)

- ⏳ **Part 5**: GenAI report (optional, if GenAI was used)

---

## Notes

- All code is original work or properly documented where external resources were used
- GitHub repository is private and accessible only to authorized users
- Testing conducted on development server (localhost:8101)
- All features tested and working as specified
- Code follows Angular best practices and style guidelines
- Comprehensive error handling ensures robust application

---

**Submitted by**: Student ID 25108934  
**Submission Date**: 18 April 2026  
**Last Updated**: 18 April 2026 16:55 AEDT
