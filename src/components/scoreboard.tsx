type Props = { score: number; bestScore: number; phaseName: string; phaseColor: string };

export default function ScoreBoard({ score, bestScore, phaseName, phaseColor }: Props) {
  return (
    <>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", marginBottom: "12px", color: phaseColor, transition: "color 3s ease", letterSpacing: "1px" }}>
        {phaseName}
      </div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {[{ label: "SCORE", val: score }, { label: "BEST", val: bestScore }].map(({ label, val }) => (
          <div key={label} style={{
            background: "#f0d0a0", border: "3px solid #c08848",
            padding: "8px 20px", textAlign: "center",
            boxShadow: "4px 4px 0px #a06030",
          }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#7a4820", marginBottom: "4px" }}>{label}</div>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: "28px", color: "#5a3010" }}>{val}</div>
          </div>
        ))}
      </div>
    </>
  );
}