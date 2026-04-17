"use client";

import { useMemo, useState } from "react";
import {
  Home,
  Trophy,
  Users,
  CalendarDays,
  CreditCard,
  Newspaper,
  Building2,
  FileText,
  ClipboardList,
  Mail,
  Flag,
  MapPin,
  Phone,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { key: "home", label: "首页", icon: Home },
  { key: "events", label: "赛事中心", icon: Trophy },
  { key: "teams", label: "球队球员", icon: Users },
  { key: "schedule", label: "赛程成绩", icon: CalendarDays },
  { key: "register", label: "报名支付", icon: CreditCard },
  { key: "news", label: "新闻公告", icon: Newspaper },
  { key: "sponsors", label: "商务合作", icon: Building2 },
  { key: "rules", label: "赛事规则", icon: FileText },
  { key: "faq", label: "常见问题", icon: ClipboardList },
  { key: "contact", label: "联系我们", icon: Mail },
  { key: "about", label: "关于联盟", icon: Flag },
];

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
      {desc ? <p className="mt-4 text-slate-400">{desc}</p> : null}
    </div>
  );
}

function CardBox({ children, className = "" }) {
  return (
    <div className={`rounded-[28px] border border-white/10 bg-white/5 ${className}`}>
      {children}
    </div>
  );
}

export function PublicSite({ siteData, onOpenAdmin }) {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLabel = useMemo(
    () => navItems.find((item) => item.key === activePage)?.label ?? "首页",
    [activePage]
  );

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage siteData={siteData} onOpenAdmin={onOpenAdmin} />;
      case "events":
        return <EventsPage siteData={siteData} />;
      case "teams":
        return <TeamsPage />;
      case "schedule":
        return <SchedulePage siteData={siteData} />;
      case "register":
        return <RegisterPage siteData={siteData} />;
      case "news":
        return <NewsPage siteData={siteData} />;
      case "sponsors":
        return <SponsorsPage siteData={siteData} />;
      case "rules":
        return <RulesPage siteData={siteData} />;
      case "faq":
        return <FAQPage siteData={siteData} />;
      case "contact":
        return <ContactPage siteData={siteData} />;
      case "about":
        return <AboutPage siteData={siteData} />;
      default:
        return <HomePage siteData={siteData} onOpenAdmin={onOpenAdmin} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08111f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => setActivePage("home")} className="text-left">
            <div className="text-2xl font-black tracking-wide">{siteData.brand.nameCn}</div>
            <div className="text-xs text-slate-400">{siteData.brand.tagline}</div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200 md:inline-flex">
              当前页面：{activeLabel}
            </span>

            <button
              onClick={onOpenAdmin}
              className="hidden rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100 md:inline-flex"
            >
              进入后台
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="rounded-2xl border border-white/20 p-2 text-white hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#08111f] px-6 py-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActivePage(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm ${
                      activePage === item.key ? "bg-white text-slate-950" : "bg-white/5 text-slate-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={onOpenAdmin}
                className="rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-slate-950"
              >
                进入后台
              </button>
            </div>
          </div>
        )}
      </header>

      <main>{renderPage()}</main>

      <footer className="border-t border-white/10 bg-[#08111f]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold">{siteData.brand.nameCn}</div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              一个面向长期赛事运营、品牌建设、球员注册、赛程管理和联盟内容输出的全美足球联盟官网框架。
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">联系方式</div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {siteData.contact.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 微信：{siteData.contact.wechat} / 电话：{siteData.contact.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {siteData.contact.city}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">后续可接入</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["真实支付", "表单提交", "数据库", "管理员后台", "球队资料页"].map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ siteData, onOpenAdmin }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_26%),radial-gradient(circle_at_left,rgba(245,158,11,0.18),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm">
              {siteData.brand.heroBadge}
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              {siteData.brand.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {siteData.brand.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
                立即报名
              </button>
              <button
                onClick={onOpenAdmin}
                className="rounded-2xl border border-white/20 px-6 py-3 text-white hover:bg-white/10"
              >
                进入后台
              </button>
            </div>
          </div>

          <CardBox className="p-6">
            <div className="flex items-center justify-between text-xl font-semibold">
              {siteData.brand.nameEn} 联盟控制台
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
                综合网站框架
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-900/80 p-4">
                <div className="text-sm text-slate-400">主赛事</div>
                <div className="mt-1 text-2xl font-bold">美南预选赛</div>
              </div>

              <div className="rounded-2xl bg-slate-900/80 p-4">
                <div className="text-sm text-slate-400">赛事类型</div>
                <div className="mt-1 text-2xl font-bold">{siteData.eventTypes.join(" / ")}</div>
              </div>

              <div className="rounded-2xl bg-slate-900/80 p-4">
                <div className="text-sm text-slate-400">核心赛区</div>
                <div className="mt-1 text-xl font-bold">{siteData.regions.join(" / ")}</div>
              </div>

              <div className="rounded-2xl bg-slate-900/80 p-4">
                <div className="text-sm text-slate-400">首站城市</div>
                <div className="mt-1 text-2xl font-bold">Columbia</div>
              </div>
            </div>
          </CardBox>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionTitle
          eyebrow="主赛事"
          title={siteData.mainEvent.title}
          desc={`${siteData.mainEvent.date} · ${siteData.mainEvent.location} · ${siteData.mainEvent.fee}`}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <CardBox>
            <div className="p-6">
              <div className="text-xl font-semibold">比赛时间</div>
              <p className="mt-3 text-slate-400">{siteData.mainEvent.date}</p>
            </div>
          </CardBox>

          <CardBox>
            <div className="p-6">
              <div className="text-xl font-semibold">比赛地点</div>
              <p className="mt-3 text-slate-400">{siteData.mainEvent.location}</p>
            </div>
          </CardBox>

          <CardBox>
            <div className="p-6">
              <div className="text-xl font-semibold">报名费</div>
              <p className="mt-3 text-slate-400">{siteData.mainEvent.fee}</p>
            </div>
          </CardBox>

          <CardBox>
            <div className="p-6">
              <div className="text-xl font-semibold">赞助商</div>
              <p className="mt-3 text-slate-400">{siteData.mainEvent.sponsor}</p>
            </div>
          </CardBox>
        </div>
      </section>
    </>
  );
}

function EventsPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="赛事中心" title="联赛、杯赛、预选赛都可以集中在这里。" />
      <div className="grid gap-5 lg:grid-cols-2">
        {siteData.events.map((event) => (
          <CardBox key={event.title}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">{event.type}</span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
                  {event.status}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold">{event.title}</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div>时间：{event.date}</div>
                <div>地点：{event.location}</div>
              </div>
            </div>
          </CardBox>
        ))}
      </div>
    </section>
  );
}

function TeamsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle
        eyebrow="球队球员"
        title="这里预留给球队数据库和球员档案。"
        desc="以后你可以接真实名单，现在先保留综合框架。"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <CardBox>
          <div className="p-6">
            <div className="text-2xl font-bold">球队模块</div>
            <p className="mt-3 text-slate-400">可接入：队名、队长、学校、球员名单、战绩、队徽。</p>
          </div>
        </CardBox>

        <CardBox>
          <div className="p-6">
            <div className="text-2xl font-bold">球员模块</div>
            <p className="mt-3 text-slate-400">可接入：姓名、位置、号码、进球、助攻、扑救、照片。</p>
          </div>
        </CardBox>
      </div>
    </section>
  );
}

function SchedulePage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="赛程成绩" title="赛程、成绩、积分榜都能放在这里。" />
      <div className="grid gap-5 md:grid-cols-2">
        <CardBox>
          <div className="p-6">
            <div className="text-xl font-semibold">主赛事</div>
            <p className="mt-3 text-slate-400">{siteData.mainEvent.title}</p>
            <p className="mt-2 text-slate-400">{siteData.mainEvent.date}</p>
            <p className="mt-2 text-slate-400">{siteData.mainEvent.location}</p>
          </div>
        </CardBox>

        <CardBox>
          <div className="p-6">
            <div className="text-xl font-semibold">后续可接入</div>
            <p className="mt-3 text-slate-400">小组积分榜、淘汰赛对阵树、实时比分、战报。</p>
          </div>
        </CardBox>
      </div>
    </section>
  );
}

function RegisterPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="报名支付" title="这里是报名与支付中心框架。" />
      <div className="grid gap-5 md:grid-cols-2">
        <CardBox>
          <div className="p-6">
            <div className="text-2xl font-bold">当前收费</div>
            <p className="mt-4 text-3xl font-black">{siteData.mainEvent.fee}</p>
            <p className="mt-3 text-slate-400">{siteData.mainEvent.title}</p>
          </div>
        </CardBox>

        <CardBox>
          <div className="p-6">
            <div className="text-2xl font-bold">后续可接入</div>
            <p className="mt-3 text-slate-400">Google Form、Tally、Stripe、支付成功页、确认邮件。</p>
          </div>
        </CardBox>
      </div>
    </section>
  );
}

function NewsPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="新闻公告" title="网站内容更新区。" />
      <div className="grid gap-5 lg:grid-cols-2">
        {siteData.news.map((item) => (
          <CardBox key={item.title}>
            <div className="p-6">
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
                {item.tag}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.desc}</p>
            </div>
          </CardBox>
        ))}
      </div>
    </section>
  );
}

function SponsorsPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="商务合作" title="赞助商与合作伙伴展示区。" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteData.sponsors.map((item) => (
          <CardBox key={item}>
            <div className="flex min-h-[120px] items-center justify-center p-6 text-slate-300">
              {item}
            </div>
          </CardBox>
        ))}
      </div>
    </section>
  );
}

function RulesPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="赛事规则" title="规则页会让网站更正式。" />
      <div className="grid gap-4">
        {siteData.rules.map((rule) => (
          <CardBox key={rule}>
            <div className="p-5 text-slate-300">{rule}</div>
          </CardBox>
        ))}
      </div>
    </section>
  );
}

function FAQPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="常见问题" title="FAQ 模块" />
      <div className="grid gap-5 lg:grid-cols-2">
        {siteData.faq.map((item) => (
          <CardBox key={item.q}>
            <div className="p-6">
              <div className="text-lg font-semibold">{item.q}</div>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.a}</p>
            </div>
          </CardBox>
        ))}
      </div>
    </section>
  );
}

function ContactPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="联系我们" title="联系页框架" />
      <div className="grid gap-5 md:grid-cols-2">
        <CardBox>
          <div className="space-y-4 p-6 text-slate-300">
            <div>邮箱：{siteData.contact.email}</div>
            <div>微信：{siteData.contact.wechat}</div>
            <div>电话：{siteData.contact.phone}</div>
            <div>城市：{siteData.contact.city}</div>
          </div>
        </CardBox>

        <CardBox>
          <div className="p-6 text-slate-400">
            后续可接入联系表单、自动邮件、预约咨询。
          </div>
        </CardBox>
      </div>
    </section>
  );
}

function AboutPage({ siteData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle eyebrow="关于联盟" title={`${siteData.brand.nameCn} 不只是一次比赛，而是长期品牌。`} />
      <CardBox>
        <div className="p-6 text-slate-300 leading-7">
          这个网站框架适合你长期扩展成美东、美中、美南、美西四大赛区加全美总决赛体系。以后你可以继续接后台、支付、数据库、球队数据和新闻内容。
        </div>
      </CardBox>
    </section>
  );
}