"use client";
import dynamic from "next/dynamic";
export const BootstrapClient = dynamic(() => import('bootstrap/dist/js/bootstrap.bundle.min'), { ssr: false });