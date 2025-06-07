"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  return (
    <header>
      <div className="bg-blue-400 flex justify-end p-4 gap-10">
        <h1 className="text-2xl self-center text-white">NOME DO SITE</h1>
        <button onClick={() => router.push("/profile/me")}>
          <Image
            src="/profile.svg"
            alt="Logo"
            width={45}
            height={45}
            className="hover:border"
          />
        </button>
        <button onClick={() => router.push("/dashboard")}>
          <Image
            src="/home_icon.svg"
            alt="home icon"
            width={42}
            height={42}
            className="hover:border"
          />
        </button>
      </div>
    </header>
  );
}
