import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContact } from '@/lib/submit-contact';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('submitContact', () => {
  const validData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Hello',
    message: 'This is a test message.',
  };

  it('sends POST to /api/contact with JSON body', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await submitContact(validData);

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData),
    });
    expect(result).toEqual({ ok: true });
  });

  it('returns ok: true on successful submission', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    const result = await submitContact(validData);
    expect(result).toEqual({ ok: true });
  });

  it('returns error from server on non-200', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      }),
    );

    const result = await submitContact(validData);
    expect(result).toEqual({ ok: false, error: 'Server error' });
  });

  it('returns fallback error when server body has no error field', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      }),
    );

    const result = await submitContact(validData);
    expect(result).toEqual({ ok: false, error: 'Something went wrong' });
  });

  it('returns network error on fetch rejection', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));

    const result = await submitContact(validData);
    expect(result).toEqual({ ok: false, error: 'Network error. Please try again.' });
  });
});
