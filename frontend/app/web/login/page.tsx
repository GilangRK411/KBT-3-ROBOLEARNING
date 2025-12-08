import Link from "next/link";

import LoginForm from "@/components/login-form";
import { WEB_ROUTES } from "@/config/page-endpoint-config";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] text-[#3E3636]">
      <div className="relative mx-auto flex min-h-screen max-w-screen-lg items-center justify-center px-4 py-10">
        <div className="absolute left-6 top-10 h-32 w-32 rounded-full bg-[#D72323]/10 blur-3xl" />
        <div className="absolute right-8 bottom-8 h-36 w-36 rounded-full bg-[#3E3636]/10 blur-3xl" />

        <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-[#F5EDED] bg-white shadow-sm">
          <header className="flex items-center gap-3 border-b border-[#F5EDED] px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D72323] text-sm font-bold text-white">
              RL
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D72323]">Masuk</p>
              <p className="text-sm font-semibold text-[#3E3636]">RoboLearning</p>
            </div>
          </header>

          <div className="grid gap-6 px-6 py-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#000000]">Masuk</h1>
              <p className="text-sm text-[#3E3636]">Gunakan email atau username yang sudah terdaftar.</p>
            </div>

            <div className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 px-4 py-3 text-xs font-semibold text-[#3E3636]">
              Akses materi, sesi live, dan progres belajar dengan satu akun.
            </div>

            <LoginForm />

            <p className="text-sm text-[#3E3636]">
              Belum punya akun?{" "}
              <Link
                href={WEB_ROUTES.register.path}
                className="font-semibold text-[#D72323] underline underline-offset-2 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
              >
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
