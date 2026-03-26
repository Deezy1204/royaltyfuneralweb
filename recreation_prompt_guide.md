# Recreation Prompt Guide

Use these prompts to guide an AI assistant in recreating the exact design and layout of the `Royalty Funeral Services` documents.

## Prompt 1: The Design Language (Base)
> "Act as a senior frontend developer. I want to recreate a specific design system for printable funeral service documents. The brand name is 'Royalty Funeral Services'.
>
> **Global Styles:**
> Use Tailwind CSS. Colors: Primary Blue (#1e3a8a), Accent Purple (#9333ea), Accent Green (#16a34a).
> Typography: Clean Sans-Serif (Inter/Roboto).
> Print Rules: Use @media print with 1.6cm margins. Set -webkit-print-color-adjust: exact.
> Standard Document Footer: 'ROYALTY FUNERAL SERVICES – A DIGNIFIED SEND-OFF' (Blue 900, Bold, Spaced).
>
> Please confirm you understand these branding constraints."

## Prompt 2: Creating a Policy Document / Acceptance Letter
> "Design a formal Policy Document and Acceptance Letter based on my brand guidelines.
> 1. Layout: A4 format inside a max-w-4xl container. Page breaks between letters, details, and terms.
> 2. Header: Logo on the left (56px high), company address in small gray text on the right.
> 3. Tables: Use border-collapse with dark borders (gray-900). 1/3 width for labels, 2/3 for values. Padding should be 8px (p-2).
> 4. Specific section for Term and Conditions with justificied text-xs font and bold underlined headers.
> 5. Signature Area: Two signature lines at the bottom ('Administrator' and 'Policy Holder')."

## Prompt 3: Creating a Payment Receipt
> "Design a professional payment receipt.
> 1. Header: A clean top section with a logo and contact grid.
> 2. Banner: A light gray (#f9fafb) banner with 'PAYMENT RECEIPT' in uppercase, bold, spaced letters.
> 3. Body: A 2-column grid for 'Payer Details' and 'Policy Details'. Use gray-400 for labels.
> 4. Main Table: A modern table showing the description and amount. The 'Total' row should have a light purple background (#f5f3ff) and bold purple text.
> 5. 'Amount in Words' Section: Box this with a purple left-border and light purple background.
> 6. Footer: Standard copyright and two signature lines at the very bottom."

## Prompt 4: Creating a Declaration of Death / Claim Document
> "Design a 'Declaration of Death' summary page.
> 1. Print Header: Simply a large bold brand title, subtitle 'Declaration of Death', and metadata (No. and Date).
> 2. Document Sections: Group details into 'Card' sections (Principal Member, Deceased Details, Services Provided).
> 3. Icons: Use Lucide icons for each card title (User, User, Calendar).
> 4. Highlight: A declaration statement box with an italic font and a colored left-border.
> 5. Print Footer: A formal signature area with 'Declared By' and 'Verified By' columns."
