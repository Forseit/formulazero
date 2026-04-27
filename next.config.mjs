const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const pagesBasePath = isGitHubActions && repositoryName ? `/${repositoryName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
