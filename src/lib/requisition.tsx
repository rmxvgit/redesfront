"use client";
const backendUrl = "https://backredes-production.up.railway.app";
import axios from "axios";
import { CardPdfPost, CardPngPost, CardTxtPost, Post } from "./interfaces";
import { UserProfileData } from "@/lib/interfaces";

export async function login(values: { name: string; password: string }) {
  const response = await axios.post(`${backendUrl}/auth/login`, values);
  return response;
}

export async function register(
  values: {
    name: string;
    password: string;
    bio: string;
    job: string;
  },
  file: File | null,
) {
  const form_data = new FormData();
  if (file) {
    form_data.append("image", file);
  }
  form_data.append("name", values.name);
  form_data.append("password", values.password);
  form_data.append("bio", values.bio);
  form_data.append("job", values.job);

  const response = await axios.post(`${backendUrl}/user`, form_data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
}

export async function editProfileRequisition(
  data: {
    name: string | undefined;
    password: string | undefined;
    bio: string | undefined;
    job: string | undefined;
  },
  file: File | null,
) {
  const token = localStorage.getItem("token");

  const fields_edition = await axios.patch(`${backendUrl}/user`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (file) {
    const form_data = new FormData();
    form_data.append("image", file);

    const image_edition = await axios.patch(
      `${backendUrl}/user/image`,
      form_data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return { fields_edition, image_edition };
  }

  return { fields_edition };
}

export async function getPosts() {
  const token = localStorage.getItem("token");

  const result = await Promise.all([
    axios.get(`${backendUrl}/post/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get(`${backendUrl}/pdf/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get(`${backendUrl}/png/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  const [txt_result, pdf_result, png_result] = result.values();

  if (
    txt_result.status === 200 &&
    pdf_result.status === 200 &&
    png_result.status === 200
  ) {
    const txts: ServerTxtPost[] = txt_result.data;
    const pdfs: ServerPdfPost[] = pdf_result.data;
    const pngs: ServerPngPost[] = png_result.data;

    const posts: Post[] = [
      ...txts.map(servToCardTxtPost),
      ...pdfs.map(servToCardPdfPost),
      ...pngs.map(servToCardPngPost),
    ];

    return posts;
  }

  throw new Error("Failed to fetch posts");
}

export async function getUsers() {
  const token = localStorage.getItem("token");

  const result = await axios.get(`${backendUrl}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.status === 200) {
    const user: ServerUser[] = result.data;

    return user;
  }

  throw new Error("Failed to fetch user");
}

export async function getUserProfile(user_id: string) {
  const token = localStorage.getItem("token");

  const result = await axios.get(`${backendUrl}/user/profile${user_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.status === 200) {
    const user: ServerUserProfile = result.data;

    const client_data: UserProfileData = {
      id: user.id,
      owner: user.owner,
      name: user.name,
      bio: user.bio,
      image: user.image,
      job: user.job,
      posts: [
        ...user.posts.map(servToCardTxtPost),
        ...user.pdfs.map(servToCardPdfPost),
        ...user.pngs.map(servToCardPngPost),
      ],
    };

    return client_data;
  }

  throw new Error("Failed to fetch user");
}

export async function makeFilePost(
  file: File,
  title: string,
  type: "pdf" | "png",
) {
  if (file.name.split(".").at(-1) != type) {
    throw new Error("formato de arquivo inválido");
  }

  const token = localStorage.getItem("token");
  const form_data = new FormData();
  form_data.append("title", title);
  form_data.append("image", file);

  const response = await axios.post(`${backendUrl}/${type}`, form_data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export function getPngUrl(entity_id: number, entity_type: "user" | "post") {
  const path = `${backendUrl}/png/see${entity_type[0]}${entity_id}.png`;
  console.log(path);
  return path;
}

export function getPdfUrl(entity_id: number) {
  const path = `${backendUrl}/pdf/seep${entity_id}.pdf`;
  console.log(path);
  return path;
}

interface ServerUserProfile {
  id: number;
  owner: boolean;
  name: string;
  image: string;
  bio: string;
  job: string;
  pngs: ServerPngPost[];
  pdfs: ServerPdfPost[];
  posts: ServerTxtPost[];
}

interface ServerUser {
  id: number;
  name: string;
  image: string;
  job: string;
}

interface ServerTxtPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

interface ServerPdfPost {
  id: number;
  title: string;
  file_name: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

interface ServerPngPost {
  id: number;
  title: string;
  file_name: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

function servToCardTxtPost(post: ServerTxtPost): CardTxtPost {
  return {
    txt: undefined,
    id: post.id,
    title: post.title,
    body: post.body,
    author_id: post.user.id,
    author_name: post.user.name,
  };
}

function servToCardPdfPost(post: ServerPdfPost): CardPdfPost {
  return {
    pdf: undefined,
    id: post.id,
    title: post.title,
    file_name: post.file_name,
    author_id: post.user.id,
    author_name: post.user.name,
  };
}

function servToCardPngPost(post: ServerPngPost): CardPngPost {
  return {
    png: undefined,
    id: post.id,
    title: post.title,
    file_name: post.file_name,
    author_id: post.user.id,
    author_name: post.user.name,
  };
}
