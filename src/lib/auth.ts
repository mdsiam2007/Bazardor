import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/lib/mongodb";

const baseURL = process.env.BETTER_AUTH_URL?.trim();
const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
const githubClientId = process.env.GITHUB_CLIENT_ID?.trim();
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();

export const auth = betterAuth({
  database: mongodbAdapter(client.db(), { client }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: googleClientId || "mock-google-client-id",
      clientSecret: googleClientSecret || "mock-google-client-secret",
    },
    github: {
      clientId: githubClientId || "mock-github-client-id",
      clientSecret: githubClientSecret || "mock-github-client-secret",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
});
