import { describe, it, expect } from 'vitest';
import { getSiteContent } from '@/data/content';

const content = getSiteContent();

describe('getSiteContent()', () => {
  it('returns all 18 data arrays', () => {
    const keys = [
      'navItems',
      'searchableItems',
      'footerQuickLinks',
      'footerEngineeringLinks',
      'footerProductLinks',
      'solutions',
      'capabilities',
      'productCategories',
      'catalog',
      'logos',
      'faqLeft',
      'faqRight',
      'projects',
      'coreValues',
      'roadmap',
      'contactInfo',
      'socialLinks',
      'heroImages',
    ];

    for (const key of keys) {
      expect(content).toHaveProperty(key);
      expect(
        Array.isArray((content as unknown as Record<string, unknown>)[key]),
      ).toBe(true);
    }
  });

  describe('navItems', () => {
    it('each item has label and optional href/dropdown', () => {
      for (const item of content.navItems) {
        expect(item).toHaveProperty('label');
        if (item.href !== undefined) expect(typeof item.href).toBe('string');
        if (item.dropdown !== undefined) {
          for (const d of item.dropdown) {
            expect(d).toHaveProperty('label');
            expect(d).toHaveProperty('href');
          }
        }
      }
    });

    it('includes Home, About Us, and Projects', () => {
      const labels = content.navItems.map((n) => n.label);
      expect(labels).toContain('Home');
      expect(labels).toContain('About Us');
      expect(labels).toContain('Projects');
    });

    it('gives the Product mega menu a browse-all row and Engineering none', () => {
      // This used to be inferred in the component from `columns.length === 4`.
      // Parking the iot-robotics category dropped the product menu to three
      // columns, so it silently started offering "Browse all engineering
      // services" and linking to /engineering. The row is declared in the data
      // now; assert both menus, not just the one that broke.
      const byLabel = (label: string) =>
        content.navItems.find((n) => n.label === label);

      expect(byLabel('Product')?.megaMenu?.footer).toEqual({
        label: 'Browse all products',
        href: '/product',
      });
      expect(byLabel('Engineering')?.megaMenu?.footer).toBeUndefined();
    });
  });

  describe('solutions', () => {
    it('each solution has required fields', () => {
      for (const s of content.solutions) {
        expect(typeof s.layer).toBe('string');
        expect(typeof s.title).toBe('string');
        expect(typeof s.description).toBe('string');
        expect(Array.isArray(s.tags)).toBe(true);
        expect(typeof s.iconName).toBe('string');
      }
    });
  });

  describe('capabilities', () => {
    it('each capability has required fields', () => {
      for (const c of content.capabilities) {
        expect(typeof c.category).toBe('string');
        expect(typeof c.title).toBe('string');
        expect(typeof c.subtitle).toBe('string');
        expect(Array.isArray(c.features)).toBe(true);
        expect(typeof c.image).toBe('string');
      }
    });
  });

  describe('productCategories', () => {
    it('each category has slug, title, description, image', () => {
      for (const c of content.productCategories) {
        expect(typeof c.slug).toBe('string');
        expect(typeof c.title).toBe('string');
        expect(typeof c.description).toBe('string');
        expect(typeof c.image).toBe('string');
      }
    });
  });

  describe('catalog', () => {
    it('each product has required fields', () => {
      for (const p of content.catalog) {
        expect(typeof p.slug).toBe('string');
        expect(typeof p.title).toBe('string');
        expect(typeof p.category).toBe('string');
        expect(typeof p.image).toBe('string');
        expect(typeof p.description).toBe('string');
        expect(['prototype', 'in-development', 'available']).toContain(p.status);
        expect(Array.isArray(p.specs)).toBe(true);
        expect(typeof p.overview).toBe('string');
        expect(p.overview.length).toBeGreaterThan(0);
        expect(p.applications.length).toBeGreaterThan(0);
        expect(p.faqs.length).toBeGreaterThan(0);
        for (const application of p.applications) {
          expect(typeof application.iconName).toBe('string');
          expect(application.title.length).toBeGreaterThan(0);
          expect(application.description.length).toBeGreaterThan(0);
        }
        // Highlights summarise the spec table; a product cannot advertise a
        // figure it does not also publish in full.
        if (p.highlights !== undefined) {
          expect(p.highlights.length).toBe(3);
          expect(p.specs.length).toBeGreaterThan(0);
        }
        // Optional, but when set it must be a number NPR can be derived from —
        // a formatted string (the old shape) converts to nothing.
        if (p.priceUsd !== undefined) {
          expect(typeof p.priceUsd).toBe('number');
          expect(Number.isFinite(p.priceUsd)).toBe(true);
          expect(p.priceUsd).toBeGreaterThan(0);
        }
        for (const spec of p.specs) {
          expect(typeof spec.label).toBe('string');
          expect(typeof spec.value).toBe('string');
        }
      }
    });
  });

  describe('logos', () => {
    it('each logo has src and alt', () => {
      for (const l of content.logos) {
        expect(typeof l.src).toBe('string');
        expect(typeof l.alt).toBe('string');
      }
    });
  });

  describe('faqLeft / faqRight', () => {
    it('each FAQ item has question and answer or list', () => {
      for (const item of [...content.faqLeft, ...content.faqRight]) {
        expect(typeof item.value).toBe('string');
        expect(typeof item.question).toBe('string');
        if (item.answer !== null) expect(typeof item.answer).toBe('string');
        if (item.list !== undefined) expect(Array.isArray(item.list)).toBe(true);
      }
    });
  });

  describe('projects', () => {
    it('each project has required fields', () => {
      for (const p of content.projects) {
        expect(typeof p.id).toBe('number');
        expect(typeof p.image).toBe('string');
        expect(typeof p.category).toBe('string');
        expect(typeof p.badge).toBe('string');
        expect(['prototype', 'in-development', 'available']).toContain(p.badgeVariant);
        expect(typeof p.title).toBe('string');
        expect(typeof p.description).toBe('string');
        expect(Array.isArray(p.tags)).toBe(true);
      }
    });
  });

  describe('coreValues', () => {
    it('each value has number, title, description', () => {
      for (const v of content.coreValues) {
        expect(typeof v.number).toBe('string');
        expect(typeof v.title).toBe('string');
        expect(typeof v.description).toBe('string');
      }
    });
  });

  describe('roadmap', () => {
    it('each item has year, phase, title, description, isCurrent', () => {
      for (const r of content.roadmap) {
        expect(typeof r.year).toBe('string');
        expect(typeof r.phase).toBe('string');
        expect(typeof r.title).toBe('string');
        expect(typeof r.description).toBe('string');
        expect(typeof r.isCurrent).toBe('boolean');
      }
    });

    it('exactly one item is current', () => {
      const current = content.roadmap.filter((r) => r.isCurrent);
      expect(current.length).toBe(1);
    });
  });

  describe('contactInfo', () => {
    it('each contact has iconName, label, value, href', () => {
      for (const c of content.contactInfo) {
        expect(typeof c.iconName).toBe('string');
        expect(typeof c.label).toBe('string');
        expect(typeof c.value).toBe('string');
        expect(typeof c.href).toBe('string');
      }
    });

    it('email matches expected', () => {
      const email = content.contactInfo.find((c) => c.iconName === 'Mail');
      expect(email?.value).toBe('info@phantom.com.np');
    });
  });

  describe('socialLinks', () => {
    it('each link has iconName, href, label', () => {
      for (const s of content.socialLinks) {
        expect(typeof s.iconName).toBe('string');
        expect(typeof s.href).toBe('string');
        expect(typeof s.label).toBe('string');
      }
    });
  });

  describe('heroImages', () => {
    it('each image has src', () => {
      for (const h of content.heroImages) {
        expect(typeof h.src).toBe('string');
      }
    });
  });
});
