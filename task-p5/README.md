# DEV@Deakin P5

This project continues my DEV@Deakin home page, account pages and Question/Article form. P5 adds a welcome email when a visitor subscribes.

## Run

Run `npm install`, then `npm run dev` from this folder. Open the address printed by Vite. The local .env is already configured. On another computer, copy .env.example to .env and supply your own settings.

`npm run build` builds the website. `npm start` serves the built website and email backend.

## Files to understand

| File | Purpose |
| --- | --- |
| src/main.jsx | Opens the React app |
| src/App.jsx | Routes Home, Login, Signup and Post |
| src/firebase.js | Connects to Firebase Authentication |
| src/pages/Login.jsx | Signs in using Firebase |
| src/pages/Signup.jsx | Creates an account and saves its display name |
| src/pages/NewPost.jsx | Switches between Question and Article forms |
| src/postValidation.js | Checks post fields |
| src/components/Newsletter.jsx | Sends the email address and displays feedback |
| backend/index.js | Starts Express and connects the newsletter route |
| backend/newsletter.js | Validates the email and calls SendGrid |
| src/components/ | Navbar, footer, newsletter and content cards |
| src/data/data.js | Home-page card content |

## Concepts for the demo

- Components are reusable pieces of a page.
- Props pass card details from a parent component.
- useState remembers input values and messages.
- onChange updates a value; onSubmit handles a form.
- React Router changes the displayed page.
- Firebase Authentication creates accounts and checks passwords. My app does not store passwords.
- fetch sends the subscription request to Express.
- JSON.stringify converts an object to request text; response.json reads the reply. These do not create files.
- await waits for Firebase or SendGrid; try/catch handles failure.
- The disabled button prevents extra clicks while sending.
- .env stores configuration. Only VITE_ settings are exposed to React. Never prefix the SendGrid key with VITE_.

## Accounts and email

P5 now uses Firebase Authentication instead of the old custom Firestore account system. Existing P3/P4/C1 files and old Firestore records are untouched. Old Firestore-only accounts must register again for P5. A separate src/firebase.js contains public web-app configuration; no private service-account JSON is needed in this project.

The small Express backend is required for P5 and keeps the SendGrid key private. SendGrid returns 202 when it accepts an email; our route returns 200 to React. Acceptance is not proof of inbox delivery. No daily mailing schedule or subscriber database is implemented.

The Post form preserves separate Question and Article drafts. Its success popup is a demonstration; posts are not saved or published.

## Submission

Record your own 2-4 minute walkthrough. Include page screenshots, actual terminal status, your repository link and your video link. The sheet asks for GitLab Internal; this project is on GitHub at the student's request.

Repository: https://github.com/akashapple1107-rgb/SIT313-FullStack-/tree/main/P5/task-p5

The reference repository was inspected only to compare scope and complexity. This project retains its own existing markup, styles, content and route structure.
