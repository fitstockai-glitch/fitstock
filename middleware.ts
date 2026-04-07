/**
 * Vercel Edge Middleware (project root)
 * 全ページを Basic 認証で保護し、localhost はスキップする
 * x-vercel-ip-country を Cookie に載せ、クライアントの i18n 初期化で参照する
 */
import { COUNTRY_HEADER_NAME, next } from "@vercel/edge";

function passthroughWithCountryCookie(request: Request): Response {
  const country = request.headers.get(COUNTRY_HEADER_NAME) ?? "";
  if (!country) {
    return next();
  }
  const url = new URL(request.url);
  const secure = url.protocol === "https:" ? "; Secure" : "";
  return next({
    headers: {
      "Set-Cookie": `fitstock-vercel-country=${encodeURIComponent(country)}; Path=/; Max-Age=2592000; SameSite=Lax${secure}`,
    },
  });
}

export default function middleware(request: Request): Response {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? url.hostname;
  const hostname = host.split(":")[0].toLowerCase();

  // ローカル環境は認証をスキップ
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return passthroughWithCountryCookie(request);
  }

  const expectedUser = process.env.BASIC_AUTH_USER ?? "";
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD ?? "";

  // 本番で未設定の場合は誤ロックを避けるためスキップ
  if (!expectedUser || !expectedPassword) {
    return passthroughWithCountryCookie(request);
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

  return passthroughWithCountryCookie(request);
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
