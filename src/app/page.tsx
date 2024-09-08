import React from 'react';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold m-8">Country Dashboard</h1>
          <Link className="btn btn-primary" href='/countries'>Countries Page</Link>
        </div>
      </div>
    </div>
  );
}
