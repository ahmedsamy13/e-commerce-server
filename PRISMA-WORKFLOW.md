# Model changes — Prisma 8

Edit and save `src/prisma/contract.prisma`, then run in order:

```powershell
npx.cmd prisma contract emit
npx.cmd prisma migration plan --name describe-your-change
npx.cmd prisma db migrate --advance-ref db
npx.cmd prisma db verify
```

Replace `describe-your-change` with a new migration name. Stop if any command fails.

For this project's local Prisma 8 workflow. Other Prisma 8 projects may use the same commands with a different contract path; Prisma 7 and earlier use different commands.
