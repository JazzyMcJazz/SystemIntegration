import { SupabaseClient, createClient } from "@supabase/supabase-js";
import type { Cookies } from "@sveltejs/kit";

const client = createClient(
    "http://localhost:8000",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjgxNjgyNDAwLAogICAgImV4cCI6IDE4Mzk1MzUyMDAKfQ.DAr8qMCK_xOK4pXd8-adWd296erhIPxPntE7BnN0WM8"
);

export const signup = async (email: string, password: string, cookies: Cookies) => {
    const response = await client.auth.signUp({
        email,
        password
    });

    const { data, error } = response;
    const { user, session } = data;

    if (error || !user || !session) return response;

    setCookies(cookies, session);

    return response;
}

export const login = async (email: string, password: string, cookies: Cookies) => {
    const response = await client.auth.signInWithPassword({
        email,
        password
    });

    const { data, error } = response;
    const { user, session } = data;

    if (error || !user || !session) return response;

    setCookies(cookies, session);

    return response;
}

export const logout = async (cookies: Cookies) => {
    cookies.delete('access_token');
    cookies.delete('refresh_token');
}

export const refreshSession = async (refresh_token: string, cookies: Cookies) => {
    const response = await client.auth.refreshSession({refresh_token});

    const { data, error } = response;
    const { session } = data;

    if (error || !session) return response;

    setCookies(cookies, session);

    return response;
}

export const getUser = async (access_token: string) => {
    return await client.auth.getUser(access_token);
}


//==================//
// Helper Functions //
//==================//

const setCookies = (cookies: Cookies, session: any) => {
    cookies.set('access_token', session.access_token, {
        path: '/',
        maxAge: session.expires_in,
        sameSite: 'strict',
        httpOnly: true,
        secure: true
    });

    cookies.set('refresh_token', session.refresh_token, {
        path: '/',
        sameSite: 'strict',
        httpOnly: true,
        secure: true
    });
}