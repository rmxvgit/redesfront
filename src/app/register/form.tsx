"use client";

import { register } from "@/lib/requisition";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";

export default function RegisterForm() {
  const [file, setFile] = useState<File | null>(null);

  function formSubmit(data: {
    name: string;
    password: string;
    bio: string;
    job: string;
  }) {
    const result = register(data, file);

    result.then((data) => console.log(data));
    result.catch((err) => console.log(err));
  }

  return (
    <div className="flex min-h-screen justify-center content-center">
      <Formik
        initialValues={{ name: "", password: "", bio: "", job: "student" }}
        onSubmit={formSubmit}
      >
        <Form className="bg-blue-300 p-8 rounded shadow-lg flex flex-col gap gap-5 h-fit">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">
              nome:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="bg-white border rounded px-2 py-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">
              senha:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="bg-white border rounded px-2 py-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bio" className="text-sm">
              bio:
            </label>
            <Field
              type="text"
              id="bio"
              name="bio"
              className="bg-white border rounded px-2 py-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="job" className="text-sm">
              cargo:
            </label>
            <Field
              as="select"
              name="job"
              id="job"
              className="bg-white border rounded px-2 py-1"
              required
            >
              <option value="student">Estudante</option>
              <option value="professor">Professor</option>
            </Field>
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm">
              image:
            </label>
            <input
              type="file"
              className="bg-white border rounded px-2 py-1"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFile(
                  event.currentTarget.files
                    ? event.currentTarget.files[0]
                    : null,
                );
              }}
            ></input>
          </div>
          <button type="submit" className="bg-white border rounded px-2 py-1">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
