import { Employee } from "../types";
import { Smartphone, PhoneCall, MapPin, Globe } from "lucide-react";

interface SignatureTemplateProps {
  employee: Employee;
}

export function SignatureTemplate({ employee }: SignatureTemplateProps) {
  return (
    <div className="flex items-center max-h-65 p-4 rounded-lg bg-white">
      <div className="relative top-8">
        <div className="flex-shrink-0">
          <img src="./img/HH_negro.png" alt="Logo" className="logo-size" />
        </div>
        <div className="flex-shrink-0">
          <img
            src="./img/Bareau Veritas.png"
            alt="Logo"
            className="logo-size-2"
          />
        </div>
      </div>
      <hr className="w-[2px] h-48 ml-4 bg-gray-600" />
      <div className="ml-4 flex-grow min-w-[500PX]">
        <div className="text-sm text-gray-600">
          <p className="font-bold text-2xl text-red-700">{employee.name}</p>
          <p className="flex items-center font-bold text-lg text-gray-700">
            {employee.position}
          </p>
          <div className="flex items-center space-x-2 mb-1">
            <Globe className="w-4 h-4 text-black stroke-2 opacity-70" />
            <a
              href="http://www.hhechile.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-semibold hover:text-red-800"
            >
              www.hhechile.com
            </a>

        
          </div>
          <p className="flex items-center mb-1">
            <Smartphone className="w-4 h-4 text-black stroke-2 opacity-70" />
            <span className="font-semibold ml-2">Móvil:</span>
            <span className="ml-1">{employee.phone}</span>{" "}
          </p>

          <p className="flex items-center mb-1">
            <PhoneCall className="w-4 h-4 text-black stroke-2 opacity-70" />
            <span className="font-semibold ml-2">Fijo:</span>
            <span className="ml-1">+{employee.fixedPhone}</span>{" "}
          </p>
         
          <p className="flex items-center mb-1">
            <MapPin className="w-4 h-4 text-black stroke-2 opacity-70" />
            <span className="font-semibold ml-2">Dirección:</span>
            <span className="ml-1">
              La Fragua N° 1330, Coquimbo - CHILE
            </span>{" "}
          </p>
         
          <p className="flex items-center ml-6 mb-1">
            <span className="font-semibold">Código Postal:</span>
            <span className="ml-1">1801869</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
