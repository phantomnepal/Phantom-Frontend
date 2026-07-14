/** Format whole-rupee NPR integers for display, e.g. 45000 -> "Rs. 45,000". */
export function formatNpr(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}
