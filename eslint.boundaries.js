import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
  plugins: { boundaries },
  settings: {
    "import/resolver": { typescript: { alwaysTryTypes: true, project: "./tsconfig.app.json" } },
    "boundaries/elements": [
      { type: "app", pattern: "src/app" },
      { type: "features", pattern: "src/features/*" },
      { type: "shared", pattern: "src/shared" },
    ],
  },
  rules: {
    "boundaries/dependencies": ["error", {
      default: "allow",
      policies: [
        {
          from: { element: { type: "shared" } },
          disallow: [{ to: { element: { type: ["app", "features"] } } }],
          message: "Shared modules cannot import app or feature modules.",
        },
        {
          from: { element: { type: "features" } },
          disallow: [{ to: { element: { type: "app" } } }],
          message: "Feature modules cannot import app modules.",
        },
        {
          to: { element: { type: "features" } },
          disallow: [{ to: { element: { fileInternalPath: "!@(index|*.page).@(ts|tsx)" } } }],
          message: "Import features through index.ts(x) or a *.page.ts(x) entry point.",
        },
      ],
    }],
  },
};
