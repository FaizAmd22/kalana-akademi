import { getAuth } from "firebase/auth"

import { app } from "@/lib/firebase"

// Separate from lib/firebase so Firebase Auth is only bundled with the admin
// pages (the only ones that sign in), not with every public page.
export const auth = getAuth(app)
