export function getErrorMessage(e: any): string {
  return e?.response?.data?.message ?? 'N/A';
}
