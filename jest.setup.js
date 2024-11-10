require('@testing-library/jest-dom');

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const warnings = [
      'Warning: ReactDOM.render is no longer supported',
      'Warning: `react-dom/test-utils` is deprecated'
    ];
    
    if (warnings.some(warning => args[0] && args[0].includes(warning))) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});