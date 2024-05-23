import CredentialsProvider from "@auth/core/providers/credentials"
import NextAuth from "next-auth"
import { UserService } from "@/app/user/user.service"
import { createClient } from "@libsql/client";
import { db } from "@/app/db/db";
import { Session } from "next-auth";
import bcrypt from 'bcrypt';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const us = new UserService();
                console.log("dentro del authorize");
                // const usuario = await us.findUserByEmail(credentials.email + "");
                // // if (usuario) {

                // // }

                // // createClient().auth.getUser()
                // // createClient().auth.signInWithPassword(credentials as unknown as SignInWithPasswordCredentials)
                // // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                // if (usuario) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return usuario
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null
                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }


                try {
                    if (!credentials) throw new Error("no credentials to log in as");
                    // const { email, password } = credentials;
                    // const {
                    //   salt,
                    //   password: hashedPassword,
                    //   ...user
                    // }
                    const user = await us.findUserByEmail(credentials.email + "");
                    const email = user?.getEmail();
                    const hashedPassword = user?.getPassword() + "";
                    const pwd = credentials.password + "";
                    const logged = bcrypt.compare(pwd, hashedPassword);
                    if (!logged) throw new Error("invalid credentials");
                    return user as any; // fix for https://github.com/nextauthjs/next-auth/issues/2701
                } catch (ignored) {
                    return null;
                }
            }
        })
    ],
    // session: {
    //     jwt: true
    // },
    // callbacks: {
    //     async jwt({ token, account, profile }) {
    //         // Persist the OAuth access_token and or the user id to the token right after signin
    //         if (account) {
    //             token.accessToken = account.access_token
    //             // token.id = profile.id
    //         }
    //         return token
    //     },
    //     async session({ session, token, user }) {
    //         session.accessToken = token.accessToken
    //         // session.user.id = token.id

    //         return session // The return type will match the one returned in `useSession()`
    //     },
    // },
})