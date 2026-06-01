'use server';

import { getPayloadInstance } from '@/lib/payload';
import { inquirySchema, activityInquirySchema, type InquiryFormData, type ActivityInquiryFormData } from '@/lib/schemas';

/**
 * Server Action for submitting property inquiry forms
 * Validates input with Zod and creates a lead in Payload CMS
 */
export async function submitInquiry(data: InquiryFormData): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  // 1. Validate input with Zod
  const validation = inquirySchema.safeParse(data);
  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(err.message);
    });
    return { success: false, fieldErrors };
  }

  // 2. Submit to Payload CMS
  try {
    const payload = await getPayloadInstance();

    await payload.create({
      collection: 'leads',
      data: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone || '',
        message: validation.data.message,
        propertyReference: validation.data.propertyReference,
        status: 'new',
        source: 'property_inquiry',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('[submitInquiry] Error:', error);
    return {
      success: false,
      error: 'Failed to submit inquiry. Please try again.',
    };
  }
}

/**
 * Server Action for submitting activity inquiry forms
 * Validates input with Zod and creates a lead in Payload CMS
 */
export async function submitActivityInquiry(data: ActivityInquiryFormData): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  // 1. Validate input with Zod
  const validation = activityInquirySchema.safeParse(data);
  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(err.message);
    });
    return { success: false, fieldErrors };
  }

  // 2. Submit to Payload CMS
  try {
    const payload = await getPayloadInstance();

    await payload.create({
      collection: 'leads',
      data: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone || '',
        message: validation.data.message,
        activityReference: validation.data.activityReference,
        status: 'new',
        source: 'activity_inquiry',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('[submitActivityInquiry] Error:', error);
    return {
      success: false,
      error: 'Failed to submit inquiry. Please try again.',
    };
  }
}
