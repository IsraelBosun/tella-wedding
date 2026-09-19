import { redirect } from 'next/navigation';

/*
  The invitation used to live here. It is at the root now, but links to this
  path have already been shared, so the segment stays as a permanent redirect
  rather than starting to 404 on people. Any slug lands on the same page,
  because there was only ever one.
*/
export default function LegacyInvitePage() {
  redirect('/');
}
