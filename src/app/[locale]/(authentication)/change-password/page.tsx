import FormChangePasswordFeature from '@/features/authentication/change-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js SignIn Page | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Signin Page TailAdmin Dashboard Template',
};

const LoginPage = () => (
  <div className="flex flex-col flex-1 lg:w-1/2 w-full">
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div>
        <div>
          <FormChangePasswordFeature />
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
