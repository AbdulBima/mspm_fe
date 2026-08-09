/**
 * This page's own `inputCls` — rounded-xl, matching its more elevated
 * card/shadow visual language. Deliberately NOT unified with the
 * rounded-lg variant shared by goals/reports (@/lib/form-styles) — that
 * would visibly change this page's corner radius. `labelCls` here IS
 * identical to the other pages, so that one comes from the shared module.
 */
export const inputCls =
  "w-full rounded-xl border border-[#E7E5E2] bg-white px-3.5 py-2.5 text-sm text-[#0B0C0F] placeholder:text-[#B4B2AC] transition-colors focus:outline-none focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10";
