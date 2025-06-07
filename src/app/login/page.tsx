"use client";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { login } from "@/lib/requisition";

interface FormValues {
  name: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  async function loginFormSubmit(values: FormValues) {
    const response = await login(values);

    if (response.status !== 201) {
      console.log(response);
      return;
    }

    const token = response.data;

    if (!token || typeof token !== "string") {
      console.error("Token is missing or it is not a string");
      return;
    }

    localStorage.setItem("token", token);
    router.push("/dashboard");
  }

  function validate(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Formik
        onSubmit={loginFormSubmit}
        validate={validate}
        initialValues={{ name: "", password: "" }}
      >
        <Form className="bg-blue-300 p-8 rounded shadow-lg flex flex-col gap gap-5">
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="name" className="text-sm">
              nome:
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Digite seu nome"
              className="bg-white border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="password" className="text-sm">
              senha:
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="bg-white border rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            cadastre-se
          </button>
        </Form>
      </Formik>
    </div>
  );
}
