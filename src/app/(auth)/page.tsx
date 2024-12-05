import { redirect } from 'next/navigation';

const HomePage = () => {
  return redirect('/sign-in');
};

export default HomePage;
