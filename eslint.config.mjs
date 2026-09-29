import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local agent worktrees and Wrangler state
    ".claude/**",
    ".wrangler/**",
  ]),
  {
    // eslint-plugin-react auto-detects the React version via an API that
    // ESLint 10 removed (context.getFilename); stating it skips that path.
    settings: { react: { version: "19.3" } },
  },
  {
    // shadcn/ui generated components are kept as upstream ships them
    files: ["src/components/ui/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
