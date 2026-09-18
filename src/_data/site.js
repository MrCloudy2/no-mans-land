// Everything that identifies the site lives here. Edit this file first.
export default {
  title: "No Man's Land",
  tagline: "Notes and arguments from two people with no editor, no deadline and no side.",
  description: "An independent news and commentary blog written by two friends.",
  // Set this to your real domain before launch — the RSS feed needs it.
  url: "https://nomanland.netlify.app/",
  language: "en",
  authors: {
    cloudy: {
      name: "Cloudy",
      bio: "Writes about infrastructure, land and the machinery behind decisions.",
    },
    tilen: {
      name: "Tilen",
      bio: "Add a sentence here about what Tilen covers.",
    },
  },
  nav: [
    { text: "Latest", url: "/" },
    { text: "Archive", url: "/archive/" },
    { text: "About", url: "/about/" },
    { text: "Feed", url: "/feed.xml" },
  ],
};
