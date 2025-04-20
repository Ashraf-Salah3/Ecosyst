"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
      <h2 className="text-2xl font-bold"> Somting Wrong</h2>
   
    <button onClick={reset} className="!mt-4 !px-4 !py-2 !bg-red-500 !text-white !rounded">
      Try Again
      </button>
    </div>
  );
}