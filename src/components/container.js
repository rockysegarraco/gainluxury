export default function Layout({ preview, children }) {
  return (
    <>
      <div className="mx-auto max-w-full lg:px-20 px-4">{children}</div>
    </>
  );
}
