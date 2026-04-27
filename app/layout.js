import "./globals.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const pagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}` : "";

export const metadata = {
  title: "Formula 0 | Premium Racing League",
  description:
    "Formula 0 is an extreme wheelchair racing league built around Michelin tires, carbon engineering, and pure manual control.",
  icons: {
    icon: `${pagesBasePath}/media/formula-zero-michelin-smoke.png`
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-zinc-950 font-body text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
