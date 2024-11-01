"use client";
import Head from "next/head";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Questionnaire</title>
        <meta name="description" content="A simple questionnaire form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainContent />
      </main>
    </div>
  );
}
