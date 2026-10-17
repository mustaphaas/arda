'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, HeartHandshake, LockKeyhole, Mail, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'

const roles = {
  student: {
    label: 'Student',
    eyebrow: 'Your learning space',
    title: 'Keep your learning streak alive.',
    description: 'Pick up where you left off, practise with Ola, and make progress at your own pace.',
    accent: 'bg-[#0F7B4F]',
    soft: 'bg-emerald-50',
    text: 'text-[#0F7B4F]',
    icon: GraduationCap,
    perks: ['Personalised learning path', 'AI tutor support anytime'],
  },
  teacher: {
    label: 'Teacher',
    eyebrow: 'Your teaching workspace',
    title: 'Help every learner move forward.',
    description: 'Plan lessons, see class progress, and give your students the feedback they need.',
    accent: 'bg-[#3157A4]',
    soft: 'bg-blue-50',
    text: 'text-[#3157A4]',
    icon: BookOpen,
    perks: ['Class performance insights', 'Simple assignment management'],
  },
  parent: {
    label: 'Parent',
    eyebrow: 'Your family dashboard',
    title: 'Stay close to their progress.',
    description: 'Get a clear view of your child’s learning journey and celebrate every milestone.',
    accent: 'bg-[#B65B2A]',
    soft: 'bg-orange-50',
    text: 'text-[#B65B2A]',
    icon: HeartHandshake,
    perks: ['Weekly progress updates', 'Support their next best step'],
  },
} as const

type Role = keyof typeof roles

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>('student')
  const current = roles[role]
  const Icon = current.icon

  return (
    <main className="min-h-screen bg-[#f7faf8] text-[#17352a]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[0.95fr_1.05fr]">
        <section className={`${current.accent} relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16`}>
          <div className="relative z-10 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-[16px] bg-white/15"><GraduationCap size={24} /></div>
            <div><p className="font-heading text-xl font-bold">Learnly</p><p className="text-xs text-white/70">Learn. Grow. Shine.</p></div>
          </div>
          <div className="relative z-10 max-w-lg">
            <div className="mb-6 grid size-14 place-items-center rounded-[22px] bg-white/15"><Icon size={28} /></div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{current.eyebrow}</p>
            <h1 className="mt-4 font-heading text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">{current.title}</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80">{current.description}</p>
            <div className="mt-8 flex flex-col gap-3">
              {current.perks.map((perk) => <div key={perk} className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-white/80" />{perk}</div>)}
            </div>
          </div>
          <p className="relative z-10 text-xs text-white/60">Trusted by learners, families, and schools across Africa.</p>
          <div className="absolute -right-24 -top-24 size-96 rounded-full border-[36px] border-white/10" />
          <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/10" />
          <Sparkles className="absolute right-20 top-28 text-white/40" size={25} />
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden"><div className={`grid size-11 place-items-center rounded-[16px] ${current.accent} text-white`}><GraduationCap size={24} /></div><div><p className="font-heading text-xl font-bold text-[#0F7B4F]">Learnly</p><p className="text-xs text-muted-foreground">Learn. Grow. Shine.</p></div></div>
            <div className="mb-8"><p className={`text-sm font-semibold ${current.text}`}>Welcome back</p><h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">Sign in to Learnly</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Choose your account type to continue.</p></div>

            <div className="grid grid-cols-3 gap-2 rounded-[22px] bg-muted/60 p-1.5" role="tablist" aria-label="Account type">
              {(Object.keys(roles) as Role[]).map((item) => { const ItemIcon = roles[item].icon; return <button key={item} type="button" role="tab" aria-selected={role === item} onClick={() => setRole(item)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-[16px] text-xs font-bold transition ${role === item ? `bg-card shadow-sm ${roles[item].text}` : 'text-muted-foreground hover:text-foreground'}`}><ItemIcon size={18} />{roles[item].label}</button> })}
            </div>

            <form className="mt-8 flex flex-col gap-5" onSubmit={(event) => { event.preventDefault(); router.replace(`/?role=${role}`) }}>
              <div className="flex flex-col gap-2"><label htmlFor="email" className="text-sm font-semibold">{role === 'student' ? 'Student email or ID' : role === 'teacher' ? 'School email' : 'Parent email'}</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input id="email" type="email" placeholder={role === 'student' ? 'e.g. amakao@example.com' : role === 'teacher' ? 'name@school.edu' : 'you@example.com'} className="min-h-12 w-full rounded-[16px] border border-border bg-card pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-[#0F7B4F] focus:ring-4 focus:ring-emerald-500/10" /></div></div>
              <div className="flex flex-col gap-2"><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold">Password</label><button type="button" className={`text-xs font-bold ${current.text}`}>Forgot password?</button></div><div className="relative"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input id="password" type="password" placeholder="Enter your password" className="min-h-12 w-full rounded-[16px] border border-border bg-card pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-[#0F7B4F] focus:ring-4 focus:ring-emerald-500/10" /></div></div>
              <button type="submit" className={`mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] ${current.accent} px-4 text-sm font-bold text-white shadow-sm transition hover:brightness-95`}>Sign in as a {current.label.toLowerCase()} <ArrowRight size={17} /></button>
            </form>

            <div className="my-8 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" />or<div className="h-px flex-1 bg-border" /></div>
            <button type="button" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] border border-border bg-card text-sm font-semibold transition hover:bg-muted"><ShieldCheck size={18} className={current.text} />Continue with school portal</button>
            <p className="mt-8 text-center text-sm text-muted-foreground">New to Learnly? <button type="button" className={`font-bold ${current.text}`}>Create an account</button></p>
            <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><UsersRound size={14} /> Need help? Contact your school administrator.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
