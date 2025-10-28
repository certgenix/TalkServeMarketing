module.exports = {
  siteUrl: process.env.SITE_URL || 'https://talkserve.ai',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
