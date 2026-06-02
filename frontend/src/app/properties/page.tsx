import { redirect } from 'next/navigation';

// Default tenant slug - in Phase 3 this will be determined dynamically
const DEFAULT_TENANT = 'notjustastay';

export default function PropertiesRedirectPage() {
  redirect(`/${DEFAULT_TENANT}/properties`);
}
