import { useEffect, useRef } from "react";
import type { Phase } from "../phases";

type Props = { phase: Phase };

export default function Background({ phase }: Props) {
  const flowerStyleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!flowerStyleRef.current) {
      const style = document.createElement("style");
      document.head.appendChild(style);
      flowerStyleRef.current = style;
    }
    flowerStyleRef.current.textContent = `
      .flower::before {
        background: ${phase.flowerHead} !important;
        border-color: ${phase.flower} !important;
      }
    `;
  }, [phase.flowerHead, phase.flower]);

  const transStyle = "3s ease";

  return (
    <>
      {/* Sky */}
      <div style={{
        position: "absolute", inset: 0,
        background: phase.sky,
        transition: `background ${transStyle}`,
      }} />

      {/* Sky band */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "35%",
        background: phase.band,
        transition: `background ${transStyle}`,
      }} />

      {/* Horizon glow */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "6px", bottom: "128px", zIndex: 3,
        background: phase.horizon,
        opacity: phase.horizonOp,
        transition: `background ${transStyle}, opacity ${transStyle}`,
      }} />

      {/* Stars */}
      {[
        { top: "8%", left: "10%" }, { top: "12%", left: "35%" },
        { top: "5%", left: "60%" }, { top: "18%", left: "80%" },
        { top: "9%", left: "50%" }, { top: "22%", left: "20%" },
        { top: "15%", left: "70%" }, { top: "3%", left: "45%" },
        { top: "25%", left: "55%" },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", width: "4px", height: "4px",
          background: "#fff", zIndex: 1,
          top: pos.top, left: pos.left,
          opacity: phase.starOp,
          transition: `opacity ${transStyle}`,
        }} />
      ))}

      {/* Moon */}
      <div style={{
        position: "absolute", left: "80px", width: "44px", height: "44px",
        bottom: phase.moonBottom, opacity: phase.moonOp, zIndex: 2,
        transition: `bottom ${transStyle}, opacity ${transStyle}`,
      }}>
        <div style={{
          width: "44px", height: "44px",
          background: "#f0e8c0", border: "4px solid #d0c890",
          boxShadow: "4px 4px 0px #a09860", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", width: "36px", height: "44px",
            background: phase.sky, top: 0, right: "-10px",
            transition: `background ${transStyle}`,
          }} />
        </div>
      </div>

      {/* Sun */}
      <div style={{
        position: "absolute", right: "80px", width: "52px", height: "52px",
        bottom: phase.sunBottom, zIndex: 2,
        transition: `bottom ${transStyle}`,
      }}>
        {/* Rays */}
        <div style={{
          position: "absolute", width: "52px", height: "52px", top: 0, left: 0,
          opacity: phase.raysOp,
          transition: `opacity ${transStyle}`,
          animation: "spin 8s linear infinite",
        }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <div key={i} style={{
              position: "absolute", width: "8px", height: "8px",
              left: "22px", top: "22px",
              background: phase.rays,
              transformOrigin: "4px 4px",
              transform: `rotate(${deg}deg) translateY(-36px)`,
              transition: `background ${transStyle}`,
            }} />
          ))}
        </div>
        {/* Sun body */}
        <div style={{
          width: "52px", height: "52px",
          background: phase.sun,
          border: `4px solid ${phase.sunBorder}`,
          boxShadow: `4px 4px 0px ${phase.sunShadow}`,
          opacity: phase.sunOp,
          transition: `background ${transStyle}, border-color ${transStyle}, box-shadow ${transStyle}, opacity ${transStyle}`,
        }} />
      </div>

      {/* Clouds */}
      {[
        { top: "60px", left: "40px", bw: "72px", bh: "22px", tw: "36px", th: "22px", tt: "-18px", tl: "10px", delay: "0s", dur: "20s" },
        { top: "120px", left: "220px", bw: "56px", bh: "18px", tw: "28px", th: "18px", tt: "-14px", tl: "8px", delay: "-5s", dur: "25s" },
        { top: "80px", right: "160px", bw: "48px", bh: "16px", tw: "24px", th: "16px", tt: "-12px", tl: "6px", delay: "-10s", dur: "18s" },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute", zIndex: 3,
          top: c.top, left: c.left || undefined, right: (c as any).right || undefined,
          animation: `cloudDrift ${c.dur} linear infinite`,
          animationDelay: c.delay,
        }}>
          <div style={{
            width: c.bw, height: c.bh,
            background: phase.cloud, border: `3px solid ${phase.cloudBorder}`,
            transition: `background ${transStyle}, border-color ${transStyle}`,
          }} />
          <div style={{
            position: "absolute", width: c.tw, height: c.th,
            background: phase.cloud, border: `3px solid ${phase.cloudBorder}`,
            top: c.tt, left: c.tl,
            transition: `background ${transStyle}, border-color ${transStyle}`,
          }} />
        </div>
      ))}

      {/* Hills */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "130px", zIndex: 4 }}>
        {[
          { w: "220px", h: "90px", left: "-20px", clip: "ellipse(110px 90px at 50% 100%)" },
          { w: "260px", h: "110px", right: "-20px", clip: "ellipse(130px 110px at 50% 100%)" },
          { w: "200px", h: "70px", left: "130px", clip: "ellipse(100px 70px at 50% 100%)" },
        ].map((h, i) => (
          <div key={i} style={{
            position: "absolute", bottom: 0,
            width: h.w, height: h.h,
            left: h.left || undefined, right: (h as any).right || undefined,
            background: phase.hill,
            clipPath: h.clip,
            transition: `background ${transStyle}`,
          }} />
        ))}
      </div>

      {/* Flowers */}
      {["16px", undefined].map((left, si) => (
        <div key={si} style={{
          position: "absolute", bottom: "10px", zIndex: 5,
          left: left, right: left ? undefined : "16px",
          display: "flex", gap: "10px",
        }}>
          {[0, 1, 2].map(fi => (
            <div key={fi} className="flower" style={{
              width: "8px", height: "18px",
              background: phase.flower,
              border: "2px solid #904030", position: "relative",
              transition: `background ${transStyle}`,
            }} />
          ))}
        </div>
      ))}

      {/* Keyframes injected once */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cloudDrift { 0%,100% { transform: translateX(0); } 50% { transform: translateX(30px); } }
        .flower::before {
          content: '';
          position: absolute;
          width: 10px; height: 10px;
          top: -10px; left: -3px;
          border: 2px solid #c09020;
        }
      `}</style>
    </>
  );
}