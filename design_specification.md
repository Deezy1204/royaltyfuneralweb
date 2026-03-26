# Design Specification: Royalty Funeral Services Printable Documents

This document outlines the core design tokens, layout structures, and print-specific styles used across the `royalty-funeral-admin` project to ensure a consistent, premium, and professional look for all generated documents.

## 1. Core Branding & Visual Identity

### Colors
- **Primary Blue**: `text-blue-900` / `#1e3a8a` (Used for Footers, Highlights, and professional accents).
- **Secondary Purple**: `bg-purple-600` / `text-purple-600` / `#9333ea` (Used for "Receipt" accents and UI elements).
- **Secondary Green**: `bg-green-600` / `text-green-800` (Used for "Approved" status and success indicators).
- **Text Gray**: `text-gray-900` (Headers), `text-gray-500` (Sub-text/Address), `text-gray-400` (Labels).
- **Backgrounds**: `bg-white` (Print), `bg-gray-50` (Display contrast).

### Typography
- **Font Stack**: Modern Sans-Serif (Standard Tailwind `font-sans` / `Inter`).
- **Heading Styles**:
  - Main Document Title: `text-3xl font-bold uppercase tracking-wider`.
  - Section Headers: `text-xl font-bold uppercase underline` (Policy) or `text-lg font-bold` (Cards).
  - Banner Titles: `text-2xl font-bold tracking-widest uppercase` (Receipt).
- **Body Text**:
  - Standard: `text-sm` or `text-base`.
  - Justification: `text-justify` for formal letters/terms.
  - Labels: `text-xs font-bold uppercase tracking-wider`.

### Branding Elements
- **Logo**: `/images/logo.png`. Standard height `h-14` (approx. 56px) or `h-12` (48px).
- **Footer Text (Critical for Branding)**: "ROYALTY FUNERAL SERVICES – A DIGNIFIED SEND-OFF" in `text-blue-900 font-bold text-sm tracking-widest`.

---

## 2. Print-Specific Styling (CSS)

To achieve the "exact" look in print, use the following CSS block:

```css
@media print {
    @page {
        margin: 0;
        size: auto;
    }
    body {
        margin: 1.6cm; /* Standard professional margin */
        background-color: white !important;
        -webkit-print-color-adjust: exact;
    }
    .page-break-after {
        page-break-after: always;
    }
    .page-break-before {
        page-break-before: always;
    }
    .no-print {
        display: none !important;
    }
}
```

---

## 3. Layout Patterns

### A. The "Formal Document" (Policy/Letter)
- **Top Header**: Logo on the left, Address/Contact on the right (`flex justify-between items-start`).
- **Body Content**: Centered `max-w-4xl`.
- **Tables**: `border-collapse border border-gray-900` with `p-2` padding.
- **Signatures**: Flex container at the bottom with labels like "The Administrator" and "Client Signature".

### B. The "Modern Receipt"
- **Receipt Banner**: A clear horizontal strip with `bg-gray-50` and a large "PAYMENT RECEIPT" title.
- **Metadata Grid**: A `grid-cols-2` layout showing Receipt No. and Date.
- **Info Blocks**: `p-8` padding, rounded corners (`rounded-xl`), and subtle borders.
- **Amount in Words**: Highlighted with a colored left-border (`border-purple-200`) and a light background (`bg-purple-50/30`).

### C. The "Standard Summary" (Claim/Declaration)
- **Status Badge**: Top corner badge showing Pending/Approved/Paid.
- **Detail Cards**: Sections grouped by topic (Client Details, Deceased Details, etc.) with consistent `lucide-react` icons (User, FileText, Calendar).
