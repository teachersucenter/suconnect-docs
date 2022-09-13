// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SuConnect",
  tagline: "Docs and tutorials for the SuConnect platform.",
  url: "https://docs.teachersucenter.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "teachersucenter", // Usually your GitHub org/user name.
  projectName: "suconnect-docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: false,
       
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "SuConnect",
        logo: {
          alt: "SuConnect Logo",
          src: "img/logosm.png",
        },
        items: [
          {
            href: "https://api-dev.teachersucenter.com/api/v2/swagger",
            label: "Swagger",
            position: "right",
          },

          {
            href: "https://github.com/teachersucenter/suconnect-docs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Contacts",
            items: [
              {
                label: "tech@teachersucenter.com",
                to: "mailto:tech@teachersucenter.com",
              },
              {
                label: "GitHub",
                href: "https://github.com/teachersucenter",
              },
            ],
          },
          {
            title: "Teacher Su International School",
            items: [
              {
                label: "hello@teachersucenter.com",
                href: "mailto:hello@teachersucenter.com"
              },
              {
                label: "teachersucenter.com",
                href: "https://teachersucenter.com",
              },
              {
                label: "facebook",
                href: "https://facebook.com/teachersucenter"
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} by Teacher Su International School`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
