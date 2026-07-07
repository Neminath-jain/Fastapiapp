import type { Dispatch, SetStateAction } from "react";

type Props = {
  currentPage: string;
  onNavigate: Dispatch<SetStateAction<string>>;
  onLogout: () => void;
};

function NavBar({ currentPage, onNavigate, onLogout }: Props) {
  const link = (id: string, label: string) => (
    <li
      onClick={() => onNavigate(id)}
      style={{ fontWeight: currentPage === id ? 700 : 400, cursor: "pointer" }}
    >
      {label}
    </li>
  );

  return (
    <nav className="navbar-simple">
      <ul className="navbar-simple__links">
        {link("home", "Home")}
        {link("chat", "Chat")}
        {link("resume", "Resume")}
        {link("jobmatch", "Job Match")}
        <li style={{ marginLeft: "auto", cursor: "pointer", color: "#dc2626" }} onClick={onLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;