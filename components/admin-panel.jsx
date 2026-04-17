"use client";

import { useEffect, useState } from "react";

function Block({ title, children }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="mb-4 text-xl font-bold">{title}</div>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
    />
  );
}

export function AdminPanel({ siteData, setSiteData, onBackToSite }) {
  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    setJsonText(JSON.stringify(siteData, null, 2));
  }, [siteData]);

  const updateBrand = (key, value) => {
    setSiteData((prev) => ({
      ...prev,
      brand: {
        ...prev.brand,
        [key]: value,
      },
    }));
  };

  const updateContact = (key, value) => {
    setSiteData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value,
      },
    }));
  };

  const updateMainEvent = (key, value) => {
    setSiteData((prev) => ({
      ...prev,
      mainEvent: {
        ...prev.mainEvent,
        [key]: value,
      },
    }));
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setSiteData(parsed);
      alert("数据已更新");
    } catch (error) {
      alert("JSON 格式有错误，检查一下再保存");
    }
  };

  return (
    <div className="min-h-screen bg-[#08111f] text-white">
      <header className="border-b border-white/10 bg-[#08111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-2xl font-black">Lonely Horse 后台</div>
            <div className="text-xs text-slate-400">你以后主要在这里改数据</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBackToSite}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              返回前台
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2">
        <Block title="品牌信息">
          <div className="space-y-4">
            <Input
              value={siteData.brand.nameCn}
              onChange={(e) => updateBrand("nameCn", e.target.value)}
              placeholder="中文名字"
            />
            <Input
              value={siteData.brand.tagline}
              onChange={(e) => updateBrand("tagline", e.target.value)}
              placeholder="副标题"
            />
            <Input
              value={siteData.brand.heroBadge}
              onChange={(e) => updateBrand("heroBadge", e.target.value)}
              placeholder="首页 Badge"
            />
            <Input
              value={siteData.brand.heroTitle}
              onChange={(e) => updateBrand("heroTitle", e.target.value)}
              placeholder="首页标题"
            />
            <Textarea
              value={siteData.brand.heroDescription}
              onChange={(e) => updateBrand("heroDescription", e.target.value)}
              placeholder="首页介绍"
              rows={5}
            />
          </div>
        </Block>

        <Block title="联系方式">
          <div className="space-y-4">
            <Input
              value={siteData.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              placeholder="邮箱"
            />
            <Input
              value={siteData.contact.wechat}
              onChange={(e) => updateContact("wechat", e.target.value)}
              placeholder="微信"
            />
            <Input
              value={siteData.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="电话"
            />
            <Input
              value={siteData.contact.city}
              onChange={(e) => updateContact("city", e.target.value)}
              placeholder="城市"
            />
          </div>
        </Block>

        <Block title="主赛事">
          <div className="space-y-4">
            <Input
              value={siteData.mainEvent.title}
              onChange={(e) => updateMainEvent("title", e.target.value)}
              placeholder="赛事标题"
            />
            <Input
              value={siteData.mainEvent.date}
              onChange={(e) => updateMainEvent("date", e.target.value)}
              placeholder="日期"
            />
            <Input
              value={siteData.mainEvent.location}
              onChange={(e) => updateMainEvent("location", e.target.value)}
              placeholder="地点"
            />
            <Input
              value={siteData.mainEvent.fee}
              onChange={(e) => updateMainEvent("fee", e.target.value)}
              placeholder="报名费"
            />
            <Input
              value={siteData.mainEvent.status}
              onChange={(e) => updateMainEvent("status", e.target.value)}
              placeholder="状态"
            />
            <Input
              value={siteData.mainEvent.sponsor}
              onChange={(e) => updateMainEvent("sponsor", e.target.value)}
              placeholder="赞助商"
            />
          </div>
        </Block>

        <Block title="完整数据 JSON">
          <div className="space-y-4">
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="完整 JSON"
              rows={20}
            />
            <button
              onClick={applyJson}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              保存 JSON
            </button>
          </div>
        </Block>
      </div>
    </div>
  );
}