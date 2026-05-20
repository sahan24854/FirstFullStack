"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../models/db");
const router = (0, express_1.Router)();
const otpStore = {};
/**
 * POST /api/auth/send-otp
 * Generate and "send" an OTP verification code via console logs
 */
router.post('/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email address is required' });
    }
    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
    otpStore[email.toLowerCase()] = { otp, expiresAt };
    console.log(`
┌────────────────────────────────────────────────────────┐
│  Verification Code Generated for: ${email}
│  OTP CODE: ${otp} (Expires in 5 minutes)
└────────────────────────────────────────────────────────┘
  `);
    res.json({ message: 'Verification code sent to console logs.' });
});
/**
 * POST /api/auth/verify-otp
 * Validate OTP code and authenticate or create a new user profile
 */
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP code are required' });
    }
    const normalizedEmail = email.toLowerCase();
    const storedOtp = otpStore[normalizedEmail];
    if (!storedOtp) {
        return res.status(400).json({ error: 'No verification code was sent to this email' });
    }
    if (Date.now() > storedOtp.expiresAt) {
        delete otpStore[normalizedEmail];
        return res.status(400).json({ error: 'Verification code has expired' });
    }
    if (storedOtp.otp !== otp.trim()) {
        return res.status(400).json({ error: 'Invalid verification code' });
    }
    // OTP verified successfully! Remove it.
    delete otpStore[normalizedEmail];
    // Find or create user
    const users = db_1.Database.getUsers();
    let user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
        const defaultTags = [
            { id: 'tag_work', name: 'Work', color: 'work' },
            { id: 'tag_personal', name: 'Personal', color: 'personal' },
            { id: 'tag_urgent', name: 'Urgent', color: 'urgent' },
            { id: 'tag_todo', name: 'Todo', color: 'todo' }
        ];
        user = {
            id: `user_${Date.now()}`,
            email: normalizedEmail,
            profile: {
                name: email.split('@')[0],
                bio: 'Welcome to your workspace! Click edit to add your bio details.'
            },
            settings: {
                theme: 'light',
                colorTheme: 'default',
                language: 'en'
            },
            tags: defaultTags
        };
        users.push(user);
        db_1.Database.saveUsers(users);
    }
    res.json({ message: 'Verification successful', user });
});
/**
 * PUT /api/auth/users/:id
 * Update user details (profile, settings, tags)
 */
router.put('/users/:id', (req, res) => {
    try {
        const id = req.params.id;
        const { profile, settings, tags } = req.body;
        const users = db_1.Database.getUsers();
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = users[userIndex];
        if (profile)
            user.profile = { ...user.profile, ...profile };
        if (settings)
            user.settings = { ...user.settings, ...settings };
        if (tags)
            user.tags = tags;
        users[userIndex] = user;
        db_1.Database.saveUsers(users);
        res.json({ message: 'User updated successfully', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map