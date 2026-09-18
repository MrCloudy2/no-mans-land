export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  // Files in src/static are copied verbatim, never treated as templates.
  eleventyConfig.ignores.add("src/static/**");

  // 14 March 2026
  eleventyConfig.addFilter("readableDate", (value, locale = "en-GB") =>
    new Date(value).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  // 14.03. — used in the margin rail
  eleventyConfig.addFilter("shortDate", (value) => {
    const d = new Date(value);
    return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.`;
  });

  eleventyConfig.addFilter("year", (value) => new Date(value).getFullYear());
  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());
  eleventyConfig.addFilter("rfc822", (value) => new Date(value).toUTCString());

  // Rough reading time, so posts can say how long they are.
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content).replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // Posts newest first, everywhere.
  eleventyConfig.addCollection("writing", (api) =>
    api.getFilteredByGlob("src/posts/*.md").reverse()
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
