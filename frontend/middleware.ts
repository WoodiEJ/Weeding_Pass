import { NextRequest, NextResponse } from "next/server";
import { parseJwtPayload } from "./lib/jwt";

const ADMIN_PATH = ["/admin"]
const RECEP_PATH = ["/recep"]

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const isAdminPath = ADMIN_PATH.some((p) => pathname.startsWith(p))
    const isRecepPath = RECEP_PATH.some((p) => pathname.startsWith(p))
    const token = req.cookies.get("token")?.value

    if (pathname === '/') {
        if (!token) return NextResponse.next()
        const payload = parseJwtPayload(token)
        if (!payload) return NextResponse.next()
        if (payload.role === 'RECEP') {
            return NextResponse.redirect(new URL("/recep/dashboard", req.url))
        }
        if (payload.role === 'ADMIN') {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    const payload = parseJwtPayload(token)
    
    if (!payload) {
        const response = NextResponse.redirect(new URL("/", req.url))
        response.cookies.delete("token")
        response.cookies.delete("id")
        response.cookies.delete("role")
        return response
    }

    if (pathname.startsWith("/admin") && payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    if (pathname.startsWith("/recep") && payload.role !== 'ADMIN' && payload.role !== 'RECEP') {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/", "/admin/:path*", '/recep/:path*'
    ]
}