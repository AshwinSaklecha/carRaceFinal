import React from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>3D Vehicle Game</title>
        <meta name="description" content="A 3D vehicle game built with Next.js and React Three Fiber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen">{children}</main>
    </>
  );
}