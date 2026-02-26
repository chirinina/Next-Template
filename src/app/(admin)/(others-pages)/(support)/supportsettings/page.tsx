import SupportSettingsPage from "@/components/support/supportsettings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Diolay  Generate | Diolay  ",
  description:
    "This is Diolay  Generate page for Diolay  Tailwind CSS Admin ",
};

export default function Generate() {
  return (
    <div>
      <div className=" border-gray-200 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Configuracion de Soporte
        </h3>
        <div className="space-y-6">
          <SupportSettingsPage />

        </div>
      </div>
    </div>
  );
}