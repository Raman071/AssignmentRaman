import { render, screen } from '@testing-library/react';
import UserList from '../src/UserList'; // Import your component

test('renders user list', () => {
  render(<UserList />);
  const element = screen.getByText(/user list/i); // Check if the component text renders correctly
  expect(element).toBeInTheDocument();
});
