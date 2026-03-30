import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: number;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const lines = raw.split("\n");
  if (lines[0]?.trim() !== "---") {
    return { data: {}, content: raw };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i]?.trim() === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatterLines = lines.slice(1, endIndex);
  const data: Record<string, string> = {};

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  const content = lines.slice(endIndex + 1).join("\n").trim();
  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = parseFrontmatter(raw);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "",
      excerpt: data.excerpt || "",
      readTime: parseInt(data.readTime || "5", 10),
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    category: data.category || "",
    excerpt: data.excerpt || "",
    readTime: parseInt(data.readTime || "5", 10),
    content,
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category)));
}
