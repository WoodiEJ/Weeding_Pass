import { JwtPaylaod } from "@/types";

export function parseJwtPayload(token: string): JwtPaylaod | null {
    try {
        const [, payload] = token.split(".")
        const decoded = JSON.parse(Buffer.from(payload, "base64url").toString())

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return null
        }        

        return decoded
    } catch {
        return null
    }
}