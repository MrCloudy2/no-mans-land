// Drafts are visible while you run `npm start`, and hidden from any production build
// unless you set BUILD_DRAFTS=true (which is what the review site does).
const showDrafts =
  process.env.BUILD_DRAFTS === "true" ||
  process.env.ELEVENTY_RUN_MODE === "serve" ||
  process.env.ELEVENTY_RUN_MODE === "watch";

export default {
  layout: "post.njk",
  tags: "writing",
  author: "cloudy",
  draft: false,
  showDrafts,
  eleventyComputed: {
    permalink: (data) => (data.draft && !showDrafts ? false : `/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) =>
      data.draft && !showDrafts ? true : data.eleventyExcludeFromCollections,
  },
};
