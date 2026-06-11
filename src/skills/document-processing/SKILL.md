---
name: document-processing
description: "Create and transform documents: docx, pdf, pptx, xlsx generation and editing."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "content"
  tags:
    - documents
    - docx
    - pdf
    - pptx
    - xlsx
allowed-tools:
  - bash
  - read
  - write
---

# Document Processing

Create and transform office documents programmatically.

## Supported Formats

### DOCX (Word)
Use `python-docx` or similar library:
- Create documents with headings, paragraphs, tables, images
- Apply styles, formatting, and templates
- Merge content from multiple documents
- Generate reports with dynamic data

### PDF
Use `reportlab` or `weasyprint`:
- Generate PDFs from HTML/CSS templates
- Create fillable forms
- Add watermarks, headers, footers
- Merge and split PDFs

### PPTX (PowerPoint)
Use `python-pptx`:
- Create slide decks from templates
- Add charts, tables, images to slides
- Apply themes and layouts
- Generate presentation scripts

### XLSX (Excel)
Use `openpyxl` or `xlwings`:
- Create workbooks with multiple sheets
- Apply formulas, formatting, conditional formatting
- Generate charts and pivot tables
- Import/export CSV and JSON data

## Best Practices
- Use templates for consistent output formatting
- Validate generated documents by reading them back
- Handle encoding issues (especially with non-ASCII content)
- Stream large documents to avoid memory issues

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll check the output manually" | Automated validation catches formatting issues you'd miss. |
| "Templates are overkill for this" | Templates ensure consistency and prevent regeneration issues. |
