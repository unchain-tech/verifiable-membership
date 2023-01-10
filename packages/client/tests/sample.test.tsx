import { render, screen } from '@testing-library/react';
import Link from 'next/link';

test('sample test', () => {
  render(<Link href="example.com">Link to example.com</Link>);

  expect(screen.getByText('Link to example.com')).toBeTruthy();
});
