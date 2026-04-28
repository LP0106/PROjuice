import "./globals.css";

export const metadata = {
  title: "PROjuice | Real Fruit Energy. Serious Protein.",
  description:
    "PROjuice is a premium fruit-protein drink platform with public launch pages, lead capture and an admin dashboard."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
