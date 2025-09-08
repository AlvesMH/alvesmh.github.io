// src/utils/slugify.js
export function slugify(input = "") {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ensureSlug(post) {
  if (!post) return post;
  return { ...post, slug: post.slug || slugify(post.title || String(post.id || "")) };
}

export function makePostPath(post) {
  const p = ensureSlug(post);
  return `/post/${p.slug}`;
}
