# LostLink

A modern lost and found web application.

## Features Implemented
- User and admin authentication (with MySQL database)
- Admin dashboard with:
  - Modern, responsive design (Poppins font, gradients, card shadows, profile/avatar section)
  - Dashboard stats (Total Items, Verified, Claimed)
  - Add Lost Item form (with image upload)
- User homepage to view lost items
- MySQL database setup for users and items (see `database/schema.sql`)
- Organized project structure (HTML, CSS, JS, backend, database)

## How to Set Up
1. **Database**
   - Import the SQL in `database/schema.sql` using phpMyAdmin or MySQL CLI.
   - This creates the `lofo_db` database, `users` table (with roles), and `items` table.

2. **Frontend**
   - Modern admin dashboard (`admin.html`) with improved UI/UX.
   - User homepage (`home.html`) for browsing lost items.

3. **Backend**
   - (To be implemented) Node.js server for authentication and item management.
   - Planned structure: `server.js`, `config/db.js`, API routes/controllers.

## Next Steps
- Complete backend API for login, registration, and item CRUD.
- Connect frontend forms to backend endpoints.
- Add more dashboard features (e.g., notifications, item editing, etc.)

---

For more details, see the code and comments in each file.
