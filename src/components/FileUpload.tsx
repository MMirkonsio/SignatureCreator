import React from "react";
import { Upload } from "lucide-react";
import { read, utils } from "xlsx";
import type { Employee } from "../types";

interface FileUploadProps {
  onEmployeesLoad: (employees: Employee[]) => void;
}

export function FileUpload({ onEmployeesLoad }: FileUploadProps) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    const formatPhone = (phone: any, altPhone: any) => {
      const phoneString = phone ? String(phone).trim() : ""; 
      const altPhoneString = altPhone ? String(altPhone).trim() : "";

      // Verifica si el teléfono principal es inválido y usa el alternativo
      if (
        !phoneString ||
        phoneString.toLowerCase() === "sin número" ||
        phoneString.toLowerCase() === "sin teléfono móvil"
      ) {
        return altPhoneString
          ? altPhoneString.startsWith("+")
            ? altPhoneString
            : `+${altPhoneString}`
          : "Sin Teléfono Móvil";
      }

      return phoneString.startsWith("+") ? phoneString : `+${phoneString}`;
    };

    const formatPhonePersonal = (phone: string | undefined) => {
      const phoneString = phone ? String(phone).trim() : ""; 
      return phoneString.startsWith("+") ? phoneString : `+${phoneString}`;
    };
    

    const employees = jsonData.map((employee: any) => {
      const formattedName = employee["Nombre"]
        ? employee["Nombre"]
            .split(" ")
            .filter((_: any, index: any) => index !== 1)
            .join(" ")
            .toUpperCase()
        : "NOMBRE INVÁLIDO";

      console.log(formattedName);

      const formattedPhone = formatPhone(
        employee["Teléfono"],
        employee["Teléfono Personal"]
      );

      const formattedPhonePersonal = formatPhonePersonal(
        employee["Teléfono Personal 2"]
      );
      

      return {
        name: formattedName,
        position: employee["Cargo"],
        phone: formattedPhone,
        phonePersonal: formattedPhonePersonal,
        fixedPhone: employee["Telefono Fijo"],
        email: employee["Email"],
      };
    });

    onEmployeesLoad(employees);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-12 h-12 mb-4 text-gray-400" />
          <p className="mb-2 text-sm text-gray-600">
            <span className="font-semibold">Haz clic para subir</span> o
            arrastra y suelta
          </p>
          <p className="text-xs text-gray-500">
            Archivo de Excel (.xlsx, .xls)
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}
