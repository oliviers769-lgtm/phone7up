import { useState, useEffect, useRef } from "react";

const C = {
  bg:     "#050a14",
  cyan:   "#00d4ff",
  violet: "#a855f7",
  green:  "#00ff88",
  yellow: "#ffd700",
  orange: "#f97316",
  white:  "#f0f8ff",
  gray:   "#8899aa",
};

const CRYPTOS = [
  {
    id: "btc", label: "Bitcoin", symbol: "BTC", color: "#f7931a",
    address: "bc1qnsh5efyjdrglwx6ymc8dt8xhfzm4umtayh02ra",
    qr: "/qr_bitcoin.jpeg", icon: "₿",
  },
  {
    id: "xmr", label: "Monero", symbol: "XMR", color: "#ff6600",
    address: "BbPhxXCx1pXsgMqjUsGGZeefRSCc3oW2gJdFrLmYX5Mm",
    qr: "/qr_xmr.jpeg", icon: "ɱ",
  },
  {
    id: "usdt", label: "USDT TRC20", symbol: "USDT", color: "#26a17b",
    address: "TQR2jHdwvj7F3S2dNUzt5vWzWattEdgFMe",
    qr: "/qr_usdt.jpeg", icon: "₮",
  },
  {
    id: "ltc", label: "Litecoin", symbol: "LTC", color: "#a6a9aa",
    address: "ltc1qhxmg5zsacl8cxsn4qtss27axx2n8s9q9apxck8",
    qr: "/qr_ltc.jpeg", icon: "Ł",
  },
];

const PRODUITS = [
  { id: "fantomm",  icon: "📱", label: "Smartphone Fantomm", desc: "Smartphone sécurisé",           prix: 990,  color: C.cyan },
  { id: "smoke",    icon: "💻", label: "Ordinateur Smoke",   desc: "Ordinateur sécurisé",           prix: 1190, color: C.violet },
  { id: "routeur",  icon: "📡", label: "Routeur 4G",         desc: "Connexion anonyme dédiée",      prix: 50,   color: C.green },
  { id: "pack",     icon: "🛡️", label: "Pack Complet",       desc: "Fantomm + Smoke + Routeur",     prix: 1900, color: C.yellow },
  { id: "reparation", icon: "🔧", label: "Réparation",       desc: "Réparation téléphone",          prix: null, color: C.orange },
];

/* ─── GALAXY BACKGROUND ─── */
function GalaxyBg() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, delay: Math.random() * 4, dur: Math.random() * 3 + 2,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.15} 50%{opacity:1} }
        @keyframes drift1  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
        @keyframes drift2  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,30px) scale(1.2)} }
      `}</style>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/fond.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.45 }} />
      <div style={{ position: "absolute", inset: 0, background: `${C.bg}bb` }} />
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", borderRadius: "50%", width: s.size, height: s.size, background: C.white,
          left: `${s.x}%`, top: `${s.y}%`, animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`,
        }} />
      ))}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}18 0%, transparent 70%)`, top: "10%", left: "20%", animation: "drift1 12s infinite ease-in-out" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.violet}18 0%, transparent 70%)`, bottom: "15%", right: "15%", animation: "drift2 15s infinite ease-in-out" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.cyan}08 1px, transparent 1px), linear-gradient(90deg, ${C.cyan}08 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ onNav }) {
  const [open, setOpen] = useState(false);
  const items = [
    { label: "Accueil",       id: "hero" },
    { label: "Fantomm Smoke", id: "fantomm" },
    { label: "Services",      id: "services" },
    { label: "Galerie",       id: "galerie" },
    { label: "Contact",       id: "contact" },
  ];
  const go = (id) => { setOpen(false); onNav(id); };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: `${C.bg}ee`, backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.cyan}33`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", height: 100,
    }}>
      <style>{`
        @keyframes nameGlow {
          0%,100% { text-shadow: 0 0 10px ${C.cyan}88, 0 0 20px ${C.cyan}44; }
          50%      { text-shadow: 0 0 24px ${C.violet}bb, 0 0 48px ${C.cyan}66; }
        }
      `}</style>
      <video src="/logo_007.mp4" autoPlay loop muted playsInline
        style={{ height: 90, width: "auto", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}
        onClick={() => onNav("hero")}
      />
      <span onClick={() => onNav("hero")} style={{
        fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(18px,3.5vw,34px)",
        fontWeight: 900, letterSpacing: 4, cursor: "pointer", flex: 1, textAlign: "center",
        background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        animation: "nameGlow 3s ease-in-out infinite", userSelect: "none",
      }}>PHONE 7 UP</span>
      <button onClick={() => setOpen(!open)} style={{
        background: `${C.cyan}22`, border: `1px solid ${C.cyan}55`,
        borderRadius: 8, padding: "8px 14px", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 5, flexShrink: 0,
      }}>
        {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 24, height: 2, background: C.cyan, borderRadius: 2 }} />)}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: 100, left: 0, right: 0,
          background: `${C.bg}f5`, backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.cyan}33`,
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          {items.map(it => (
            <button key={it.id} onClick={() => go(it.id)} style={{
              background: "none", border: "none", color: C.white,
              fontFamily: "'Exo 2', sans-serif", fontSize: 16, fontWeight: 600,
              padding: "16px 40px", cursor: "pointer", width: "100%",
              borderBottom: `1px solid ${C.cyan}22`, transition: "color .2s",
            }}
              onMouseEnter={e => e.target.style.color = C.cyan}
              onMouseLeave={e => e.target.style.color = C.white}
            >{it.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── SECTION WRAPPER ─── */
function Sec({ id, children, style }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      position: "relative", zIndex: 1,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: "opacity .7s ease, transform .7s ease", ...style,
    }}>{children}</section>
  );
}

/* ─── SECTION TITLE ─── */
function SecTitle({ title, sub, color }) {
  const words = title.split(" ");
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, margin: 0, letterSpacing: 3, color: C.white }}>
        {words.map((w, i) => <span key={i} style={{ color: i === words.length - 1 ? (color || C.cyan) : C.white }}>{w} </span>)}
      </h2>
      {sub && <p style={{ color: C.gray, fontFamily: "'Exo 2'", marginTop: 8 }}>{sub}</p>}
      <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.cyan},${C.violet})`, margin: "12px auto 0" }} />
    </div>
  );
}

/* ─── GLOW CARD ─── */
function GlowCard({ children, color, style }) {
  const [hov, setHov] = useState(false);
  const c = color || C.cyan;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: `${C.bg}cc`, border: `1px solid ${hov ? c : c + "44"}`,
        borderRadius: 16, padding: 28, boxShadow: hov ? `0 0 32px ${c}44` : "none",
        transition: "all .3s ease", ...style,
      }}
    >{children}</div>
  );
}

/* ─── VIDEO MODAL ─── */
function VideoModal({ src, onClose }) {
  const ref = useRef();
  useEffect(() => { if (ref.current) { ref.current.currentTime = 0; ref.current.play(); } }, []);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 28, background: "none", border: "none", color: C.white, fontSize: 36, cursor: "pointer" }}>✕</button>
      <video ref={ref} src={src} controls autoPlay onClick={e => e.stopPropagation()}
        style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: 16, boxShadow: `0 0 60px ${C.cyan}44` }} />
    </div>
  );
}

/* ─── COMMANDE CRYPTO MODAL ─── */
function CommandeModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [produit, setProduit] = useState(null);
  const [crypto, setCrypto] = useState(null);
  const [form, setForm] = useState({ nom: "", whatsapp: "" });
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(crypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waMessage = encodeURIComponent(
    `Bonjour, j'ai effectué un paiement ${crypto?.label || ""} pour : ${produit?.label || ""}${produit?.prix ? " — " + produit.prix + "€" : ""}\nNom : ${form.nom}\nEn attente de confirmation.`
  );

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 998,
      background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: `linear-gradient(145deg, ${C.bg}, #0a1628)`,
        border: `1px solid ${C.orange}55`, borderRadius: 20, padding: "32px 28px",
        width: "100%", maxWidth: 480, boxShadow: `0 0 60px ${C.orange}22`,
        position: "relative", maxHeight: "90vh", overflowY: "auto",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: C.gray, fontSize: 24, cursor: "pointer" }}>✕</button>

        <h2 style={{ fontFamily: "'Orbitron'", color: C.orange, fontSize: 18, letterSpacing: 2, margin: "0 0 8px", textAlign: "center" }}>
          ₿ COMMANDER EN CRYPTO
        </h2>

        {/* Stepper */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 16 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: step >= n ? C.orange : `${C.gray}33`,
                border: `2px solid ${step >= n ? C.orange : C.gray + "55"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Orbitron'", fontSize: 12, fontWeight: 700,
                color: step >= n ? C.bg : C.gray, transition: "all .3s",
              }}>{n}</div>
              {n < 4 && <div style={{ width: 20, height: 2, background: step > n ? C.orange : `${C.gray}33`, transition: "all .3s" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 24 }}>
          {["Produit","Crypto","Contact","Paiement"].map((l, i) => (
            <span key={l} style={{ fontFamily: "'Exo 2'", fontSize: 10, color: step >= i+1 ? C.orange : C.gray, letterSpacing: 1 }}>{l}</span>
          ))}
        </div>

        {/* ─── ÉTAPE 1 : Produit ─── */}
        {step === 1 && (
          <div>
            <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 14, textAlign: "center", marginBottom: 16 }}>Choisissez votre produit</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PRODUITS.map(p => (
                <button key={p.id} onClick={() => setProduit(p)} style={{
                  background: produit?.id === p.id ? `${p.color}22` : `${C.bg}99`,
                  border: `2px solid ${produit?.id === p.id ? p.color : p.color + "44"}`,
                  borderRadius: 12, padding: "12px 18px",
                  display: "flex", alignItems: "center", gap: 12,
                  cursor: "pointer", transition: "all .2s", textAlign: "left",
                }}>
                  <span style={{ fontSize: 26 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Orbitron'", color: p.color, fontSize: 13, letterSpacing: 1 }}>{p.label}</div>
                    <div style={{ fontFamily: "'Exo 2'", color: C.gray, fontSize: 11, marginTop: 2 }}>{p.desc}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {p.prix ? <span style={{ fontFamily: "'Orbitron'", color: p.color, fontSize: 14, fontWeight: 700 }}>{p.prix}€</span>
                      : <span style={{ fontFamily: "'Exo 2'", color: C.gray, fontSize: 11 }}>Sur devis</span>}
                    {produit?.id === p.id && <div style={{ color: p.color, fontSize: 18, marginTop: 2 }}>✓</div>}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => produit && setStep(2)} style={{
              marginTop: 20, width: "100%",
              background: produit ? `linear-gradient(135deg,${C.orange},${C.yellow})` : `${C.gray}33`,
              border: "none", borderRadius: 12, padding: "13px",
              color: produit ? C.bg : C.gray, fontFamily: "'Orbitron'", fontSize: 14, fontWeight: 700,
              cursor: produit ? "pointer" : "not-allowed", letterSpacing: 1,
            }}>SUIVANT →</button>
          </div>
        )}

        {/* ─── ÉTAPE 2 : Choix crypto ─── */}
        {step === 2 && (
          <div>
            <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 14, textAlign: "center", marginBottom: 16 }}>Choisissez votre crypto</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CRYPTOS.map(cr => (
                <button key={cr.id} onClick={() => setCrypto(cr)} style={{
                  background: crypto?.id === cr.id ? `${cr.color}22` : `${C.bg}99`,
                  border: `2px solid ${crypto?.id === cr.id ? cr.color : cr.color + "44"}`,
                  borderRadius: 12, padding: "12px 18px",
                  display: "flex", alignItems: "center", gap: 14,
                  cursor: "pointer", transition: "all .2s",
                }}>
                  <span style={{ fontSize: 28, color: cr.color }}>{cr.icon}</span>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontFamily: "'Orbitron'", color: cr.color, fontSize: 14, letterSpacing: 1 }}>{cr.symbol}</div>
                    <div style={{ fontFamily: "'Exo 2'", color: C.gray, fontSize: 12 }}>{cr.label}</div>
                  </div>
                  {crypto?.id === cr.id && <span style={{ color: cr.color, fontSize: 20 }}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: `${C.gray}22`, border: `1px solid ${C.gray}44`, borderRadius: 12, padding: "13px", color: C.gray, fontFamily: "'Exo 2'", fontSize: 14, cursor: "pointer" }}>← Retour</button>
              <button onClick={() => crypto && setStep(3)} style={{
                flex: 2,
                background: crypto ? `linear-gradient(135deg,${C.orange},${C.yellow})` : `${C.gray}33`,
                border: "none", borderRadius: 12, padding: "13px",
                color: crypto ? C.bg : C.gray, fontFamily: "'Orbitron'", fontSize: 14, fontWeight: 700,
                cursor: crypto ? "pointer" : "not-allowed", letterSpacing: 1,
              }}>SUIVANT →</button>
            </div>
          </div>
        )}

        {/* ─── ÉTAPE 3 : Contact ─── */}
        {step === 3 && (
          <div>
            <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 14, textAlign: "center", marginBottom: 16 }}>Vos coordonnées</p>
            {[
              { name: "nom", placeholder: "Votre prénom", icon: "👤" },
              { name: "whatsapp", placeholder: "Votre WhatsApp (ex: 06...)", icon: "📱" },
            ].map(f => (
              <div key={f.name} style={{ position: "relative", marginBottom: 14 }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>{f.icon}</span>
                <input name={f.name} placeholder={f.placeholder} value={form[f.name]}
                  onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                  style={{
                    width: "100%", background: `${C.bg}99`, border: `1px solid ${C.orange}55`,
                    borderRadius: 10, padding: "13px 16px 13px 44px", color: C.white,
                    fontFamily: "'Exo 2'", fontSize: 14, boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, background: `${C.gray}22`, border: `1px solid ${C.gray}44`, borderRadius: 12, padding: "13px", color: C.gray, fontFamily: "'Exo 2'", fontSize: 14, cursor: "pointer" }}>← Retour</button>
              <button onClick={() => form.nom && form.whatsapp && setStep(4)} style={{
                flex: 2,
                background: form.nom && form.whatsapp ? `linear-gradient(135deg,${C.orange},${C.yellow})` : `${C.gray}33`,
                border: "none", borderRadius: 12, padding: "13px",
                color: form.nom && form.whatsapp ? C.bg : C.gray,
                fontFamily: "'Orbitron'", fontSize: 14, fontWeight: 700,
                cursor: form.nom && form.whatsapp ? "pointer" : "not-allowed", letterSpacing: 1,
              }}>SUIVANT →</button>
            </div>
          </div>
        )}

        {/* ─── ÉTAPE 4 : Paiement ─── */}
        {step === 4 && crypto && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Orbitron'", color: crypto.color, fontSize: 16, margin: "0 0 4px", letterSpacing: 2 }}>
              {crypto.icon} PAIEMENT {crypto.symbol}
            </p>
            <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 13, marginBottom: 16 }}>
              Commande : <span style={{ color: C.white }}>{produit?.label}</span>
              {produit?.prix && <span style={{ color: crypto.color }}> — {produit.prix}€</span>}
            </p>

            {/* QR Code */}
            <div style={{ display: "inline-block", padding: 12, background: C.white, borderRadius: 16, boxShadow: `0 0 32px ${crypto.color}66`, marginBottom: 18 }}>
              <img src={crypto.qr} alt={`QR ${crypto.symbol}`} style={{ width: 175, height: 175, display: "block", borderRadius: 8 }} />
            </div>

            {/* Adresse */}
            <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 12, marginBottom: 6 }}>Adresse {crypto.label}</p>
            <div style={{ background: `${C.bg}99`, border: `1px solid ${crypto.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, wordBreak: "break-all" }}>
              <span style={{ color: C.white, fontFamily: "monospace", fontSize: 12, letterSpacing: 0.5 }}>{crypto.address}</span>
            </div>

            {/* Copier */}
            <button onClick={copyAddress} style={{
              width: "100%", marginBottom: 10,
              background: copied ? `${C.green}33` : `${crypto.color}22`,
              border: `1px solid ${copied ? C.green : crypto.color}`,
              borderRadius: 10, padding: "11px",
              color: copied ? C.green : crypto.color,
              fontFamily: "'Exo 2'", fontSize: 14, fontWeight: 700,
              cursor: "pointer", transition: "all .3s",
            }}>{copied ? "✓ Adresse copiée !" : "📋 Copier l'adresse"}</button>

            {/* Instruction */}
            <div style={{ background: `${C.violet}11`, border: `1px solid ${C.violet}33`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
              <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                📲 Après votre envoi, contactez-nous pour confirmer votre paiement et organiser la livraison.
              </p>
            </div>

            {/* WhatsApp confirmation */}
            <a href={`https://wa.me/33605768568?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", width: "100%", boxSizing: "border-box",
                background: "#25D366", borderRadius: 10, padding: "13px",
                color: "#fff", fontFamily: "'Orbitron'", fontSize: 13,
                fontWeight: 700, textDecoration: "none", letterSpacing: 1, marginBottom: 8,
              }}
            >💬 CONFIRMER SUR WHATSAPP</a>

            <button onClick={() => setStep(3)} style={{ background: "none", border: "none", color: C.gray, fontFamily: "'Exo 2'", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>← Retour</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── HERO ─── */
function Hero({ onFantomm }) {
  const [modal, setModal] = useState(null);
  return (
    <Sec id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
      <style>{`
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes logoGlow  { 0%,100%{filter:drop-shadow(0 0 18px #00d4ff) drop-shadow(0 0 36px #a855f755)} 50%{filter:drop-shadow(0 0 32px #a855f7) drop-shadow(0 0 64px #00d4ff55)} }
        @keyframes btnPulse  { 0%,100%{box-shadow:0 0 24px #a855f755} 50%{box-shadow:0 0 48px #a855f7cc,0 0 80px #a855f744} }
        @keyframes vidGlow   { 0%,100%{box-shadow:0 0 12px #00d4ff44} 50%{box-shadow:0 0 28px #a855f766} }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px,4vw,48px)", marginBottom: 48, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <video src="/vid_gauche.mp4" autoPlay loop muted playsInline onClick={() => setModal("/vid_gauche.mp4")}
            style={{ width: "clamp(100px,14vw,175px)", borderRadius: 14, cursor: "pointer", border: `2px solid ${C.cyan}55`, animation: "vidGlow 3s ease-in-out infinite" }} />
          <span style={{ color: C.cyan, fontFamily: "'Exo 2'", fontSize: 11, letterSpacing: 1, opacity: 0.7 }}>▶ voir</span>
        </div>
        <div style={{ animation: "heroFloat 4s ease-in-out infinite" }}>
          <video src="/logo_produit.mp4" autoPlay loop muted playsInline
            style={{ width: "clamp(200px,30vw,360px)", borderRadius: 24, animation: "logoGlow 3s ease-in-out infinite", border: `2px solid ${C.cyan}55`, display: "block" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <video src="/vid_droite.mp4" autoPlay loop muted playsInline onClick={() => setModal("/vid_droite.mp4")}
            style={{ width: "clamp(100px,14vw,175px)", borderRadius: 14, cursor: "pointer", border: `2px solid ${C.violet}55`, animation: "vidGlow 3s ease-in-out infinite" }} />
          <span style={{ color: C.violet, fontFamily: "'Exo 2'", fontSize: 11, letterSpacing: 1, opacity: 0.7 }}>▶ voir</span>
        </div>
      </div>
      <button onClick={onFantomm} style={{
        background: `linear-gradient(135deg, ${C.violet}55, ${C.violet}22)`, border: `2px solid ${C.violet}`,
        borderRadius: 50, padding: "22px 72px", color: C.white, fontFamily: "'Orbitron', sans-serif",
        fontSize: "clamp(15px,2.2vw,21px)", fontWeight: 700, letterSpacing: 3,
        cursor: "pointer", animation: "btnPulse 2.5s ease-in-out infinite", transition: "background .3s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${C.violet}99,${C.violet}55)`; }}
        onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg,${C.violet}55,${C.violet}22)`; }}
      >★ DÉCOUVRIR FANTOMM SMOKE</button>
      <div style={{ marginTop: 52, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", background: `${C.bg}99`, border: `1px solid ${C.cyan}33`, borderRadius: 16, padding: "16px 32px" }}>
        {[{ icon: "⭐", label: "5,0 / 5 Google" }, { icon: "🔧", label: "Réparation express" }, { icon: "🔒", label: "Fantomm Smoke" }].map(item => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <span style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 13 }}>{item.label}</span>
          </div>
        ))}
      </div>
      {modal && <VideoModal src={modal} onClose={() => setModal(null)} />}
    </Sec>
  );
}

/* ─── FANTOMM SMOKE ─── */
function FantommSmoke() {
  const [open, setOpen] = useState(null);
  const sections = [
    { id: "intro", title: "La solution globale", color: C.violet, icon: "🛡️",
      content: `Nous vivons une époque où l'incertitude grandit chaque jour. Nos communications sont analysées, nos recherches filtrées par des algorithmes, nos comportements numériques étudiés et exploités.\n\nFace à cette réalité, la team Fantomm a développé une solution complète permettant à chacun de reprendre le contrôle de ses données personnelles et de son anonymat numérique.\n\nLe pack Fantomm Smoke comprend :\n• Un smartphone sécurisé : le Fantomm\n• Un ordinateur portable sécurisé : le Smoke\n• Un routeur 4G dédié` },
    { id: "fantomm", title: "Le Fantomm", color: C.cyan, icon: "📱", sub: "Le smartphone transformé en coffre-fort numérique",
      content: `Le Fantomm est un smartphone entièrement configuré pour devenir un espace numérique sécurisé et indépendant.\n\nBasé sur Samsung A16 (64 Go ou 128 Go / 4 Go RAM / 4G) et prochainement Samsung A17.\n\nConfiguration sécurisée incluse :\n• Suppression de plus de 300 applications inutiles ou intrusives\n• VPN activé pour un an\n• Adresse e-mail chiffrée 4096 bits\n• Portefeuilles Bitcoin et Monero\n• Store alternatif sécurisé\n• Scanner de menaces\n\nSécurisation matérielle renforcée :\n• Neutralisation du transfert de données via le port USB\n• Scellement des composants sensibles` },
    { id: "smoke", title: "Le Smoke", color: C.violet, icon: "💻", sub: "L'ordinateur dédié à l'anonymat et à la sécurité",
      content: `Le Smoke est un ordinateur portable sous Linux Debian, spécialement configuré pour offrir un environnement numérique sécurisé.\n\n• Moteur de recherche sécurisé\n• Messagerie chiffrée\n• Portefeuilles Bitcoin et Monero\n• Navigateur Tor et accès aux services .onion\n• VPN configuré\n• Téléphone virtuel entièrement contrôlable et renouvelable` },
    { id: "why", title: "Pourquoi choisir Fantomm Smoke", color: C.green, icon: "✔️",
      content: `✔ Solution clé en main\n✔ Configuration professionnelle\n✔ Outils avancés accessibles à tous\n✔ Accompagnement pédagogique\n✔ Protection renforcée des données\n\nFantomm Smoke Team.` },
  ];
  return (
    <Sec id="fantomm" style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <SecTitle title="Pack Fantomm SMOKE" sub="Sécurité & Anonymat numérique" color={C.violet} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
        {[
          { icon: "📱", title: "FANTOMM", sub: "Smartphone sécurisé", desc: "Samsung A16/A17 — +300 apps supprimées, VPN 1 an, email chiffré 4096 bits, wallets Bitcoin/Monero", color: C.cyan },
          { icon: "💻", title: "SMOKE", sub: "Ordinateur sécurisé", desc: "Linux Debian — Tor, VPN, messagerie chiffrée, téléphone virtuel renouvelable", color: C.violet },
          { icon: "📡", title: "ROUTEUR 4G", sub: "Connexion anonyme dédiée", desc: "Routeur 4G dédié inclus dans le pack pour une connexion indépendante et anonyme", color: C.green },
        ].map(card => (
          <GlowCard key={card.title} color={card.color} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{card.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron'", color: card.color, margin: "0 0 4px", fontSize: 18, letterSpacing: 2 }}>{card.title}</h3>
            <p style={{ color: C.gray, fontSize: 13, margin: "0 0 12px", fontFamily: "'Exo 2'" }}>{card.sub}</p>
            <p style={{ color: C.white, fontSize: 14, fontFamily: "'Exo 2'", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
          </GlowCard>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sections.map(sec => (
          <div key={sec.id} style={{ border: `1px solid ${open === sec.id ? sec.color : sec.color + "44"}`, borderRadius: 12, overflow: "hidden", transition: "border-color .3s" }}>
            <button onClick={() => setOpen(open === sec.id ? null : sec.id)} style={{
              width: "100%", background: open === sec.id ? `${sec.color}22` : `${C.bg}cc`,
              border: "none", padding: "18px 24px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background .3s",
            }}>
              <span style={{ fontFamily: "'Orbitron'", color: sec.color, fontSize: 15, letterSpacing: 1 }}>{sec.icon} {sec.title}</span>
              <span style={{ color: sec.color, fontSize: 22, fontWeight: 300, transform: open === sec.id ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s" }}>+</span>
            </button>
            {open === sec.id && (
              <div style={{ padding: "20px 24px", background: `${C.bg}bb` }}>
                {sec.sub && <p style={{ color: sec.color, fontFamily: "'Exo 2'", fontWeight: 600, marginTop: 0 }}>{sec.sub}</p>}
                {sec.content.split("\n").map((line, i) => (
                  <p key={i} style={{ color: line.startsWith("•") || line.startsWith("✔") ? C.white : C.gray, fontFamily: "'Exo 2'", fontSize: 14, lineHeight: 1.7, margin: "4px 0" }}>{line || <br />}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <a href="https://wa.me/33605768568?text=Bonjour%2C%20je%20suis%20intéressé%20par%20le%20Pack%20Fantomm%20Smoke"
          target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})`, border: "none", borderRadius: 50, padding: "16px 48px", color: C.bg, fontFamily: "'Orbitron'", fontSize: 15, fontWeight: 700, letterSpacing: 2, textDecoration: "none", boxShadow: `0 0 32px ${C.violet}55` }}
        >💬 NOUS CONTACTER SUR WHATSAPP</a>
      </div>
    </Sec>
  );
}

/* ─── SERVICES ─── */
function Services() {
  const items = [
    { icon: "🔧", title: "Réparation", color: C.cyan, items: ["Écran cassé / LCD", "Batterie HS", "Connecteur de charge", "Caméra / haut-parleur", "Diagnostic offert"] },
    { icon: "📱", title: "Vente", color: C.violet, items: ["Smartphones neufs & reconditionnés", "Accessoires & coques", "Chargeurs & câbles", "Protections écran", "Oreillettes & casques"] },
    { icon: "⚡", title: "Services+", color: C.green, items: ["Transfert de données", "Déblocage réseau", "Installation apps", "Sauvegarde & restauration", "Conseil personnalisé"] },
  ];
  return (
    <Sec id="services" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SecTitle title="Nos SERVICES" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
        {items.map(s => (
          <GlowCard key={s.title} color={s.color}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron'", color: s.color, margin: "0 0 16px", letterSpacing: 2 }}>{s.title}</h3>
            {s.items.map(it => (
              <div key={it} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ color: s.color, fontSize: 12 }}>▶</span>
                <span style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 14 }}>{it}</span>
              </div>
            ))}
          </GlowCard>
        ))}
      </div>
    </Sec>
  );
}

/* ─── GALLERY ─── */
function Gallery() {
  const photos = [
    { src: "/photo1.webp", alt: "Vitrine accessoires" }, { src: "/photo2.webp", alt: "Réparation" },
    { src: "/photo3.webp", alt: "Game console" }, { src: "/photo4.webp", alt: "Vitrine téléphones" },
    { src: "/photo5.webp", alt: "Atelier réparation" }, { src: "/photo6.webp", alt: "Carte mère" },
    { src: "/photo7.webp", alt: "Vitrine Syma" }, { src: "/photo8.webp", alt: "Façade Phone 7 Up" },
    { src: "/photo9.webp", alt: "Intérieur boutique" },
  ];
  const total = photos.length;
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCur(c => (c + 1) % total), 4000);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);
  const prev = () => { setCur(c => (c - 1 + total) % total); startTimer(); };
  const next = () => { setCur(c => (c + 1) % total); startTimer(); };
  const arrowBtn = (onClick, label) => (
    <button onClick={onClick} style={{
      position: "absolute", top: "50%", transform: "translateY(-50%)",
      ...(label === "◀" ? { left: 12 } : { right: 12 }),
      background: `${C.bg}bb`, border: `1px solid ${C.cyan}44`, color: C.cyan,
      fontSize: 18, width: 40, height: 40, borderRadius: "50%",
      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 5, transition: "all .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = `${C.cyan}33`; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${C.bg}bb`; }}
    >{label}</button>
  );
  return (
    <Sec id="galerie" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <SecTitle title="Notre BOUTIQUE" />
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.cyan}33` }}>
        <div style={{ position: "relative", width: "100%", paddingBottom: "75%", background: "#000" }}>
          {photos.map((p, i) => (
            <img key={p.src} src={p.src} alt={p.alt} style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: i === cur ? 1 : 0, transition: "opacity 0.8s ease",
            }} />
          ))}
        </div>
        {arrowBtn(prev, "◀")}
        {arrowBtn(next, "▶")}
        <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
          {photos.map((_, i) => (
            <button key={i} onClick={() => { setCur(i); startTimer(); }} style={{
              width: i === cur ? 24 : 8, height: 8, borderRadius: 4,
              background: i === cur ? C.cyan : `${C.white}55`,
              border: "none", cursor: "pointer", transition: "all .3s", padding: 0,
            }} />
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", msg: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.nom || !form.email || !form.msg) return;
    window.location.href = `mailto:phone7upp@gmail.com?subject=Message de ${form.nom}&body=${encodeURIComponent(form.msg)}%0A%0AEmail: ${form.email}`;
  };
  return (
    <Sec id="contact" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <SecTitle title="Nous CONTACTER" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 32 }}>
        <GlowCard color={C.cyan}>
          <h3 style={{ fontFamily: "'Orbitron'", color: C.cyan, margin: "0 0 20px", letterSpacing: 2 }}>COORDONNÉES</h3>
          {[
            { icon: "📍", text: "15 ter Av. Marcellin Berthelot, 38200 Vienne" },
            { icon: "📞", text: "06 05 76 85 68" },
            { icon: "💬", text: "WhatsApp : +33 6 05 76 85 68" },
            { icon: "✉️", text: "phone7upp@gmail.com" },
          ].map(it => (
            <div key={it.text} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>{it.icon}</span>
              <span style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 14, lineHeight: 1.5 }}>{it.text}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, borderTop: `1px solid ${C.cyan}33`, paddingTop: 20 }}>
            <h4 style={{ fontFamily: "'Orbitron'", color: C.cyan, margin: "0 0 12px", fontSize: 13, letterSpacing: 2 }}>HORAIRES</h4>
            {[
              { j: "Lun – Ven", h: "09h–12h30 / 14h30–19h" },
              { j: "Samedi",    h: "09h–12h30" },
              { j: "Dimanche",  h: "Fermé" },
            ].map(r => (
              <div key={r.j} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 13 }}>{r.j}</span>
                <span style={{ color: r.h === "Fermé" ? "#ff4444" : C.white, fontFamily: "'Exo 2'", fontSize: 13 }}>{r.h}</span>
              </div>
            ))}
          </div>
        </GlowCard>
        <GlowCard color={C.violet}>
          <h3 style={{ fontFamily: "'Orbitron'", color: C.violet, margin: "0 0 20px", letterSpacing: 2 }}>FORMULAIRE</h3>
          {[
            { name: "nom", placeholder: "Votre nom", type: "text" },
            { name: "email", placeholder: "Votre email", type: "email" },
          ].map(f => (
            <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder}
              value={form[f.name]} onChange={handleChange}
              style={{ width: "100%", background: `${C.bg}99`, border: `1px solid ${C.violet}55`, borderRadius: 10, padding: "12px 16px", color: C.white, fontFamily: "'Exo 2'", fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
            />
          ))}
          <textarea name="msg" placeholder="Votre message" rows={5} value={form.msg} onChange={handleChange}
            style={{ width: "100%", background: `${C.bg}99`, border: `1px solid ${C.violet}55`, borderRadius: 10, padding: "12px 16px", color: C.white, fontFamily: "'Exo 2'", fontSize: 14, marginBottom: 16, boxSizing: "border-box", resize: "vertical" }}
          />
          <button onClick={handleSubmit} style={{
            width: "100%", background: `linear-gradient(135deg,${C.violet},${C.cyan})`,
            border: "none", borderRadius: 10, padding: "14px",
            color: C.bg, fontFamily: "'Orbitron'", fontSize: 14, fontWeight: 700, letterSpacing: 1, cursor: "pointer",
          }}>ENVOYER →</button>
        </GlowCard>
      </div>
    </Sec>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${C.cyan}33`, padding: "32px 24px", textAlign: "center", background: `${C.bg}cc`, backdropFilter: "blur(12px)" }}>
      <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 12, margin: "0 0 8px" }}>
        SIRET : 939 839 346 00011 · TVA : FR38 939 839 346 · APE : Commerce de détail matériels télécommunication
      </p>
      <p style={{ color: C.gray, fontFamily: "'Exo 2'", fontSize: 11, margin: 0 }}>
        Site conçu avec l'assistance de{" "}
        <span title="Construction & déploiement" style={{ color: C.cyan }}>Claude (Anthropic)</span>
        {" · "}<span title="Conception" style={{ color: C.violet }}>Copilot</span>
        {" · "}<span title="Design" style={{ color: C.green }}>Grok</span>
        {" · "}<span title="Orchestrateur du projet" style={{ color: C.yellow, fontWeight: 700 }}>Olivier orchestrateur</span>
      </p>
    </footer>
  );
}

/* ─── BOUTONS FLOTTANTS ─── */
function FloatingButtons({ onCommande }) {
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Commander crypto */}
      <button onClick={onCommande} style={{
        background: `linear-gradient(135deg, ${C.orange}, ${C.yellow})`,
        border: "none", borderRadius: 50, padding: "14px 20px",
        color: C.bg, fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 14,
        cursor: "pointer", boxShadow: `0 4px 20px ${C.orange}88`,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 18 }}>₿</span> COMMANDER
      </button>
      {/* Signal */}
      <a href="https://signal.me/#p/fantomm7up.77" target="_blank" rel="noopener noreferrer"
        style={{
          background: "#3a76f0", borderRadius: 50, padding: "14px 20px", color: "#fff",
          fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 14,
          textDecoration: "none", boxShadow: "0 4px 20px #3a76f088",
          display: "flex", alignItems: "center", gap: 8,
        }}>
        <span style={{ fontSize: 18 }}>✉</span> SIGNAL
      </a>
      {/* WhatsApp */}
      <a href="https://wa.me/33605768568" target="_blank" rel="noopener noreferrer"
        style={{
          background: "#25D366", borderRadius: 50, padding: "14px 20px", color: "#fff",
          fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 14,
          textDecoration: "none", boxShadow: "0 4px 20px #25D36688",
          display: "flex", alignItems: "center", gap: 8,
        }}>
        <span style={{ fontSize: 20 }}>●</span> WHATSAPP
      </a>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [showCommande, setShowCommande] = useState(false);
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Exo 2', sans-serif" }}>
      <GalaxyBg />
      <Navbar onNav={scrollTo} />
      <Hero onFantomm={() => scrollTo("fantomm")} />
      <FantommSmoke />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingButtons onCommande={() => setShowCommande(true)} />
      {showCommande && <CommandeModal onClose={() => setShowCommande(false)} />}
    </div>
  );
}
