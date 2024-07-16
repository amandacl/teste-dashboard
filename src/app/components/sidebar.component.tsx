import { AlignJustify } from "lucide-react";
import { ShoppingBag, Truck, Wrench, Hammer } from "lucide-react";
interface SidebarModalProps {
  handleSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Sidebar({
  isSidebarOpen,
  handleSidebarToggle,
}: SidebarModalProps) {
  return (
    <div className="bg-blue-800 flex flex-col h-screen p-4 w-full items-center">
      <button
        className="bg-white py-2 px-4 text-black rounded-md"
        onClick={() => handleSidebarToggle()}
      >
        {<AlignJustify />}
      </button>

      <nav className="mt-4 gap-4 self-auto">
      <a href="/dashboard/compras" className="inline-block py-4 px-4">
      <button className={`border border-gray-300 bg-white ${isSidebarOpen? 'w-56':'w-14'} rounded-md p-4 text-black `}>
            <ShoppingBag className="inline"/> {isSidebarOpen ? "Compras" : ""}
          </button>
        </a>
        <a href="#" className="block py-2 px-4 w-full">
          <button className={ `border border-gray-300 bg-white rounded-md p-4 text-black ${isSidebarOpen? 'w-56':'w-14'}`}>        
            <Wrench className="inline" /> {isSidebarOpen ? "Serviços" : ""}
          </button>
        </a>
        <a href="#" className="block py-2 px-4 flex-1">
        <button className={`border border-gray-300 bg-white rounded-md p-4 text-black ${isSidebarOpen? 'w-56':'w-14'}`}>
            <Truck className="inline"/> {isSidebarOpen ? "Fretes" : ""}
          </button>
        </a>
        <a href="#" className="block py-2 px-4 ">
        <button className={`border border-gray-300 bg-white rounded-md p-4 text-black ${isSidebarOpen? 'w-56':'w-14'}`}>          
            <Hammer className="inline"/> {isSidebarOpen ? "Manutenção interna" : ""}
          </button>
        </a>
      </nav>
    </div>
  );
}
