// src/components/declarations.d.ts

declare module "./InvoiceGenerator" {
  import { FC } from "react";
  const InvoiceGenerator: FC;
  export default InvoiceGenerator;
}

declare module "./InvoiceTemplate" {
  import { FC } from "react";
  const InvoiceTemplate: FC<any>; // Gunakan <any> jika Anda malas mendefinisikan props
  export default InvoiceTemplate;
}
