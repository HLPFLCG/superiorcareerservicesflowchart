import { useState, useEffect, useRef } from "react";

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  navy:       "#0D1F3C",
  navyMid:    "#1B3A6B",
  navyLight:  "#2A5298",
  gold:       "#C9A84C",
  goldLight:  "#E8C96A",
  goldPale:   "#F7F0DC",
  cream:      "#FAF7F0",
  white:      "#FFFFFF",
  dark:       "#0A0F1A",
  slate:      "#4A6380",
  slateLight: "#7A9CC5",
  green:      "#1A6B3A",
  greenLight: "#E8F5EE",
  red:        "#B03030",
  redLight:   "#FDECEA",
  purple:     "#5A1A6B",
  amber:      "#7B5E1A",
  amberLight: "#F5E9C8",
  muted:      "rgba(255,255,255,0.06)",
  border:     "rgba(201,168,76,0.2)",
  glass:      "rgba(13,31,60,0.7)",
};

// ─── STAGE DATA ──────────────────────────────────────────────────────────────
const stages = [
  {
    id: "outreach", label: "OUTREACH", icon: "🔍", num: "01",
    color: C.navyMid, accent: C.slateLight, bg: "rgba(27,58,107,0.08)",
    title: "LinkedIn / Facebook / B2B Outreach",
    description: "Identify and connect with qualified senior professionals actively in transition.",
    kpi: "Target: 20 connections/week",
    steps: [
      {
        label: "Identify Prospect",
        tag: "TARGETING",
        detail: "Open to Work badge + laid-off senior professional (Dir, VP, Sr. Manager). Industries: Tech, Finance, Healthcare, Defense. Use Sales Navigator filters.",
        tip: "Look for profiles updated in last 30 days with Open to Work"
      },
      {
        label: "Connection Request (300 chars)",
        tag: "OUTREACH",
        detail: "Reference their post, recent layoff, mutual connection, or specific achievement. Never pitch in Message 1. Personal profile only — NEVER the company page.",
        tip: "Personalization is the only variable that moves acceptance rates"
      },
      {
        label: "Connection Accepted?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Send Message 2 (3–4 days later)",
        no: "Move On — do not follow up on unaccepted requests"
      },
    ]
  },
  {
    id: "nurture", label: "NURTURE", icon: "💬", num: "02",
    color: "#2C5F9E", accent: "#7AAAD8", bg: "rgba(44,95,158,0.08)",
    title: "Message Sequence (3-Level Pain Framework)",
    description: "Guide the prospect through three escalating pain levels before any offer.",
    kpi: "Target: 40% reply rate on Message 2",
    steps: [
      {
        label: "Message 2 — Value Add (Day 3–4)",
        tag: "PAIN LVL 1–3",
        detail: "Surface Pain (Level 1): acknowledge their search frustration.\nOrganizational Pain (Level 2): wondering if skills are still relevant.\nPersonal Pain (Level 3): the 2am feeling. End with a genuine question — no pitch.",
        tip: "Never pitch in Message 2. Build rapport only."
      },
      {
        label: "Prospect Responds?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Engage genuinely — answer their question, build rapport",
        no: "Send Message 3 after 4–5 days"
      },
      {
        label: "Message 3 — Soft CTA",
        tag: "SOCIAL PROOF",
        detail: "Share social proof (Director case study, 35% salary increase). Present the 90-day cost of inaction. Offer 15-minute no-obligation calendar call. Include Calendly link.",
        tip: "The cost-of-inaction frame is the most powerful tool in this sequence"
      },
      {
        label: "Engages with CTA?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Send Client Readiness Checklist + Calendly",
        no: "Final Message: graceful exit, leave door open. Move to nurture sequence."
      },
    ]
  },
  {
    id: "qualify", label: "QUALIFY", icon: "📋", num: "03",
    color: C.amber, accent: C.goldLight, bg: "rgba(123,94,26,0.08)",
    title: "Pre-Consultation Qualification",
    description: "Prime the prospect psychologically before the call through the checklist ritual.",
    kpi: "Target: 80% checklist completion rate",
    steps: [
      {
        label: "Send Client Readiness Checklist",
        tag: "PRIMING",
        detail: "5 yes/no statements. Psychological priming mechanism — not an intake form. Prospects who complete it self-select as committed and close at significantly higher rates.",
        tip: "This is a commitment device, not an intake form"
      },
      {
        label: "Request Current Resume",
        tag: "RESEARCH",
        detail: "Ask for resume alongside checklist. Review before the call to personalize discovery questions.",
        tip: "Pre-call research is the difference between a conversation and a consultation"
      },
      {
        label: "Checklist Completed?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Consultation Confirmed — send reminder 2 hours before",
        no: "Send reminder. If still not completed, proceed but treat as lower-commitment prospect."
      },
    ]
  },
  {
    id: "consultation", label: "CONSULT", icon: "🎯", num: "04",
    color: C.green, accent: "#4CAF7D", bg: "rgba(26,107,58,0.08)",
    title: "The Sales Consultation (45 Minutes)",
    description: "A structured 5-phase consultation that converts discovery into commitment.",
    kpi: "Target: 30% same-day close rate",
    steps: [
      {
        label: "Phase 1: Upfront Agreement (Min 1–3)",
        tag: "FRAME",
        detail: "\"My only goal here is to understand your situation and share how I work — then you decide if it's the right fit. Fair?\" Remove all pressure. Wait for agreement.",
        tip: "Never proceed without explicit verbal agreement at this stage"
      },
      {
        label: "Phase 2: Discovery — FORM/FORD (Min 3–15)",
        tag: "DISCOVERY",
        detail: "Family, Occupation, Recreation, Dreams/Money. Build rapport. Listen for pain triggers. Key questions: role history, what they've tried, feedback received, confidence level (1–10), what happens at month 4–6.",
        tip: "Silence is a tool. Ask the question — then wait."
      },
      {
        label: "Phase 3: Pain Amplification (Min 15–25)",
        tag: "⚠ CRITICAL",
        detail: "DO NOT RUSH. DO NOT SKIP. DO NOT FIX YET.\n\nLevel 1: \"You've sent [X] applications and heard nothing back.\"\nLevel 2: \"Have you started to wonder if your skills aren't as relevant?\"\nLevel 3: \"What does it feel like at 2am? When you look at your family — do you feel like you're letting them down?\"\n\nLet them go there. Let silence hang. Then: \"I hear you. You're not alone.\"",
        tip: "The close happens here, in the pain. Not in Phase 5."
      },
      {
        label: "Phase 4: Present Transformation (Min 25–35)",
        tag: "SOLUTION",
        detail: "Transition: \"You're using an old playbook in a new game.\"\n\nWalk through each of the 4 steps and connect each directly to their specific pain:\n• Step 1 — Mindshift (addresses feeling stuck)\n• Step 2 — Messaging (addresses zero callbacks)\n• Step 3 — 3-Channel Search (stops scattershot applying)\n• Step 4 — Interview Framework (ends ambiguous outcomes)",
        tip: "Connect every feature back to a pain they personally expressed"
      },
      {
        label: "Phase 5: Pricing & Close (Min 35–45)",
        tag: "CLOSE",
        detail: "Show all 3 tiers. Recommend one with a personalized reason.\n\nSilver $4K | Gold $6K (⭐ Recommend) | Platinum $7.5K\n\nROI frame: \"If this gets you $20K–$30K higher — which is typical — it pays for itself in 6–8 weeks.\"\n\nIntroduce Klarna BEFORE any objection. Closing: \"I have availability starting [date]. Does this feel like the right next step?\"",
        tip: "Present Klarna proactively. Never wait for a price objection."
      },
    ]
  },
  {
    id: "close", label: "CLOSE", icon: "✅", num: "05",
    color: "#1A5A3A", accent: "#4CAF7D", bg: "rgba(26,90,58,0.08)",
    title: "Close or Handle Objection",
    description: "Commit to a decision path and resolve resistance systematically.",
    kpi: "Target: < 3 objections per close",
    steps: [
      {
        label: "Prospect Ready to Commit?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Take payment. Start engagement. Begin Step 1 at first session.",
        no: "Handle objection using objection reference (Section 11)"
      },
      {
        label: "Objection Handled?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Close the sale — collect payment, confirm start date",
        no: "Enter follow-up sequence (Day 2, Day 5, Day 10 final)"
      },
    ]
  },
  {
    id: "followup", label: "FOLLOW-UP", icon: "🔄", num: "06",
    color: C.purple, accent: "#A06ABB", bg: "rgba(90,26,107,0.08)",
    title: "Post-Consultation Follow-Up Sequence",
    description: "A 10-day structured sequence to convert warm prospects who didn't close same-day.",
    kpi: "Target: 15% conversion from sequence",
    steps: [
      {
        label: "Same Day (Within 2 Hours)",
        tag: "DAY 0",
        detail: "Thank them. Reference one specific thing they shared. Send proposal for the discussed tier. Attach checklist if not yet received.",
        tip: "Speed signals seriousness. Two hours is the max window."
      },
      {
        label: "Day 2 — Check-In",
        tag: "DAY 2",
        detail: "\"What questions can I answer for you?\" — position as a helper, not a closer.",
        tip: "Never ask if they've decided. Ask what questions you can answer."
      },
      {
        label: "Day 5 — Direct & Gentle",
        tag: "DAY 5",
        detail: "Cost of inaction reminder. \"Every week costs thousands in lost salary.\" Calendly link included.",
        tip: "Reintroduce urgency without pressure"
      },
      {
        label: "Day 10 — Final",
        tag: "DAY 10",
        detail: "\"Last note from me. Keeping a spot open until [date].\" After that, move to long-term nurture. Genuinely wish them well.",
        tip: "Genuine goodwill at the final touch keeps the door open permanently"
      },
      {
        label: "Client Enrolled?",
        tag: "DECISION",
        detail: "",
        decision: true,
        yes: "Closed Won — begin engagement, update CRM to Stage 7",
        no: "Closed Lost or Nurture — update CRM (Stage 8 or 9). Follow up in 30–60 days."
      },
    ]
  },
];

const RULES = [
  { icon: "✗", text: "Never use 'resume' in cold outreach" },
  { icon: "👤", text: "Always outreach from David's personal profile" },
  { icon: "⚡", text: "Respond to engaged leads within 2 hours" },
  { icon: "💳", text: "Mention Klarna before any objection arises" },
  { icon: "📊", text: "Move through all 3 pain levels — never skip" },
  { icon: "➡", text: "Every message ends with ONE clear next step" },
  { icon: "✍", text: "Personalize every message — no template content" },
  { icon: "$", text: "Never apologize for the pricing" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Tag({ label, color }) {
  const isWarning = label === "⚠ CRITICAL";
  return (
    <span style={{
      fontSize: 9,
      fontFamily: "monospace",
      letterSpacing: "0.12em",
      fontWeight: 800,
      padding: "2px 7px",
      borderRadius: 3,
      background: isWarning ? "rgba(176,48,48,0.15)" : "rgba(201,168,76,0.12)",
      color: isWarning ? "#E05050" : C.goldLight,
      border: `1px solid ${isWarning ? "rgba(176,48,48,0.3)" : "rgba(201,168,76,0.25)"}`,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function DecisionBranch({ step, visible }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 10,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-8px)",
      transition: "opacity 0.25s, transform 0.25s",
      pointerEvents: visible ? "all" : "none",
    }}>
      {[
        { label: "YES", text: step.yes, bg: "rgba(26,107,58,0.12)", border: "rgba(76,175,125,0.4)", color: "#4CAF7D", icon: "✓" },
        { label: "NO", text: step.no, bg: "rgba(176,48,48,0.1)", border: "rgba(176,48,48,0.3)", color: "#E05050", icon: "✗" },
      ].map(b => (
        <div key={b.label} style={{
          background: b.bg,
          border: `1px solid ${b.border}`,
          borderRadius: 8,
          padding: "10px 12px",
        }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", fontWeight: 800, color: b.color, marginBottom: 4, letterSpacing: "0.1em" }}>
            {b.icon} {b.label}
          </div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            {b.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepCard({ step, stageColor, index }) {
  const [open, setOpen] = useState(false);
  const isDecision = !!step.decision;
  const hasDetail = !!(step.detail || isDecision);

  return (
    <div
      onClick={() => hasDetail && setOpen(o => !o)}
      style={{
        background: open
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${open
          ? (isDecision ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.15)")
          : "rgba(255,255,255,0.08)"}`,
        borderLeft: `3px solid ${isDecision ? C.gold : stageColor}`,
        borderRadius: 10,
        padding: "12px 16px",
        cursor: hasDetail ? "pointer" : "default",
        transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
        boxShadow: open ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Step index bubble */}
        <div style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
          background: isDecision ? "rgba(201,168,76,0.15)" : `${stageColor}33`,
          border: `1.5px solid ${isDecision ? C.gold : stageColor}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, fontFamily: "monospace", fontWeight: 800,
          color: isDecision ? C.gold : "rgba(255,255,255,0.7)",
        }}>
          {isDecision ? "⬦" : "▸"}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: 13.5,
              fontWeight: 700,
              color: isDecision ? C.goldLight : C.white,
              lineHeight: 1.3,
            }}>
              {step.label}
            </span>
            {step.tag && <Tag label={step.tag} />}
          </div>
          {step.tip && !open && (
            <div style={{ fontSize: 11, color: C.slateLight, marginTop: 2, fontStyle: "italic" }}>
              {step.tip}
            </div>
          )}
        </div>

        {hasDetail && (
          <div style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 10,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}>▼</div>
        )}
      </div>

      {/* Expanded content */}
      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {step.detail && (
            <p style={{
              fontSize: 12.5,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              margin: "0 0 8px",
              whiteSpace: "pre-line",
              fontFamily: "Georgia, serif",
            }}>
              {step.detail}
            </p>
          )}
          {step.tip && (
            <div style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 6,
              padding: "8px 12px",
              fontSize: 11.5,
              color: C.goldLight,
              fontStyle: "italic",
            }}>
              💡 {step.tip}
            </div>
          )}
          {isDecision && <DecisionBranch step={step} visible={true} />}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ completedStages, total }) {
  const pct = Math.round((completedStages / total) * 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: C.slateLight, letterSpacing: "0.15em" }}>
          PIPELINE PROGRESS
        </span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: C.gold }}>
          {completedStages}/{total} STAGES
        </span>
      </div>
      <div style={{
        height: 3,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 99,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${C.navyLight}, ${C.gold})`,
          borderRadius: 99,
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

function StageCard({ stage, index, total, isActive, onToggle, searchQuery }) {
  const matchesSearch = searchQuery
    ? stage.steps.some(s =>
        s.label.toLowerCase().includes(searchQuery) ||
        (s.detail && s.detail.toLowerCase().includes(searchQuery))
      ) || stage.title.toLowerCase().includes(searchQuery)
    : true;

  if (!matchesSearch) return null;

  return (
    <div style={{ marginBottom: isActive ? 24 : 8 }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${stage.color}EE, ${stage.color}99)`
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${isActive ? stage.color : "rgba(255,255,255,0.08)"}`,
          borderRadius: isActive ? "12px 12px 0 0" : 12,
          padding: "14px 20px",
          cursor: "pointer",
          transition: "all 0.25s",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Stage number */}
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontFamily: "monospace", fontWeight: 800,
          color: isActive ? C.white : C.slateLight,
          letterSpacing: "0.05em",
          border: `1px solid ${isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
        }}>
          {stage.num}
        </div>

        {/* Icon */}
        <span style={{ fontSize: 20 }}>{stage.icon}</span>

        {/* Title block */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.18em", fontWeight: 700, color: isActive ? C.goldLight : C.slate, marginBottom: 2 }}>
            {stage.label}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? C.white : "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif" }}>
            {stage.title}
          </div>
        </div>

        {/* KPI badge */}
        <div style={{
          display: "none",
          ...(isActive ? {
            display: "block",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 10,
            fontFamily: "monospace",
            color: C.goldLight,
            whiteSpace: "nowrap",
          } : {})
        }}>
          {isActive && stage.kpi}
        </div>

        {/* Toggle arrow */}
        <div style={{
          color: isActive ? C.goldLight : "rgba(255,255,255,0.2)",
          fontSize: 12,
          transform: isActive ? "rotate(180deg)" : "none",
          transition: "transform 0.25s",
          flexShrink: 0,
        }}>
          ▼
        </div>
      </div>

      {/* Steps panel */}
      {isActive && (
        <div style={{
          background: "rgba(13,31,60,0.6)",
          border: `1px solid ${stage.color}44`,
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          padding: "16px",
          backdropFilter: "blur(8px)",
        }}>
          {/* Description */}
          <p style={{
            fontSize: 12.5,
            color: C.slateLight,
            margin: "0 0 14px",
            fontStyle: "italic",
            lineHeight: 1.6,
          }}>
            {stage.description}
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stage.steps.map((step, i) => (
              <StepCard key={i} step={step} stageColor={stage.color} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Connector */}
      {index < total - 1 && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 28,
          opacity: 0.4,
        }}>
          <div style={{ width: 1, flex: 1, background: C.gold }} />
          <div style={{
            width: 0, height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: `6px solid ${C.gold}`,
          }} />
        </div>
      )}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function SalesFlowchart() {
  const [activeStage, setActiveStage] = useState("outreach");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllMode, setShowAllMode] = useState(false);

  const completedIndex = stages.findIndex(s => s.id === activeStage);

  const handleToggle = (id) => {
    if (showAllMode) return;
    setActiveStage(prev => prev === id ? null : id);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 20% 0%, rgba(27,58,107,0.4) 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 100%, rgba(90,26,107,0.2) 0%, transparent 60%),
                   ${C.dark}`,
      fontFamily: "Georgia, 'Times New Roman', serif",
      padding: "0 0 60px",
      boxSizing: "border-box",
    }}>

      {/* ── TOP BAND ── */}
      <div style={{
        background: "rgba(201,168,76,0.06)",
        borderBottom: `1px solid ${C.border}`,
        padding: "10px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: C.gold, letterSpacing: "0.2em" }}>
          SUPERIOR CAREER SERVICES & COMPANY LLC
        </span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: C.slate }}>
          CONFIDENTIAL · v2.1 · Q2 2026
        </span>
      </div>

      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", padding: "48px 24px 40px" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(201,168,76,0.1)",
          border: `1px solid ${C.border}`,
          borderRadius: 99,
          padding: "5px 16px",
          fontSize: 10,
          fontFamily: "monospace",
          color: C.gold,
          letterSpacing: "0.2em",
          marginBottom: 20,
        }}>
          ◆ SALES PROCESS MANUAL ◆
        </div>
        <h1 style={{
          color: C.white,
          fontSize: "clamp(26px, 5vw, 42px)",
          fontWeight: 700,
          margin: "0 0 8px",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}>
          End-to-End Sales<br />
          <span style={{ color: C.gold }}>Process Flowchart</span>
        </h1>
        <p style={{ color: C.slateLight, fontSize: 14, margin: "0 0 32px", lineHeight: 1.6 }}>
          David Stevenson · Tampa Bay, FL · Career Coaching for Senior Professionals
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "0 auto 32px" }} />

        {/* Search */}
        <div style={{ maxWidth: 400, margin: "0 auto", position: "relative" }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: C.slate, pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search steps, phases, scripts..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value.toLowerCase());
              if (e.target.value) setShowAllMode(true);
              else setShowAllMode(false);
            }}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid rgba(201,168,76,0.3)`,
              borderRadius: 99,
              padding: "10px 16px 10px 40px",
              fontSize: 13,
              color: C.white,
              fontFamily: "monospace",
              outline: "none",
              boxSizing: "border-box",
              letterSpacing: "0.02em",
            }}
          />
        </div>
      </div>

      {/* ── STAGE NAV PILLS ── */}
      {!showAllMode && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          padding: "0 16px 32px",
          maxWidth: 760,
          margin: "0 auto",
        }}>
          {stages.map(s => {
            const isActive = activeStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(isActive ? null : s.id)}
                style={{
                  background: isActive ? s.color : "rgba(255,255,255,0.05)",
                  color: isActive ? C.white : C.slateLight,
                  border: `1px solid ${isActive ? s.color : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 99,
                  padding: "7px 18px",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowAllMode(true)}
            style={{
              background: showAllMode ? C.gold : "rgba(255,255,255,0.05)",
              color: showAllMode ? C.dark : C.slateLight,
              border: `1px solid ${showAllMode ? C.gold : "rgba(255,255,255,0.1)"}`,
              borderRadius: 99,
              padding: "7px 18px",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            ☰ ALL STAGES
          </button>
        </div>
      )}

      {showAllMode && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <button
            onClick={() => { setShowAllMode(false); setSearchQuery(""); }}
            style={{
              background: "transparent",
              border: `1px solid rgba(201,168,76,0.3)`,
              color: C.gold,
              borderRadius: 99,
              padding: "6px 18px",
              fontSize: 11,
              fontFamily: "monospace",
              cursor: "pointer",
            }}
          >
            ← BACK TO STAGE VIEW
          </button>
        </div>
      )}

      {/* ── MAIN FLOW ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>
        {!showAllMode && (
          <ProgressBar completedStages={Math.max(0, completedIndex + 1)} total={stages.length} />
        )}

        {(showAllMode ? stages : stages.filter(s => s.id === activeStage || activeStage === null)).map((stage, i, arr) => (
          <StageCard
            key={stage.id}
            stage={stage}
            index={i}
            total={arr.length}
            isActive={showAllMode ? true : activeStage === stage.id}
            onToggle={() => handleToggle(stage.id)}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* ── RULES FOOTER ── */}
      <div style={{ maxWidth: 720, margin: "40px auto 0", padding: "0 16px" }}>
        <div style={{
          background: "rgba(201,168,76,0.06)",
          border: `1px solid rgba(201,168,76,0.2)`,
          borderRadius: 14,
          padding: "24px 28px",
        }}>
          <div style={{
            fontSize: 10,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            color: C.gold,
            marginBottom: 20,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{
              display: "inline-block",
              width: 6, height: 6, borderRadius: "50%",
              background: C.gold,
              boxShadow: `0 0 8px ${C.gold}`,
            }} />
            NON-NEGOTIABLE RULES — APPLY THROUGHOUT
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px 32px" }}>
            {RULES.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{
                  color: C.gold,
                  fontSize: 12,
                  flexShrink: 0,
                  width: 18,
                  textAlign: "center",
                  marginTop: 1,
                }}>
                  {r.icon}
                </span>
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, fontFamily: "Georgia, serif" }}>
                  {r.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Quick Ref */}
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { tier: "Silver", price: "$4,000", color: "#888", tag: "" },
            { tier: "Gold", price: "$6,000", color: C.gold, tag: "⭐ RECOMMEND" },
            { tier: "Platinum", price: "$7,500", color: "#B8C8E8", tag: "" },
          ].map(t => (
            <div key={t.tier} style={{
              background: t.tag ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${t.tag ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 10,
              padding: "14px 16px",
              textAlign: "center",
            }}>
              {t.tag && (
                <div style={{ fontSize: 9, fontFamily: "monospace", color: C.gold, marginBottom: 6, letterSpacing: "0.1em" }}>
                  {t.tag}
                </div>
              )}
              <div style={{ fontSize: 12, fontFamily: "monospace", color: t.color, fontWeight: 700, marginBottom: 2 }}>
                {t.tier}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: "Georgia, serif" }}>
                {t.price}
              </div>
              <div style={{ fontSize: 9, color: C.slate, marginTop: 4 }}>Klarna available</div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: C.slate, fontSize: 10, marginTop: 28, fontFamily: "monospace", letterSpacing: "0.08em" }}>
          superiorcareerservices.llc · David Stevenson, CEO & Founder · Tampa Bay, FL
        </p>
      </div>
    </div>
  );
}
