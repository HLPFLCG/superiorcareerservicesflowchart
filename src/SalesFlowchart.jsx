import { useState, useRef } from "react";

/* ─── BRAND TOKENS ────────────────────────────────────────────────────────── */
const B = {
  navy:      "#1B3A6B",
  navyDark:  "#0F2444",
  navyLight: "#2A5298",
  navyPale:  "#EEF3FB",
  gold:      "#C9A84C",
  goldLight: "#E8C96A",
  goldPale:  "#FBF6E9",
  offWhite:  "#F8F9FB",
  gray100:   "#F1F4F8",
  gray200:   "#E2E8F0",
  gray400:   "#94A3B8",
  gray600:   "#4A5568",
  gray800:   "#1A202C",
  white:     "#FFFFFF",
  green:     "#166534",
  greenBg:   "#F0FDF4",
  greenBdr:  "#86EFAC",
  red:       "#991B1B",
  redBg:     "#FEF2F2",
  redBdr:    "#FCA5A5",
};

const LOGO_WHITE = "https://superiorcareersrvc.s3.amazonaws.com/wp-content/uploads/2024/11/26123722/SSLLC-Transparent-White.png";
const LOGO_BLUE  = "https://superiorcareersrvc.s3.amazonaws.com/wp-content/uploads/2024/11/26123722/SSLLC-Transparent-Blue.png";

/* ─── STAGE DATA ──────────────────────────────────────────────────────────── */
const stages = [
  {
    id: "outreach", num: "01", label: "Outreach", icon: "🔍",
    color: "#1B3A6B", borderColor: "#2A5298",
    title: "LinkedIn / Facebook / B2B Outreach",
    tagline: "Identify and connect with qualified senior professionals in active transition.",
    kpi: "Goal: 20 new connections / week",
    steps: [
      {
        label: "Identify Your Prospect",
        tag: "Targeting", tagColor: "#1B3A6B",
        body: "Look for the Open to Work badge on laid-off senior professionals: Directors, VPs, Senior Managers. Target industries: Tech, Finance, Healthcare, Defense. Use Sales Navigator filters narrowed to profiles updated in the last 30 days.",
        tip: "Profiles updated in the last 30 days with Open to Work are highest-intent.",
      },
      {
        label: "Send Connection Request (300 chars max)",
        tag: "Step 1", tagColor: "#2A5298",
        body: "Reference something specific: a post they wrote, a mutual connection, or a recent achievement. Never pitch in Message 1. Always send from David's personal LinkedIn profile — never from the company page.",
        tip: "Personalization is the only variable that meaningfully moves acceptance rates.",
      },
      {
        label: "Was the Connection Accepted?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Wait 3–4 days, then send Message 2.",
        no:  "Move on. Do not follow up on unaccepted requests.",
      },
    ],
  },
  {
    id: "nurture", num: "02", label: "Nurture", icon: "💬",
    color: "#1E4D8C", borderColor: "#3060A8",
    title: "3-Level Pain Message Sequence",
    tagline: "Build genuine rapport across three escalating pain levels before any offer.",
    kpi: "Goal: 40% reply rate on Message 2",
    steps: [
      {
        label: "Message 2 — Value Add (Day 3–4)",
        tag: "Pain Levels 1–3", tagColor: "#2A5298",
        body: "Surface Pain (Level 1): Acknowledge search frustration — applications going nowhere.\n\nOrganizational Pain (Level 2): Are their skills still relevant in today's market?\n\nPersonal Pain (Level 3): The 2am feeling — the weight of a family watching.\n\nEnd with one sincere question. No pitch. No offer.",
        tip: "Never pitch in Message 2. Your only job is rapport.",
      },
      {
        label: "Did the Prospect Respond?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Engage genuinely. Answer their question. Continue building rapport.",
        no:  "Wait 4–5 days, then send Message 3.",
      },
      {
        label: "Message 3 — Soft CTA",
        tag: "Social Proof", tagColor: "#2A5298",
        body: "Lead with a brief case study (e.g., Director who landed $35K higher salary in 90 days). Present the cost of inaction over 90 days. Offer a 15-minute no-obligation call. Include Calendly link.",
        tip: "The cost-of-inaction frame is the most powerful tool in this entire sequence.",
      },
      {
        label: "Did They Engage with the CTA?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Send the Client Readiness Checklist + Calendly link.",
        no:  "Send a graceful exit message. Leave the door open. Move to long-term nurture.",
      },
    ],
  },
  {
    id: "qualify", num: "03", label: "Qualify", icon: "📋",
    color: "#7B5E1A", borderColor: "#C9A84C",
    title: "Pre-Consultation Qualification",
    tagline: "Prime the prospect psychologically before the call — not just qualify them.",
    kpi: "Goal: 80% checklist completion",
    steps: [
      {
        label: "Send the Client Readiness Checklist",
        tag: "Priming", tagColor: "#7B5E1A",
        body: "Five yes/no statements designed as a commitment device, not an intake form. Prospects who complete it self-select as serious — they close at significantly higher rates than those who don't.",
        tip: "Frame it as: \"Before our call, I send a quick 5-question readiness check to make sure the time is worthwhile for both of us.\"",
      },
      {
        label: "Request Their Current Resume",
        tag: "Research", tagColor: "#7B5E1A",
        body: "Request the resume alongside the checklist. Review it before the call. Prepare 2–3 personalized discovery questions based on their actual experience and career trajectory.",
        tip: "Pre-call research is the single biggest differentiator between a generic call and a consultation they'll remember.",
      },
      {
        label: "Did They Complete the Checklist?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Consultation confirmed. Send a reminder 2 hours before the call.",
        no:  "Send one reminder. If still not completed, proceed but treat as lower-commitment.",
      },
    ],
  },
  {
    id: "consultation", num: "04", label: "Consult", icon: "🎯",
    color: "#145A32", borderColor: "#4CAF7D",
    title: "The Sales Consultation (45 Minutes)",
    tagline: "A structured 5-phase call that converts pain into commitment — without pressure.",
    kpi: "Goal: 30% same-day close rate",
    steps: [
      {
        label: "Phase 1 — Upfront Agreement (Min 1–3)",
        tag: "Frame", tagColor: "#145A32",
        body: "Open with: \"My only goal today is to understand your situation and share how I work — then you decide if it's the right fit. Fair?\"\n\nRemove all pressure. Wait for explicit verbal agreement before proceeding.",
        tip: "Never move to Phase 2 without their agreement. This single move eliminates defensive resistance for the entire call.",
      },
      {
        label: "Phase 2 — Discovery via FORM/FORD (Min 3–15)",
        tag: "Discovery", tagColor: "#145A32",
        body: "Family · Occupation · Recreation · Dreams / Money\n\nKey questions: role history, what they've already tried, recruiter feedback received, confidence score (1–10), what happens if month 4–5 looks the same as today.",
        tip: "Silence is a tool. Ask the question — then wait. Resist the urge to fill the space.",
      },
      {
        label: "Phase 3 — Pain Amplification (Min 15–25)",
        tag: "⚠ CRITICAL — Do Not Skip", tagColor: "#991B1B", tagDanger: true,
        body: "DO NOT rush. DO NOT skip. DO NOT solve yet.\n\nLevel 1 (Surface): \"You've sent [X] applications and heard nothing back.\"\nLevel 2 (Org): \"Have you started to wonder if your experience isn't landing the way it used to?\"\nLevel 3 (Personal): \"What does 2am feel like? When you look at your family — do you feel like you're letting them down?\"\n\nLet them go there. Hold the silence. Then: \"I hear you. You're not alone in this.\"",
        tip: "The close happens here — in the pain — not in Phase 5. This is where the decision is made emotionally.",
      },
      {
        label: "Phase 4 — Present the Transformation (Min 25–35)",
        tag: "Solution", tagColor: "#145A32",
        body: "Bridge with: \"You're using an old playbook in a new game.\"\n\nWalk through all 4 steps — connect each directly to a pain they expressed:\n• Step 1 — Mindshift → addresses feeling stuck and invisible\n• Step 2 — Messaging → addresses zero callbacks\n• Step 3 — 3-Channel Search → stops the scattershot approach\n• Step 4 — Interview Framework → ends ambiguous outcomes",
        tip: "Every feature you mention must connect back to a specific pain they personally shared. Generic is forgettable.",
      },
      {
        label: "Phase 5 — Pricing & Close (Min 35–45)",
        tag: "Close", tagColor: "#145A32",
        body: "Show all 3 tiers. Recommend one with a personalized reason.\n\n🥈 Silver — $4,000\n🥇 Gold — $6,000 (Recommended for most clients)\n💎 Platinum — $7,500\n\nROI Frame: \"If this helps you land $20K–$30K higher than you'd negotiate alone — which is typical — it pays for itself in the first 6–8 weeks.\"\n\nIntroduce Klarna BEFORE any objection. Close with: \"I have availability starting [date]. Does this feel like the right next step for you?\"",
        tip: "Present Klarna proactively — never wait for a price objection to introduce financing.",
      },
    ],
  },
  {
    id: "close", num: "05", label: "Close", icon: "✅",
    color: "#1A5A3A", borderColor: "#4CAF7D",
    title: "Close or Handle Objections",
    tagline: "Commit to a clear path — resolve resistance systematically with proven responses.",
    kpi: "Goal: < 3 objections per close",
    steps: [
      {
        label: "Is the Prospect Ready to Commit?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Collect payment. Confirm start date. Begin Step 1 at first session.",
        no:  "Move to objection handling. Reference Section 11 of the Operations Manual.",
      },
      {
        label: "Was the Objection Handled Successfully?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Close the sale. Collect payment. Confirm start date.",
        no:  "Enter the post-consultation follow-up sequence (Day 2 → Day 5 → Day 10).",
      },
    ],
  },
  {
    id: "followup", num: "06", label: "Follow-Up", icon: "🔄",
    color: "#4A1A6B", borderColor: "#9B59B6",
    title: "Post-Consultation Follow-Up (10 Days)",
    tagline: "Convert warm prospects who didn't close same-day through a structured, caring sequence.",
    kpi: "Goal: 15% conversion from sequence",
    steps: [
      {
        label: "Same Day — Within 2 Hours of the Call",
        tag: "Day 0", tagColor: "#4A1A6B",
        body: "Thank them sincerely. Reference one specific thing they shared during the call. Send the proposal for the tier you discussed. Attach the checklist if not yet received.",
        tip: "Speed signals seriousness. Two hours is the hard deadline.",
      },
      {
        label: "Day 2 — Check-In",
        tag: "Day 2", tagColor: "#4A1A6B",
        body: "\"What questions can I answer for you?\" Position yourself as a helper, not a closer. Never ask if they've made a decision.",
        tip: "Never ask 'Have you decided?' Ask 'What questions can I answer?'",
      },
      {
        label: "Day 5 — Direct & Gentle Urgency",
        tag: "Day 5", tagColor: "#4A1A6B",
        body: "Reintroduce the cost of inaction. \"Every week without a clear strategy is another week of lost momentum — and potentially thousands in salary left on the table.\" Include your Calendly link.",
        tip: "Urgency works best when it's rooted in their timeline, not your sales pressure.",
      },
      {
        label: "Day 10 — Final Touch",
        tag: "Day 10", tagColor: "#4A1A6B",
        body: "\"This is my last note. I'm keeping a spot open until [specific date].\" After this, move to long-term nurture. Genuinely wish them success regardless of their decision.",
        tip: "Genuine goodwill at the final touch keeps the door permanently open — for referrals too.",
      },
      {
        label: "Did the Client Enroll?",
        tag: "Decision", tagColor: "#C9A84C",
        body: "", decision: true,
        yes: "Closed Won ✓ — begin engagement, update CRM to Stage 7.",
        no:  "Closed Lost or Nurture — update CRM (Stage 8 or 9). Schedule 30–60 day follow-up.",
      },
    ],
  },
];

const RULES = [
  { icon: "✕", text: "Never use the word 'resume' in cold outreach" },
  { icon: "👤", text: "Always outreach from David's personal profile, not the company page" },
  { icon: "⚡", text: "Respond to engaged leads within 2 hours — maximum" },
  { icon: "💳", text: "Introduce Klarna before any pricing objection arises" },
  { icon: "📊", text: "Move through all 3 pain levels in order — never skip" },
  { icon: "→",  text: "Every message ends with exactly ONE clear next step" },
  { icon: "✍",  text: "Personalize every single message — zero templated content" },
  { icon: "$",  text: "Never apologize for the price or discount unprompted" },
];

const PRICING = [
  { tier: "Silver",   price: "$4,000", note: "Core coaching package",   recommended: false },
  { tier: "Gold",     price: "$6,000", note: "Most clients choose this", recommended: true  },
  { tier: "Platinum", price: "$7,500", note: "Full-service premium",     recommended: false },
];

/* ─── COMPONENTS ──────────────────────────────────────────────────────────── */

function Tag({ label, color, danger }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 10, fontWeight: 700, letterSpacing: "0.07em",
      padding: "3px 8px", borderRadius: 4,
      background: danger ? "#FEF2F2" : `${color}14`,
      color: danger ? B.red : color,
      border: `1px solid ${danger ? "#FECACA" : `${color}30`}`,
      fontFamily: "monospace", whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function DecisionBranch({ step }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
      {[
        { out: "YES", text: step.yes, bg: B.greenBg, border: B.greenBdr, color: B.green, icon: "✓" },
        { out: "NO",  text: step.no,  bg: B.redBg,   border: B.redBdr,   color: B.red,   icon: "✕" },
      ].map(b => (
        <div key={b.out} style={{
          background: b.bg, border: `1px solid ${b.border}`,
          borderRadius: 8, padding: "12px 14px",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
            color: b.color, marginBottom: 6, fontFamily: "monospace",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: "50%", background: b.color,
              color: "#fff", display: "inline-flex", alignItems: "center",
              justifyContent: "center", fontSize: 9, flexShrink: 0,
            }}>{b.icon}</span>
            {b.out}
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: B.gray600, lineHeight: 1.55, fontFamily: "Georgia, serif" }}>
            {b.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function StepCard({ step, stageColor, number, isFirst }) {
  const [open, setOpen] = useState(false);
  const isDecision = !!step.decision;
  const clickable = !!(step.body || isDecision);

  return (
    <div style={{ position: "relative", paddingLeft: 44 }}>
      {!isFirst && (
        <div style={{
          position: "absolute", left: 13, top: -14, width: 2, height: 24,
          background: `${stageColor}25`,
        }} />
      )}
      <div style={{
        position: "absolute", left: 0, top: 14,
        width: 28, height: 28, borderRadius: "50%",
        background: open ? (isDecision ? B.gold : stageColor) : (isDecision ? B.goldPale : `${stageColor}12`),
        border: `2px solid ${isDecision ? B.gold : stageColor}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: isDecision ? 13 : 10, fontWeight: 800,
        color: open ? "#fff" : (isDecision ? B.gold : stageColor),
        fontFamily: "monospace", zIndex: 1, flexShrink: 0,
        transition: "all 0.2s",
      }}>
        {isDecision ? "?" : number}
      </div>

      <div
        onClick={() => clickable && setOpen(o => !o)}
        style={{
          background: open ? (isDecision ? "#FFFBF0" : `${stageColor}07`) : B.white,
          border: `1px solid ${open ? (isDecision ? "#E8C96A" : `${stageColor}35`) : B.gray200}`,
          borderRadius: 10, padding: "14px 16px",
          cursor: clickable ? "pointer" : "default",
          transition: "all 0.18s",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: step.tip && !open ? 4 : 0 }}>
              <span style={{
                fontSize: 14, fontWeight: 700, lineHeight: 1.3,
                color: isDecision ? "#7B5E1A" : B.gray800,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}>
                {step.label}
              </span>
              <Tag label={step.tag} color={step.tagColor} danger={step.tagDanger} />
            </div>
            {step.tip && !open && (
              <p style={{ margin: 0, fontSize: 12, color: B.gray400, fontStyle: "italic", lineHeight: 1.5 }}>
                {step.tip}
              </p>
            )}
          </div>
          {clickable && (
            <div style={{
              color: B.gray400, fontSize: 10, flexShrink: 0, marginTop: 4,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}>▼</div>
          )}
        </div>

        {open && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${B.gray200}` }}>
            {step.body && (
              <p style={{
                margin: "0 0 12px", fontSize: 13, color: B.gray600,
                lineHeight: 1.8, whiteSpace: "pre-line",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}>
                {step.body}
              </p>
            )}
            {step.tip && (
              <div style={{
                background: B.navyPale,
                border: `1px solid ${B.navy}20`,
                borderLeft: `3px solid ${B.navyLight}`,
                borderRadius: "0 6px 6px 0",
                padding: "9px 13px",
                fontSize: 12.5, color: B.navyDark,
                fontStyle: "italic", lineHeight: 1.6,
              }}>
                💡 <strong style={{ fontStyle: "normal" }}>Pro tip:</strong> {step.tip}
              </div>
            )}
            {isDecision && <DecisionBranch step={step} />}
          </div>
        )}
      </div>
    </div>
  );
}

function PipelineProgress({ activeId }) {
  const idx = stages.findIndex(s => s.id === activeId);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        {stages.map((s, i) => {
          const done   = i < idx;
          const active = i === idx;
          return (
            <div key={s.id} style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div title={s.title} style={{
                width: active ? 34 : 26, height: active ? 34 : 26,
                borderRadius: "50%", flexShrink: 0,
                background: done ? s.color : active ? s.color : B.gray200,
                border: `2px solid ${done || active ? s.color : B.gray200}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: active ? 15 : 11,
                color: done || active ? "#fff" : B.gray400,
                transition: "all 0.3s",
                boxShadow: active ? `0 0 0 4px ${s.color}22` : "none",
                cursor: "default",
              }}>
                {done ? "✓" : s.icon}
              </div>
              {i < stages.length - 1 && (
                <div style={{
                  flex: 1, height: 2,
                  background: done
                    ? `linear-gradient(90deg, ${s.color}, ${stages[i+1].color})`
                    : B.gray200,
                  transition: "background 0.4s",
                }} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {stages.map((s, i) => (
          <div key={s.id} style={{
            fontSize: 9, fontFamily: "monospace",
            color: i === idx ? s.color : B.gray400,
            fontWeight: i === idx ? 700 : 400,
            textAlign: "center", flex: 1,
            letterSpacing: "0.04em",
          }}>
            {s.label.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

function StageCard({ stage, isActive, onToggle, searchQ }) {
  const matchSearch = !searchQ || [stage.title, stage.tagline, ...stage.steps.map(s => s.label + " " + (s.body||"") + " " + (s.tip||""))]
    .join(" ").toLowerCase().includes(searchQ.toLowerCase());
  if (!matchSearch) return null;

  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer",
          background: isActive
            ? `linear-gradient(135deg, ${stage.color} 0%, ${stage.color}DD 100%)`
            : B.white,
          border: `1px solid ${isActive ? stage.color : B.gray200}`,
          borderRadius: isActive ? "12px 12px 0 0" : 12,
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 14,
          transition: "all 0.22s",
          boxShadow: isActive ? `0 6px 28px ${stage.color}30` : "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: isActive ? "rgba(255,255,255,0.15)" : B.offWhite,
          border: `1px solid ${isActive ? "rgba(255,255,255,0.25)" : B.gray200}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, fontFamily: "monospace",
          color: isActive ? "#fff" : B.gray400, letterSpacing: "0.04em",
        }}>
          {stage.num}
        </div>

        <span style={{ fontSize: 24, flexShrink: 0 }}>{stage.icon}</span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "monospace",
            color: isActive ? "rgba(255,255,255,0.6)" : B.gray400,
            textTransform: "uppercase", marginBottom: 3,
          }}>
            Stage {stage.num} · {stage.label}
          </div>
          <div style={{
            fontSize: 15, fontWeight: 700, lineHeight: 1.3,
            color: isActive ? "#fff" : B.gray800,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}>
            {stage.title}
          </div>
          {isActive && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2, fontStyle: "italic" }}>
              {stage.kpi}
            </div>
          )}
        </div>

        <div style={{
          fontSize: 11, fontFamily: "monospace",
          color: isActive ? "rgba(255,255,255,0.4)" : B.gray400, flexShrink: 0,
        }}>
          {stage.steps.length} steps
        </div>

        <div style={{
          color: isActive ? "rgba(255,255,255,0.45)" : B.gray400,
          fontSize: 11, flexShrink: 0,
          transform: isActive ? "rotate(180deg)" : "none",
          transition: "transform 0.22s",
        }}>▼</div>
      </button>

      {isActive && (
        <div style={{
          background: B.offWhite,
          border: `1px solid ${stage.borderColor}40`,
          borderTop: "none", borderRadius: "0 0 12px 12px",
          padding: "20px 20px 24px",
          boxShadow: `0 8px 32px ${stage.color}14`,
        }}>
          <p style={{
            margin: "0 0 20px", fontSize: 13, color: B.gray600,
            fontStyle: "italic", lineHeight: 1.65,
            borderLeft: `3px solid ${stage.color}`,
            paddingLeft: 12,
          }}>
            {stage.tagline}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {stage.steps.map((step, i) => (
              <StepCard key={i} step={step} stageColor={stage.color} number={String(i+1).padStart(2,"0")} isFirst={i===0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────────────────── */
export default function SalesFlowchart() {
  const [activeStage, setActiveStage] = useState("outreach");
  const [searchQ, setSearchQ]         = useState("");
  const [showAll, setShowAll]         = useState(false);
  const [showQR, setShowQR]           = useState(false);

  const allOpen = showAll || !!searchQ;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #F8F9FB; -webkit-font-smoothing: antialiased; }
        input::placeholder { color: #94A3B8; }
        input:focus { outline: none !important; border-color: #2A5298 !important; box-shadow: 0 0 0 3px rgba(42,82,152,0.15) !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease both; }
        @media(max-width:600px) { .hide-mobile { display:none !important; } }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: B.offWhite, fontFamily: "Georgia, 'Times New Roman', serif" }}>

        {/* ── NAV ── */}
        <nav style={{
          background: B.navyDark,
          borderBottom: `3px solid ${B.gold}`,
          padding: "0 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 64, position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 2px 20px rgba(0,0,0,0.35)",
        }}>
          <img src={LOGO_WHITE} alt="Superior Career Services" style={{ height: 36, objectFit: "contain" }}
            onError={e => { e.target.style.display="none"; }} />
          <div style={{ display: "flex", gap: 8 }} className="no-print">
            <button onClick={() => setShowQR(o => !o)} style={{
              background: showQR ? B.gold : "rgba(255,255,255,0.1)",
              color: showQR ? B.navyDark : "#fff",
              border: `1px solid ${showQR ? B.gold : "rgba(255,255,255,0.2)"}`,
              borderRadius: 6, padding: "6px 14px",
              fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: "monospace", letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}>
              {showQR ? "✕ CLOSE" : "☰ QUICK REF"}
            </button>
            <button onClick={() => window.print()} style={{
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 6, padding: "6px 14px",
              fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: "monospace",
            }}>🖨 PRINT</button>
          </div>
        </nav>

        {/* ── QUICK REF DRAWER ── */}
        {showQR && (
          <div className="fade-up" style={{
            background: B.navyDark, padding: "24px 20px",
            borderBottom: `1px solid rgba(201,168,76,0.2)`,
          }}>
            <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: B.gold, letterSpacing: "0.18em", fontWeight: 700, marginBottom: 16 }}>
                  ◆ NON-NEGOTIABLE RULES
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 28px" }}>
                  {RULES.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                      <span style={{ color: B.gold, fontSize: 11, width: 16, textAlign: "center", flexShrink: 0 }}>{r.icon}</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: B.gold, letterSpacing: "0.18em", fontWeight: 700, marginBottom: 16 }}>
                  ◆ PRICING TIERS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {PRICING.map(p => (
                    <div key={p.tier} style={{
                      background: p.recommended ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${p.recommended ? B.gold : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 8, padding: "10px 14px",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: p.recommended ? B.gold : "#fff", fontFamily: "Georgia, serif" }}>{p.tier}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{p.note}</div>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{p.price}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace", textAlign: "center" }}>
                    Klarna available on all tiers
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HERO ── */}
        <div style={{
          background: `linear-gradient(135deg, ${B.navyDark} 0%, ${B.navy} 55%, ${B.navyLight} 100%)`,
          padding: "52px 20px 44px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(201,168,76,0.14)", border: `1px solid rgba(201,168,76,0.35)`,
              borderRadius: 99, padding: "5px 18px",
              fontSize: 10, fontFamily: "monospace", color: B.gold,
              letterSpacing: "0.2em", marginBottom: 20,
            }}>
              ◆ CONFIDENTIAL INTERNAL DOCUMENT · Q2 2026 ◆
            </div>
            <h1 style={{
              color: "#fff", margin: "0 0 10px",
              fontSize: "clamp(24px, 4.5vw, 42px)",
              fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2,
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}>
              End-to-End Sales Process<br />
              <span style={{ color: B.goldLight }}>Flowchart & Reference Guide</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "0 0 32px", lineHeight: 1.6 }}>
              David Stevenson · Tampa Bay, FL · Senior Professional Career Coaching
            </p>
            <div style={{ maxWidth: 460, margin: "0 auto", position: "relative" }}>
              <span style={{
                position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)",
                fontSize: 14, pointerEvents: "none", color: "rgba(255,255,255,0.4)",
              }}>🔍</span>
              <input
                type="text"
                placeholder="Search steps, phases, scripts..."
                value={searchQ}
                onChange={e => { setSearchQ(e.target.value); if (e.target.value) setShowAll(false); }}
                style={{
                  width: "100%", padding: "12px 16px 12px 42px",
                  background: "rgba(255,255,255,0.09)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 99, fontSize: 13,
                  color: "#fff", fontFamily: "monospace",
                  backdropFilter: "blur(8px)", transition: "all 0.2s",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── STAGE TABS ── */}
        <div className="no-print" style={{
          background: B.white, borderBottom: `1px solid ${B.gray200}`,
          overflowX: "auto", WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}>
          <div style={{ display: "flex", padding: "0 16px", minWidth: "max-content" }}>
            {stages.map(s => {
              const active = !allOpen && activeStage === s.id;
              return (
                <button key={s.id}
                  onClick={() => { setShowAll(false); setSearchQ(""); setActiveStage(s.id); }}
                  style={{
                    background: "transparent", border: "none",
                    borderBottom: `3px solid ${active ? s.color : "transparent"}`,
                    padding: "14px 16px", cursor: "pointer",
                    fontSize: 11.5, fontWeight: 700,
                    color: active ? s.color : B.gray400,
                    fontFamily: "monospace", letterSpacing: "0.06em",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.18s", whiteSpace: "nowrap",
                  }}
                >
                  <span>{s.icon}</span>
                  <span>{s.label.toUpperCase()}</span>
                </button>
              );
            })}
            <button
              onClick={() => { setShowAll(true); setSearchQ(""); }}
              style={{
                background: "transparent", border: "none",
                borderBottom: `3px solid ${showAll ? B.gold : "transparent"}`,
                padding: "14px 16px", cursor: "pointer",
                fontSize: 11.5, fontWeight: 700,
                color: showAll ? "#7B5E1A" : B.gray400,
                fontFamily: "monospace", letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >☰ ALL STAGES</button>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 16px 60px" }}>

          {/* Progress bar (single stage mode) */}
          {!allOpen && (
            <div className="no-print fade-up" style={{ marginBottom: 28 }}>
              <PipelineProgress activeId={activeStage} />
            </div>
          )}

          {/* Search label */}
          {searchQ && (
            <div style={{
              fontSize: 12, fontFamily: "monospace", color: B.gray400,
              marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>Showing results for:</span>
              <strong style={{ color: B.navy }}>"{searchQ}"</strong>
              <button onClick={() => setSearchQ("")} style={{
                background: "none", border: "none", color: B.gray400,
                cursor: "pointer", fontSize: 12, textDecoration: "underline",
              }}>clear</button>
            </div>
          )}

          {/* Stage cards */}
          {allOpen
            ? stages.map((s, i) => (
                <div key={s.id} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <StageCard stage={s} isActive={true} onToggle={() => {}} searchQ={searchQ} />
                </div>
              ))
            : stages.map((s, i) => (
                <div key={s.id} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <StageCard
                    stage={s}
                    isActive={activeStage === s.id}
                    onToggle={() => setActiveStage(p => p === s.id ? null : s.id)}
                    searchQ=""
                  />
                </div>
              ))
          }
        </div>

        {/* ── FOOTER ── */}
        <div style={{ background: B.white, borderTop: `1px solid ${B.gray200}`, padding: "40px 20px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>

            {/* Rules */}
            <div style={{
              background: B.navyPale, border: `1px solid ${B.navy}1A`,
              borderLeft: `4px solid ${B.navy}`, borderRadius: 12,
              padding: "24px 28px", marginBottom: 20,
            }}>
              <div style={{
                fontSize: 10, fontFamily: "monospace", color: B.navy,
                letterSpacing: "0.18em", fontWeight: 700, marginBottom: 18,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ color: B.gold, fontSize: 12 }}>◆</span>
                NON-NEGOTIABLE RULES — APPLY THROUGHOUT THE ENTIRE PROCESS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px 32px" }}>
                {RULES.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: B.navy, fontSize: 12, width: 18, textAlign: "center", flexShrink: 0, marginTop: 1 }}>{r.icon}</span>
                    <span style={{ fontSize: 13, color: B.gray600, lineHeight: 1.5, fontFamily: "Georgia, serif" }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 36 }}>
              {PRICING.map(p => (
                <div key={p.tier} style={{
                  background: p.recommended ? B.goldPale : B.offWhite,
                  border: `1.5px solid ${p.recommended ? B.gold : B.gray200}`,
                  borderRadius: 10, padding: "20px 16px", textAlign: "center",
                  position: "relative",
                }}>
                  {p.recommended && (
                    <div style={{
                      position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)",
                      background: B.gold, color: B.navyDark,
                      fontSize: 9, fontWeight: 800, fontFamily: "monospace",
                      padding: "3px 11px", borderRadius: 99,
                      letterSpacing: "0.08em", whiteSpace: "nowrap",
                    }}>⭐ RECOMMENDED</div>
                  )}
                  <div style={{
                    fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                    color: p.recommended ? "#7B5E1A" : B.gray400,
                    letterSpacing: "0.1em", marginBottom: 6,
                  }}>
                    {p.tier.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: B.gray800, fontFamily: "Georgia, serif", marginBottom: 4 }}>
                    {p.price}
                  </div>
                  <div style={{ fontSize: 11, color: B.gray400, fontFamily: "monospace" }}>{p.note}</div>
                  <div style={{ fontSize: 10, color: B.gray400, marginTop: 6 }}>Klarna available</div>
                </div>
              ))}
            </div>

            {/* Branding */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 12,
              borderTop: `1px solid ${B.gray200}`, paddingTop: 24,
            }}>
              <img src={LOGO_BLUE} alt="Superior Career Services" style={{ height: 30, objectFit: "contain" }}
                onError={e => { e.target.style.display="none"; }} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: B.gray400 }}>
                  superiorcareerservices.llc · David Stevenson, CEO & Founder
                </div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: B.gray400 }}>
                  Tampa Bay, FL · CONFIDENTIAL · v2.2 · Q2 2026
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
