jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn((args) => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((cb, href) => ({ createLinkTracker: { cb, href } })),
}));
