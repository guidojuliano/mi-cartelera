import { useTheme } from "app/context/ThemeContext";
import Link from "next/link";
import React from "react";

export const Divider = () => <div className="border-t border-white/20 my-2" />;

// Definir los dos tipos de items permitidos
interface LinkItem {
  href: string;
  label: string;
}

interface DividerItem {
  type: "divider";
}

export type DropdownItem = LinkItem | DividerItem;

export const DropdownMenu = ({ items }: { items: DropdownItem[] }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`absolute top-full left-0 min-w-[200px] rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-900" : "bg-[#0C66DF]"
      } py-2 z-50`}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {"type" in item ? (
            <Divider />
          ) : (
            <Link
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
