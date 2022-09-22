/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: "category",
      label: "Docs",
      link: { type: "doc", id: "index" },
      items: [
        "introduction/introduction",
        "introduction/authentication",
        "introduction/pagination",
        "introduction/sorting",
        "introduction/filtering",
        "introduction/expanding",
        "introduction/authorization",
        "introduction/metadata",
        "query-param-reference"
        
      ],
    },
  ],

  // But you can create a sidebar manually
};

module.exports = sidebars;
