import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          Admin Panel
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            href="/admin/portfolio"
            style={{ padding: '0.75rem 1rem', borderRadius: '0.375rem', backgroundColor: '#374151', textDecoration: 'none', color: 'white', display: 'block' }}
          >
            Portfolio Management
          </Link>
          <Link
            href="/admin/content"
            style={{ padding: '0.75rem 1rem', borderRadius: '0.375rem', backgroundColor: '#374151', textDecoration: 'none', color: 'white', display: 'block' }}
          >
            Category Content
          </Link>
          <Link
            href="/"
            style={{ padding: '0.75rem 1rem', borderRadius: '0.375rem', textDecoration: 'none', color: '#9ca3af', display: 'block', marginTop: 'auto' }}
          >
            ← Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
