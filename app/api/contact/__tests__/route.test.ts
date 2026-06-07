import { describe, it, expect, vi } from 'vitest';
import { POST } from '../route';

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: {
        send: vi.fn().mockResolvedValue({ error: null }),
      },
    };
  }),
}));

describe('POST /api/contact', () => {
  it('returns ok: true for valid submission', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Hello',
        message: 'Test message.',
      }),
    });

    const res = await POST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toEqual({ ok: true });
  });

  it('returns 400 when fields are missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
