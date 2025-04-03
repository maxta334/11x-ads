# Authentication Flows

## First Time Sign In
```mermaid
You ➜ Click Sign In ➜ Google Login ➜ Auth Success ➜ BACK TO HERO
```

## Buying Access
```mermaid
You ➜ Buy Button ➜ Lemon Squeezy ➜ Pay 💳 (STAYS ON SAME SCREEN AS LEMONSQUEEZY OPENS) ➜ REDIRECTED TO DASHBOARD PAGE
```

## Dashboard ACCESS
YOU CAN ONLY ACCESS THE DASHBOARD IF YOU ARE PAID. THE DASHBOARD BUTTON ONLY SHOWS UP IN @HEADER IF YOU ARE PAID. USER HAS ACCESS FOREVER TO THE DASHBOARD AS THIS IS NOT A SUBSCRIPTION. VERY FUCKING SIMPLE.


## CONSULTING ACCESS
YOU ➜ CLICK SCHEDULE CONSULTATION BUTTON ON PRICING PAGE ➜ IMMEDIETLY GOES TO CAL.COM


## Buttons

UN-SIGNED IN USER 
- IN HEADER THEY SEE THE SIGN IN BUTTON
- THE CHECKOUT BUTTON REDIRECTS TO THE SIGN IN BUTTON

SIGNED IN UNPAID USERS
- IN THE HEADER THEY SEE THE ACCOUNT BUTTON SO THEY CAN LOGOUT IF THEY WANT

SIGNED IN PAID USERS
- IN THE HEADER THEY STILL SEE THE ACCOUNT BUTTON, BUT A NEW OPTION TO GO TO THE DASHBOARD IN THE DROP-DOWN SHOWS UP WHICH IS WHAT THEY FUCKING PAID FOR. THEY HAVE FOREVER ACCESS TO THE DASHBOARD SINCE ITS NOT A SUBSCRIPTION.

# Auth & Header Issues Fixed

## The Problem
Header wasn't showing the right buttons because:
1. Wrong RLS policies in Supabase
2. Profile table permissions were fucked
3. Google avatar images weren't loading
4. Race conditions in auth state

## The Solution

### 1. Fixed Database Permissions (auth.sql)
```sql
-- Let users read their own profile
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Let webhook update access
CREATE POLICY "Service role can update access"
    ON public.profiles FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Let users actually read their shit
GRANT SELECT ON public.profiles TO authenticated;
```

### 2. Fixed Auth Flow (Header.js)
```javascript
// Added cleanup flag to prevent state updates after unmount
let isSubscribed = true;

// Create profile if it doesn't exist
if (profileError?.code === 'PGRST116') {
  await supabase.from('profiles').insert([{ 
    id: user.id, 
    email: user.email, 
    has_access: false 
  }]);
}

// Proper cleanup
return () => {
  isSubscribed = false;
  authSubscription?.unsubscribe();
  profileSubscription?.unsubscribe();
};
```

### 3. Fixed Google Images (next.config.js)
```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    },
    {
      protocol: "https",
      hostname: "*.googleusercontent.com",
    },
  ],
},
```

## How It Works Now

1. **Not Signed In**
   - Shows Sign In button
   - That's it

2. **Signed In, No Access**
   - Shows Account button with avatar
   - Profile gets created automatically
   - No Dashboard option

3. **Signed In, Has Access**
   - Shows Account button with avatar
   - Dashboard option in dropdown
   - Everything just works
