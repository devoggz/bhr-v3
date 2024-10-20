import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

// Extend the User object inside the session to include a role
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  username: string;
  points: number;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser; // Ensure that the user in the session has the role and id fields
  }
}
