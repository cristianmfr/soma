export async function verifyEmail(token: string) {
  return await fetch(`http://localhost:3001/auth/verify-email?token=${token}`);
}
