import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, Users, File } from "lucide-react"
import { dadoUsuario } from "@/actions/usuarios"
import { MdEmail } from "react-icons/md"
import { GiRingBox } from "react-icons/gi"
import { FieldSeparator } from "./ui/field"
import { BotaoGerarRelatorio } from "./pdfBtn"
import { listarConvidados } from "@/actions/convidados"

const navAdmin = [
  { title: "Dashboard", url: "/admin/dashboard", icon: <LayoutDashboardIcon /> },
  { title: "Usuários", url: "/admin/usuarios", icon: <Users /> },
  { title: "Convidados", url: "/admin/convidados", icon: <MdEmail /> }
]

const navRecep = [
  { title: "Dashboard", url: "/recep/dashboard", icon: <LayoutDashboardIcon /> },
  { title: "Convidados", url: "/recep/convidados", icon: <MdEmail /> },
]

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const usuario = await dadoUsuario()
  const navMain = usuario.role === "ADMIN" ? navAdmin : navRecep
  const convidados = await listarConvidados()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <p>
                <GiRingBox className="size-5!" />
                <span className="text-base font-semibold">Weeding Pass</span>
              </p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {usuario.role === "ADMIN" ? (
          <SidebarGroup>
            <h1>Documentos</h1>
            <SidebarMenuButton className="m-2">
              <BotaoGerarRelatorio convidados={convidados} />
            </SidebarMenuButton>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
