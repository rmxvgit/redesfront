"use client";
import { editProfileRequisition } from "@/lib/requisition";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

export default function EditProfileForm() {
  const [file, setFile] = useState<File | null>(null);

  async function formSubmit(data: {
    name: string | undefined;
    password: string | undefined;
    bio: string | undefined;
    job: string | undefined;
  }) {
    const result = await editProfileRequisition(data, file);
    console.log(result);
  }
  return (
    <Formik
      initialValues={{
        name: undefined,
        password: undefined,
        bio: undefined,
        job: undefined,
      }}
      onSubmit={formSubmit}
    >
      <Form>
        <label htmlFor="name">nome:</label>
        <Field type="text" id="name" name="name" />

        <label htmlFor="password">senha:</label>
        <Field type="password" id="password" name="password" />

        <label htmlFor="bio">bio:</label>
        <Field type="text" id="bio" name="bio" />

        <label htmlFor="job">cargo:</label>
        <Field as="select" name="job" id="job">
          <option value={undefined}>Escolher</option>
          <option value="student">Estudante</option>
          <option value="professor">Professor</option>
        </Field>

        <label htmlFor="image">image:</label>
        <input
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFile(
              event.currentTarget.files ? event.currentTarget.files[0] : null,
            );
          }}
        ></input>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
