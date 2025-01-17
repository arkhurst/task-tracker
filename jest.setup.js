/* eslint-disable @typescript-eslint/no-require-imports */
// jest.setup.js
require("@testing-library/jest-dom");

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: require("react").forwardRef(({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )),
    form: require("react").forwardRef(({ children, ...props }, ref) => (
      <form ref={ref} {...props}>
        {children}
      </form>
    )),
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0,
};
global.localStorage = localStorageMock;
