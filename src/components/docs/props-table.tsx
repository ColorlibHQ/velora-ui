import type { ComponentPropsDoc } from "@/lib/component-props";

const nativeElement = (ext: string) =>
  ext.match(/HTMLAttributes<HTML(\w+?)Element>/)?.[1] ??
  ext.match(/SVGProps<SVG(\w+?)Element>/)?.[1];

function extendsNote(ext: string) {
  const el = nativeElement(ext);
  if (!el) return ext;
  const tag =
    { Div: "div", Span: "span", Button: "button", Anchor: "a", SVG: "svg", "": "element" }[
      el
    ] ?? el.toLowerCase();
  return `<${tag}>`;
}

/** Props tables generated from the component's TypeScript interfaces. */
export function PropsTable({
  doc,
  highlightedTypes,
}: {
  doc: ComponentPropsDoc;
  highlightedTypes: { name: string; html: string }[];
}) {
  const multiple = doc.components.length > 1;

  return (
    <div className="space-y-8">
      {doc.components.map((component) => (
        <div key={component.name}>
          {multiple && (
            <h3 className="mb-3 font-mono text-sm font-semibold">
              {component.name}
            </h3>
          )}
          {component.props.length > 0 && (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {component.props.map((prop) => (
                    <tr key={prop.name} className="align-top">
                      <td className="px-4 py-3">
                        <code className="font-mono text-[13px] font-medium text-foreground">
                          {prop.name}
                          {prop.required && (
                            <span className="text-primary" title="Required">
                              *
                            </span>
                          )}
                        </code>
                        {prop.description && (
                          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                            {prop.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <code className="font-mono text-[13px] break-words text-muted-foreground">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <code className="font-mono text-[13px] text-muted-foreground">
                          {prop.default ?? "—"}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {component.extends.length > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              Also accepts every{" "}
              {component.extends.map((ext, i) => (
                <span key={ext}>
                  {i > 0 && ", "}
                  <code className="font-mono text-[13px] text-foreground">
                    {extendsNote(ext)}
                  </code>
                </span>
              ))}{" "}
              {component.extends.every(nativeElement) ? "attribute" : "prop"}, forwarded
              to the root element.
            </p>
          )}
        </div>
      ))}

      {highlightedTypes.map((type) => (
        <div key={type.name}>
          <h3 className="mb-3 font-mono text-sm font-semibold">{type.name}</h3>
          <div
            className="overflow-x-auto rounded-xl border text-sm [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: type.html }}
          />
        </div>
      ))}
    </div>
  );
}
