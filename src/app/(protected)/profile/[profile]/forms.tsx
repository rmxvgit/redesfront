import { makeFilePost } from "@/lib/requisition";
import { Formik, Form, Field } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function NewPostForm(
  post_type: "png" | "pdf" | "txt" | "none",
  errorMsg: string,
  setErrMsg: Dispatch<SetStateAction<string>>,
  file: File | null,
  setFile: Dispatch<SetStateAction<File | null>>,
  router: AppRouterInstance,
) {
  if (post_type == "txt") {
    return NewTxtForm();
  }

  if (post_type == "png") {
    return NewPngForm(errorMsg, setErrMsg, file, setFile, router);
  }

  return NewPdfForm(errorMsg, setErrMsg, file, setFile, router);
}

export function NewPngForm(
  errorMsg: string,
  setErrMsg: Dispatch<SetStateAction<string>>,
  file: File | null,
  setFile: Dispatch<SetStateAction<File | null>>,
  router: AppRouterInstance,
) {
  function postFormSubmit(values: { title: string }) {
    console.log("submit button pressed");
    console.log(values);
    if (file == null) {
      setErrMsg("arquivo não foi selecionado");
      return;
    }

    const promise = makeFilePost(file, values.title, "png");

    promise.then((result) => {
      if (result.status === 201) {
        setErrMsg("");
        console.log("sucesso png");
        return;
      }
      console.log(result);
    });

    promise.catch((err) => {
      if (err.status === 403) {
        console.log(err);
        router.push("/login");
      }
    });
  }

  return (
    <Formik initialValues={{ title: "" }} onSubmit={postFormSubmit}>
      <Form className="flex flex-col gap-3">
        <p>{errorMsg}</p>
        <Field
          name="title"
          placeholder="Título do png"
          className="border p-2 rounded"
        ></Field>

        <div className="flex justify-start gap-3">
          <div className="flex gap-3 border rounded-lg p-2 ">
            <Image src="/file.svg" alt="file icon" height={20} width={20} />
            <input
              type="file"
              onChange={(e) => {
                setFile(
                  e.currentTarget.files ? e.currentTarget.files[0] : null,
                );
              }}
              placeholder="batata"
              className="text-lg"
            />
          </div>
          <button type="submit" className="border rounded-lg p-2">
            Enviar
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export function NewPdfForm(
  errorMsg: string,
  setErrMsg: Dispatch<SetStateAction<string>>,
  file: File | null,
  setFile: Dispatch<SetStateAction<File | null>>,
  router: AppRouterInstance,
) {
  function postFormSubmit(values: { title: string }) {
    console.log("submit button pressed");
    console.log(values);
    if (file == null) {
      setErrMsg("arquivo não foi selecionado");
      return;
    }

    const promise = makeFilePost(file, values.title, "pdf");

    promise.then((result) => {
      if (result.status === 201) {
        setErrMsg("");
        console.log("sucesso png");
        return;
      }
      console.log(result);
    });

    promise.catch((err) => {
      if (err.status === 403) {
        console.log(err);
        router.push("/login");
      }
    });
  }

  return (
    <Formik initialValues={{ title: "" }} onSubmit={postFormSubmit}>
      <Form className="flex flex-col gap-3">
        <p>{errorMsg}</p>
        <Field
          name="title"
          placeholder="Título do png"
          className="border p-2 rounded"
        ></Field>

        <div className="flex justify-start gap-3">
          <div className="flex gap-3 border rounded-lg p-2 ">
            <Image src="/file.svg" alt="file icon" height={20} width={20} />
            <input
              type="file"
              onChange={(e) => {
                setFile(
                  e.currentTarget.files ? e.currentTarget.files[0] : null,
                );
              }}
              placeholder="batata"
              className="text-lg"
            />
          </div>
          <button type="submit" className="border rounded-lg p-2">
            Enviar
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export function NewTxtForm() {
  function postFormSubmit(values: { title: string; body: string }) {
    console.log("submit button pressed");
    console.log(values);
  }

  return (
    <Formik initialValues={{ title: "", body: "" }} onSubmit={postFormSubmit}>
      <Form className="flex flex-col gap-3">
        <Field
          name="title"
          placeholder="Título"
          className="border p-2 rounded"
        />
        <Field
          name="body"
          placeholder="Conteúdo"
          className="border p-2 rounded"
        />
      </Form>
    </Formik>
  );
}
