export interface Employee {
  name: string;
  position: string;
  phone: string;
  fixedPhone: string;  // Nuevo campo
  email: string;
}


export interface SignatureTemplateProps {
  employee: Employee;
}