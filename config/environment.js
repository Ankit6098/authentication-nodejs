const development = {
    name: 'Development',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: 'http://localhost:3000/user/oauth2callback',

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: 'http://localhost:3000/user/auth/github/callback',

    mongoUrl: process.env.mongoUrl,
}

const production = {
    name: 'Production',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: 'https://nodejs-auth-9sea.onrender.com/user/oauth2callback',

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: 'https://nodejs-auth-9sea.onrender.com/user/auth/github/callback',

    mongoUrl: process.env.mongoUrl,
}

module.exports = development;