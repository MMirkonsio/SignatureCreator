import { toPng } from "html-to-image";
import { SignatureTemplate } from "./SignatureTemplate";
import { Download, RefreshCw } from "lucide-react";
import JSZip from "jszip"; // Importar JSZip
import { saveAs } from "file-saver"; // Importar file-saver
import type { Employee } from "../types";

interface SignatureListProps {
  employees: Employee[];
  onReset: () => void;
}

export function SignatureList({ employees, onReset }: SignatureListProps) {
  const generateSignature = async (employee: Employee) => {
    const element = document.getElementById(`signature-${employee.name}`);
    if (!element) {
      console.error(`Element not found for employee: ${employee.name}`);
      return;
    }

    try {
      const dataUrl = await toPng(element, { quality: 1.0 });

      const link = document.createElement("a");
      link.download = `${employee.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-firma.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating signature image:", error);
    }
  };

  // Función para descargar todas las firmas como un archivo ZIP
  const generateAllSignatures = async () => {
    const zip = new JSZip(); 
    const folder = zip.folder("signatures"); 

    for (const employee of employees) {
      const element = document.getElementById(`signature-${employee.name}`);
      if (element) {
        try {
          const dataUrl = await toPng(element, { quality: 1.0 });
          const fileName = `${employee.name
            .toLowerCase()
            .replace(/\s+/g, "-")}-firma.png`;
          folder?.file(fileName, dataUrl.split(",")[1], { base64: true });
        } catch (error) {
          console.error(
            `Error generating signature for ${employee.name}:`,
            error
          );
        }
      }
    }

    // Generar el archivo ZIP y descargarlo
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Firmas.zip");
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Firmas generadas ({employees.length})
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={generateAllSignatures} // Llamar a la función de descarga en formato ZIP
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar todas
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Subir nuevo archivo
          </button>
        </div>
      </div>

      {/* Grid para mostrar las firmas en 2 columnas */}
      <div className="grid grid-cols-2 gap-3"> {/* Cambié min-w-[100vw] por gap-8 */}
        {employees.map((employee, index) => (
          <div
            key={`${employee.email}-${index}`}
            className="relative bg-gray-50 rounded-lg w-full"
          >
            <div className="relative h-full">
              <button
                onClick={() => generateSignature(employee)}
                className="absolute top-0 w-12 inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Download className="w-6 h-6 mr-1" />
              </button>

              <div id={`signature-${employee.name}`}>
                <SignatureTemplate employee={employee} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
