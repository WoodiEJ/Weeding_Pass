"use client"

import { logout } from "@/actions/login"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { toast } from "sonner"

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={async () => {
          const toastId = toast.loading("Deslogando...")
          toast.success("Deslogado com sucesso.", { id: toastId })
          await logout()
        }}>
          <LogOutIcon /> Deslogar
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
