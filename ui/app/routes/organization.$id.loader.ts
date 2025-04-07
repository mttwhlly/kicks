import { LoaderFunctionArgs } from '@react-router/router';
import { loadOrganizationDataDeferred } from '~/services/organization.service';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response('Organization ID is required', { status: 400 });
  }
  
  return loadOrganizationDataDeferred(id);
}