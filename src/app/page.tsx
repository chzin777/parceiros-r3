// HOME PAGE CENTRALIZADA
'use client';
import Link from 'next/link';
import Image from 'next/image';
import Form from '../components/Form';

export default function Home() {
  return (
    <>
      {/* MAIN */}
      <main className="relative flex items-center justify-center min-h-screen">
        {/* Fundo borrado */}
        <div
          className="
            fixed inset-0 
            bg-[url('/images/bg1.png')] bg-cover bg-center 
            filter blur-xs scale-105
            -z-10
          "
        />
        {/* Conteúdo centralizado */}
        <div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 pb-10">
          {/* FORMULÁRIO */}
          <div className="w-full max-w-xl flex justify-center">
            <Form />
          </div>
        </div>
      </main>
    </>
  );
}
