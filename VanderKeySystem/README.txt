# Vander Secure Gate - Integration Guide

This folder contains the files needed to add the Secure Gate system to your website.

## Files
1. `LockScreen.jsx` - The main component that handles the lock screen and key validation.
2. `App.example.jsx` - An example of how to modify your `App.jsx` to use the lock screen.
3. `key-system.css` - The styles required for the lock screen to look good.

## How to Install

1. **Copy `LockScreen.jsx`** into your project's `src/components/` folder (create it if it doesn't exist).
2. **Copy `key-system.css`** content into your project's `src/index.css`. You can just append it to the end.
3. **Modify `App.jsx`**:
   - Import `LockScreen` and `AnimatePresence`.
   - Wrap your main content with the conditional logic shown in `App.example.jsx`.

## Dependencies
Ensure you have these installed in your project:
```bash
npm install framer-motion lucide-react
```

## Key Configuration
The valid keys are currently checked in `LockScreen.jsx`. 
- `ACCESS-KEY-2026` (Default)
- Any key starting with `VANDER-` (e.g. `VANDER-1234`)

To change this, edit the `handleSubmit` function in `LockScreen.jsx`.
