import jwt from 'jsonwebtoken';
// Generate Access Token
export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '1d' }  
    );
};

// Generate Refresh Token
export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '12h' }  
    );
};

// Middleware to save or update tokens in the user model
export const saveTokens = async (user, accessToken, refreshToken) => {
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
};

// Middleware to handle token creation and saving during user login/signup
export const handleTokenGeneration = async (user, res) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    await saveTokens(user, accessToken, refreshToken);
    
    return res.status(200).json({
        success: true,
        doc: [
        {accessToken},
        {refreshToken},
        {user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    }
    ]
    });
};
