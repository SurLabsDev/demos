import type { ReactNode } from "react";
import { demoMetadata } from "@/lib/seo";

// La página de la demo es un componente de cliente y desde ahí no se puede
// exportar metadata. Este layout de servidor existe solo para eso.
export const metadata = demoMetadata("ejemplo10");

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
