import { redirect } from 'next/navigation';

export default function AdminIndex() {
  // Instantly redirects the user to the login page
  redirect('/admin/login');
}