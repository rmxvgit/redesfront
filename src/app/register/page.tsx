import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6"></h1>
      <RegisterForm />
    </div>
  );
}
