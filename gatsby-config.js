module.exports = {
  siteMetadata: {
    title: `Polymorphism in TypeScript`,
    description: `A presentation for the Dallas React Meetup`,
    author: `@sliptype`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-mdx-deck`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
