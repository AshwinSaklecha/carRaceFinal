import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Dynamically import the Game component with SSR disabled
const Game = dynamic(() => import('../components/Game'), { ssr: false });

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Head>
        <title>3D Vehicle Game</title>
        <meta name="description" content="A 3D vehicle game built with Next.js and React Three Fiber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full">
        <Game />
      </main>
    </div>
  );
}