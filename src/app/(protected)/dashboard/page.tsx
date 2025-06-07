"use client";
import { CardProfessor, CardStudent, Post } from "@/lib/interfaces";
import { makePostCard } from "@/components/postcard";

import { getPngUrl, getPosts, getUsers } from "@/lib/requisition";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [profCards, setProfCards] = useState<CardProfessor[]>([]);
  const [studentCards, setStudentCards] = useState<CardStudent[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    setProfCards([]);

    setStudentCards([]);

    const response = Promise.all([getPosts(), getUsers()]);
    setLoading(true);

    response.then((data) => {
      setPosts(data[0]);
      setProfCards(
        data[1].filter((professor) => professor.job === "professor"),
      );
      setStudentCards(data[1].filter((student) => student.job === "student"));
      setLoading(false);
    });

    response.catch((error: AxiosError) => {
      if (error instanceof AxiosError) {
        router.push("/login");
        localStorage.removeItem("token");
        return;
      }
    });
  }, [setProfCards, setStudentCards, setPosts, router, setLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-14">
      {/* seção de professores */}
      <h2 className="p-3 text-3xl font-bold">Professores</h2>
      <div className="p-3 grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 gap-3 mb-8">
        {profCards.map((prof) => (
          <Link
            key={prof.id}
            href={`/profile/${encodeURIComponent(prof.id)}`}
            className="bg-white rounded-lg shadow-md p-4 border flex flex-col gap-3"
          >
            <h3 className="text-lg font-bold">{prof.name}</h3>
            <div className="flex justify-center">
              <Image
                src={getPngUrl(prof.id, "user")}
                alt="professor image"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* seção de alunos */}
      <h2 className="p-3 text-3xl font-bold">Alunos</h2>
      <div className="p-3 grid grid-cols-5 gap-3 mb-8 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3">
        {studentCards.map((prof) => (
          <Link
            key={prof.id}
            href={`/profile/${encodeURIComponent(prof.id)}`}
            className="bg-white rounded-lg shadow-md p-4 border flex flex-col gap-3"
          >
            <h3 className="text-lg font-bold">{prof.name}</h3>
            <div className="w-full flex justify-center">
              <Image
                src={getPngUrl(prof.id, "user")}
                alt="professor image"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* postagens recentes */}
      <h2 className="p-5 text-2xl font-bold mb-8">Últimas postagens</h2>
      <div className="flex gap-3 flex-wrap ">{posts.map(makePostCard)}</div>
    </div>
  );
}
