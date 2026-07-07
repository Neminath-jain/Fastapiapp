import type { CSSProperties } from "react";

export type NavKey = "Home" | "RAG Search" | "AI Chat" | "Resume Analysis" | "Job Match";

type NavItem = {
  key: NavKey;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: "Home", label: "Home", icon: "🏠" },
  { key: "RAG Search", label: "RAG Search", icon: "🔍" },
  { key: "AI Chat", label: "AI Chat", icon: "🤖" },
  { key: "Resume Analysis", label: "Resume Analysis", icon: "📄" },
  { key: "Job Match", label: "Job Match", icon: "💼" },
];

type Props = {
  active: NavKey;
  onNavigate?: (key: NavKey) => void;
};

const styles: Record<string, CSSProperties> = {
  sidebar: {
    width: 232,
    minHeight: "100vh",
    background: "#1e293b",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  brand: {
    padding: "24px 20px",
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#38bdf8",
    textAlign: "center",
  },
  navList: {
    listStyle: "none",
    margin: 0,
    padding: "0 12px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 10,
    color: "#e2e8f0",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    background: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
  },
  navItemActive: {
    background: "#0ea5e9",
    color: "#ffffff",
  },
  icon: {
    fontSize: "1.05rem",
  },
};

function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>TalentSpark</div>
      <ul style={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <button
                type="button"
                style={{ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) }}
                onClick={() => onNavigate?.(item.key)}
              >
                <span style={styles.icon}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;