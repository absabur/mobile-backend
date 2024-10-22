exports.createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove trailing hyphens
};
