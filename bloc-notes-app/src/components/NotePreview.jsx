import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

const markdownComponents = {
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-3 p-4 rounded-lg bg-slate-800 border border-slate-600 overflow-x-auto text-sm font-mono text-slate-200"
    >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <code {...props} className={`font-mono text-sm text-slate-200 ${className || ''}`}>
          {children}
        </code>
      )
    }
    return (
      <code
        {...props}
        className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-sm border border-slate-600"
      >
        {children}
      </code>
    )
  },
}

export function NotePreview({ markdown }) {
  const content = markdown?.trim() || ''
  return (
    <div className="markdown-preview min-h-[200px] p-4 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-200 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0.5">
      {content ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <p className="text-slate-500 italic">Aucun contenu à prévisualiser.</p>
      )}
    </div>
  )
}
