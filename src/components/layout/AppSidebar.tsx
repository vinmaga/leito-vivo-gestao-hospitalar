
import { Bed, Calendar, Check, Clock, FileText, Hospital, Search, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

const navItems = [
  {
    title: "Dashboard",
    icon: Hospital,
    url: "/",
  },
  {
    title: "Bed Map",
    icon: Bed,
    url: "/beds",
  },
  {
    title: "Admissions",
    icon: User,
    url: "/admissions",
  },
  {
    title: "Waiting List",
    icon: Clock,
    url: "/waiting",
  },
  {
    title: "Maintenance",
    icon: Check,
    url: "/maintenance",
  },
  {
    title: "Patients",
    icon: Users,
    url: "/patients",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "/reports",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Search",
    icon: Search,
    url: "/search",
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center justify-center py-4">
          <Hospital className="h-8 w-8 text-primary" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`flex items-center ${location.pathname === item.url ? 'font-semibold text-primary' : ''}`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
