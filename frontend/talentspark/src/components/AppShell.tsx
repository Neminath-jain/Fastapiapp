import type { ReactNode } from "react";
import Sidebar, { type NavKey } from "./Sidebar";

type Props = {
  active: NavKey;
  onNavigate?: (key: NavKey) => void;
  children: ReactNode;
};

function AppShell({ active, onNavigate, children }: Props) {
  return (
    <div className="app-root">
      <header className="top-bar">
        <p className="top-bar__brand">TalentSpark</p>
      </header>
      <div className="app-body">
        <Sidebar active={active} onNavigate={onNavigate} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;