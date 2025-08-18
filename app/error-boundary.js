'use client';

export default function ErrorBoundary({ children, fallback }) {
  try {
    return children;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}