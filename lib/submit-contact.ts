export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResult {
  ok: boolean;
  error?: string;
}

export type SubmitContact = (
  data: ContactFormData,
) => Promise<ContactSubmissionResult>;

const apiSubmitter: SubmitContact = async (data) => {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error || 'Something went wrong' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
};

export const submitContact: SubmitContact = apiSubmitter;
