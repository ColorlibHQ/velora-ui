import { FileTree } from "@/components/velora/file-tree";

export default function FileTreeDemo() {
  return (
    <FileTree
      className="max-w-xs text-xs"
      tree={[
        {
          name: "components",
          children: [
            {
              name: "velora",
              children: [{ name: "marquee.tsx" }, { name: "dock.tsx" }],
            },
            { name: "ui", children: [{ name: "button.tsx" }] },
          ],
        },
      ]}
    />
  );
}
