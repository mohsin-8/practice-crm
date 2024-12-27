# Practice CRM

This is a Customer Relationship Management System developed with ReactJs (Front-end) & NodeJs (Back-end).

## Setup

Clone the repository using below command:
   ```bash
   git clone https://github.com/mohsin-8/practice-crm.git
```
### For Frontend
1. Go to frontend directory using below command:
   ```bash
   cd frontend
2. Create ```.env``` file in your frontend directory.

3. Add below code in ```.env``` file:
   ```bash
   REACT_APP_STRIPE_PUBLISHEABLE_KEY=pk_test_51OgMexK2Ly0dfRbQMdqgWw8zkB803zYXBTkeP5Zs5fxWwOjg9ZzofoLxXE8PiCkc0QacOVAKVZHkXJIuLAKjiD7V00oZKibKn6
4. Install dependencies:
   ```bash
   npm install
5. Start using frontend with below command:
   ```bash
   npm start
   ```

### For Backend
  1. Go to backend directory using below command:
     ```bash
     cd backend
  2. Create ```.env``` file in your backend directory.
     
  3. Add below code in ```.env``` file:
     ```bash
     MONGODB=mongodb+srv://momo:mohsinalikhan@cluster0.n6bdw.mongodb.net/practice-crm?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
     EMAIL_USER="alikhanmohsin420@gmail.com"
     EMAIL_PASS="bjys yooa umpj qkzg"
     LOCAL_FRONTEND_URL="http://localhost:3000"
     LIVE_FRONTEND_URL="https://practice-crm-server.vercel.app"
     STRIPE_SECRET_KEY="sk_test_51OgMexK2Ly0dfRbQeJPbczm4CqUzJQK4JSzbOWGM9dfBzfQenUP8nCR3e0adRckGMIXB735EL3ucCyPONhjIdv1500cUa10J25"
  4. Install dependencies:
     ```bash
     npm install
  5. Start using backend with below command:
     ```bash
     npm run dev
