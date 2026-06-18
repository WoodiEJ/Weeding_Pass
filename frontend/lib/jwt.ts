import { JwtPaylaod } from "@/types";

export function parseJwtPayload(token: string): JwtPaylaod | null {
    try {
        const [, payload] = token.split(".")
        return JSON.parse(Buffer.from(payload, "base64url").toString())
    } catch {
        return null
    }
}