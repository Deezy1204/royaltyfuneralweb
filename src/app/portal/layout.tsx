import Link from "next/link";
import { User, FileText, CreditCard, LogOut } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pt-[80px]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 h-auto md:h-[calc(100vh-80px)] md:sticky md:top-[80px]">
        <div className="p-6">
          <h2 className="font-serif text-xl text-primary-dark mb-1">Client Portal</h2>
          <p className="text-sm text-text-muted mb-8">Welcome back, John</p>
          
          <nav className="space-y-2">
            <Link href="/portal" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors">
              <User size={18} />
              My Account
            </Link>
            <Link href="/portal/management" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
              <FileText size={18} />
              Policy Management
            </Link>
            <Link href="/portal/payment" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
              <CreditCard size={18} />
              Make a Payment
            </Link>
          </nav>
        </div>
        
        <div className="p-6 border-t border-gray-100 mt-auto md:absolute bottom-0 w-full">
          <button className="flex items-center gap-3 text-red-500 hover:text-red-700 transition-colors font-medium px-4 py-2 w-full text-left">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
