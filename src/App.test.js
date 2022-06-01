import { render, cleanup, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const AppWrapper= () => {
    return <I18nextProvider i18n={i18n}><App /></I18nextProvider>
}

afterEach(cleanup)

it('render Sign Up Page', () => {
  render(AppWrapper(), {wrapper: BrowserRouter});
  // verify page content for expected route
  expect(screen.getByRole('heading', { name: /Let's/i, name: /Sign up/i })).toBeInTheDocument();
})

it('Sign up for the service and render User Registration Confirmation screen', () => {

  render(AppWrapper(), {wrapper: BrowserRouter});
  // Extract the textbox component
  const firstNameElement = screen.getByTestId(/firstName/i);
  // Simulate typing 'JAMES BUREN'
  userEvent.type(firstNameElement, 'JAMES BUREN');
  // Assert textbox has text content 'JAMES BUREN'
  expect(firstNameElement).toHaveValue('JAMES BUREN');

  // Extract the password component
  const passwordElement = screen.getByTestId(/password/i);
  // Simulate typing 'password@123'
  userEvent.type(passwordElement, 'password@123');
  // Assert password has text content 'password@123'
  expect(passwordElement).toHaveValue('password@123');
  
  // Extract the emailAddress component
  const emailAddressElement = screen.getByTestId(/email/i);
  // Simulate typing 'james123@gmail.com'
  userEvent.type(emailAddressElement, 'james123@gmail.com');
  // Assert email address has text content 'james123@gmail.com''
  expect(emailAddressElement).toHaveValue('james123@gmail.com');

  const signUpButton = screen.getByText(/Sign Up/i, { selector: 'button' });
  userEvent.click(signUpButton);

  // verify page content for expected route
  const heading = screen.getByRole('heading', { name: /Welcome/i, name: /PRAVEEN KUMAR!/i });
  expect(heading).toBeInTheDocument();

  const helperText1 = screen.getByText(/You have been registered for this awesome service./i, { selector: 'p' });
  expect(helperText1).toBeInTheDocument();
  const helperText2 = screen.getByText(/Please check your email listed below for instructions./i, { selector: 'p' });
  expect(helperText2).toBeInTheDocument();

  const emailAddress = screen.getByText(/james123@gmail.com/i, { selector: 'strong' });
  expect(emailAddress).toBeInTheDocument();

  const signInButton = screen.getByText(/Sign In/i, { selector: 'button' });
  expect(signInButton).toBeInTheDocument();

})