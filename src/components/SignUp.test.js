import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';
import userEvent from '@testing-library/user-event';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    navigate: mockNavigate,
  }),
}))

const SignUpComponent = () => {
  return <I18nextProvider i18n={i18n}><SignUp /></I18nextProvider>
}

test('Sign Up using the Service', () => { 
  render(SignUpComponent());
  // Extract the textbox component
  const firstNameElement = screen.getByTestId(/firstName/i);
  // Simulate typing 'PRAVEEN KUMAR'
  userEvent.type(firstNameElement, 'PRAVEEN KUMAR');
  // Assert textbox has text content 'PRAVEEN KUMAR'
  expect(firstNameElement).toHaveValue('PRAVEEN KUMAR');

  // Extract the password component
  const passwordElement = screen.getByTestId(/password/i);
  // Simulate typing 'password@123'
  userEvent.type(passwordElement, 'password@123');
  // Assert password has text content 'password@123'
  expect(passwordElement).toHaveValue('password@123');


  // Extract the emailAddress component
  const emailAddressElement = screen.getByTestId(/email/i);
  // Simulate typing 'be.praveen@gmail.com'
  userEvent.type(emailAddressElement, 'be.praveen@gmail.com');
  // Assert email address has text content 'be.praveen@gmail.com''
  expect(emailAddressElement).toHaveValue('be.praveen@gmail.com');

});

test('renders all Input elements along with Labels', () => {
  render(SignUpComponent());

  const firstNameLabel = screen.getByLabelText(/First Name/i);
  expect(firstNameLabel).toBeInTheDocument();
  const firstNameElement = screen.getByTestId(/firstName/i);
  expect(firstNameElement).toBeInTheDocument();

  const emailLabel = screen.getByLabelText(/Email Address/i);
  expect(emailLabel).toBeInTheDocument();
  const emailElement = screen.getByTestId(/email/i);
  expect(emailElement).toBeInTheDocument();

  const passwordLabel = screen.getByLabelText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
  const passwordElement = screen.getByTestId(/password/i);
  expect(passwordElement).toBeInTheDocument();

});

test('SignUp: renders helper Text', () => {
  render(SignUpComponent());
  const helperText = screen.getByText(/Use the form below to sign up for this super awesome service. You're only a few steps away!/i, { selector: 'p' });
  expect(helperText).toBeInTheDocument();
});


test('SignUp: renders Lets Sign Up Text', () => {
  render(SignUpComponent());
  const heading = screen.getByRole('heading', { name: /Let's/i, name: /Sign up/i });
  expect(heading).toBeInTheDocument();
});


test('SignUp: renders SignUp Button', () => {
  render(SignUpComponent());
  const signUpButton = screen.getByText(/Sign Up/i, { selector: 'button' });
  expect(signUpButton).toBeInTheDocument();
});