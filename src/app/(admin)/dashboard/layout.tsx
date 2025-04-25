import { ReactQueryProvider } from "app/components/ReactQueryProvider";
import { ThemeProvider } from "app/context/ThemeContext";
import "../../globals.css";
import SideBar from "app/components/Dashboard/SideBar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ThemeProvider>
          <body>
            <div className="flex min-h-screen">
              <aside className="sticky top-0 h-screen">
                <SideBar />
              </aside>
              <main className="flex-1 overflow-y-auto ">{children}</main>
            </div>
          </body>
        </ThemeProvider>
      </ReactQueryProvider>
    </html>
  );
}
