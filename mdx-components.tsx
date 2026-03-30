import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-text-dark mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text-dark mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-body text-text-body mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-text-body">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-text-body">{children}</ol>
    ),
    li: ({ children }) => <li className="text-body">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-text-dark">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:text-primary-light underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-light pl-4 italic text-text-body my-6">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-primary-wash text-left px-4 py-3 font-semibold text-text-dark border border-border">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border border-border text-text-body">{children}</td>
    ),
    ...components,
  };
}
