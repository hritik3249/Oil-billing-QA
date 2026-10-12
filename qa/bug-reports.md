# Bug Reports - Oil Billing System QA

**Test Cycle:** October 2026  
**Environment:** Test Database (Supabase)  
**Tester:** QA Intern  
**Test Date:** 2026-10-12  

---

## Instructions

Fill this document with REAL bugs found during testing.  
**DO NOT invent bugs.** Only report issues you actually encountered and can reproduce.

---

## Bug Report Template

Use this format for each bug:

```
### BUG-XXX: [Short Title]

**Severity:** Critical | High | Medium | Low  
**Module:** Authentication | Customers | Bills | Stock | Purchases | Dashboard | P&L  
**Environment:** localhost:3000, Test Supabase DB  

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Result:**  
What should happen

**Actual Result:**  
What actually happened

**Evidence:**  
- Screenshot: `qa/results/screenshots/bug-xxx.png`
- Playwright trace: `qa/results/playwright-report/trace-xxx.zip`
- Error log: [paste error message]

**Suggested Fix:**  
If you know what might be causing it

**Reproducibility:** Always | Sometimes | Rarely  
```

---

## Bugs Found

<!-- Add real bugs below this line -->

### Example: BUG-001: Invoice number sequence breaks after ET-10-9

**Severity:** High  
**Module:** Bills / Invoice Numbering  
**Environment:** localhost:3000, Test Supabase DB  

**Steps to Reproduce:**
1. Create bills until invoice number reaches ET-10-9
2. Call GET /api/invoice-number
3. Create next bill with returned number

**Expected Result:**  
Next invoice number should be ET-10-10

**Actual Result:**  
System may return ET-10-1 or incorrect sequence due to alphabetical sorting

**Evidence:**  
- API Response: `{"invoice_no": "ET-10-1", "next_number": 1}`
- Test: TC015 in test-cases.xlsx

**Suggested Fix:**  
The code at `app/api/invoice-number/route.ts:34-39` already handles this correctly by parsing as integer. This bug is theoretical - verify by actually creating 10+ bills in the same month.

**Reproducibility:** Always (if bills 1-9 exist)

---

<!-- Add more bugs below as you find them -->

---

## Summary Statistics

- **Total Bugs Found:** [X]
- **Critical:** [X]
- **High:** [X]
- **Medium:** [X]
- **Low:** [X]

**Modules Affected:**
- Authentication: [X bugs]
- Customers: [X bugs]
- Bills: [X bugs]
- Stock: [X bugs]
- Other: [X bugs]

---

## Notes

- Only include bugs that you ACTUALLY encountered during testing
- Include evidence (screenshots, logs, traces) whenever possible
- If all tests pass, state that clearly - "No defects found" is a valid outcome
- Minor UI/UX issues are still bugs (classify as Low severity)
