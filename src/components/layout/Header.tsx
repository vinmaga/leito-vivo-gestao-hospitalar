
import { Bell, Calendar, Search, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-primary">Hospital Bed Management</h1>
      </div>
      
      <div className="flex-1 px-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients, beds, or rooms..."
            className="pl-8 bg-muted/30"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Calendar className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-warning rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="outline" className="ml-2">Dr. Santos</Button>
      </div>
    </header>
  );
};

export default Header;
