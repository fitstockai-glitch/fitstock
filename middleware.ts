/**
 * Vercel Edge Middleware (project root)
 * 全ページを Basic 認証で保護し、localhost はスキップする
 */
export default function middleware(request: Request): Response | void {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? url.hostname;
  const hostname = host.split(":")[0].toLowerCase();

  // ローカル環境は認証をスキップ
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return;
  }

  const expectedUser = process.env.BASIC_AUTH_USER ?? "";
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD ?? "";

  // 本番で未設定の場合は誤ロックを避けるためスキップ
  if (!expectedUser || !expectedPassword) {
    return;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const encoded = authHeader.slice("Basic ".length).trim();

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(":");
  if (separator < 0) {
    return unauthorized();
  }

  const user = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);

  if (user !== expectedUser || password !== expectedPassword) {
    return unauthorized();
  }
}

function unauthorized(): Response {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Restricted Area"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: "/(.*)",
};

