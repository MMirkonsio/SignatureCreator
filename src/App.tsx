import { FileUpload } from "./components/FileUpload";
import { SignatureList } from "./components/SignatureList";
import { FileText } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Employee } from "./types";

function App() {
  // Roles preseleccionados
  const preselectedRoles = [
    "AUXILIAR DE ASEO",
    "AYUDANTE",
    "AYUDANTE ELECTROMECANICO",
    "AYUDANTE MECÁNICO",
    "CONDUCTOR DE SERVICIOS",
    "CONDUCTORA DE SERVICIOS",
    "CONDUCTORA OP DE CAMION PLUMA",
    "CONDUCTOR OP EQUIPO PESADO",
    "CONDUCTOR OP MAQUINARIA PESADA",
    "ELECTRICA",
    "ELECTRICO/AYUDANTE",
    "JARDINERO",
    "MECANICO TORNERO",
    "OPERADOR BOMBEO",
    "OPERADOR EN ENTRENAMIENTO",
    "OPERADOR MAQUINARIA PESADA",
    "OPERADOR/PERFORISTA",
    "SOLDADOR",
    "SOLDADOR/AYUDANTE",
    "CHOFER OPERADOR",
  ];

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedRoles, setSelectedRoles] =
    useState<string[]>(preselectedRoles); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const roles = useMemo(() => {
    return Array.from(
      new Set(employees.map((employee) => employee.position))
    ).sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (selectedRoles.length === 0) return employees;
    return employees.filter(
      (employee) => !selectedRoles.includes(employee.position)
    );
  }, [employees, selectedRoles]);

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) => role && role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
        {employees.length === 0 ? (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Subir Datos de Empleados
              </h2>
              <p className="text-gray-600">
                Sube un archivo de Excel con la información de los empleados
                para generar las firmas de correo electrónico
              </p>
            </div>
            <FileUpload onEmployeesLoad={setEmployees} />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Filtrar por Cargos
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onClick={() => setIsDropdownOpen(true)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar cargo..."
                  className="block w-full p-2 border rounded-lg bg-white"
                />

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    {filteredRoles.length === 0 ? (
                      <p className="px-4 py-2 text-gray-500">
                        No se encontraron cargos.
                      </p>
                    ) : (
                      filteredRoles.map((role) => (
                        <label
                          key={role}
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRoles.includes(role)}
                            onChange={() => toggleRole(role)}
                            className="mr-2"
                          />
                          {role}
                        </label>
                      ))
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Selecciona uno o más cargos para filtrar la lista.
              </p>
            </div>

            <SignatureList
              employees={filteredEmployees}
              onReset={() => setEmployees([])}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
