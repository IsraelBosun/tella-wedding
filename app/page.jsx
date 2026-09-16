import { redirect } from 'next/navigation';
import { weddingData } from '@/lib/mockWedding';

/**
 * Server-side redirect, so the root never paints a loading screen on the way to
 * the invitation. Becomes an index of invitations once there is more than one.
 */
export default function Home() {
  redirect(`/invite/${weddingData.slug}`);
}
