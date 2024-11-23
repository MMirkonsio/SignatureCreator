import { FileUpload } from './components/FileUpload';
import { SignatureList } from './components/SignatureList';
import { FileText, Mail } from 'lucide-react';
import type { Employee } from './types';
import { useState } from 'react';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center space-x-3">
          <Mail className="w-8 h-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">Generador de Firmas de Email</h1>
        </div>
      </header>

      <main className="max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
        {employees.length === 0 ? (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Subir Datos de Empleados</h2>
              <p className="text-gray-600">
                Sube un archivo de Excel con la información de los empleados para generar las firmas de correo electrónico
              </p>
            </div>
            <FileUpload onEmployeesLoad={setEmployees} />
          </div>
        ) : (
          <SignatureList employees={employees} onReset={() => setEmployees([])} />
        )}
      </main>
    </div>
  );
}

export default App;
