export default function Layout({ preview, children }) {
  return (
    <>
      <div className="mx-auto px-20">
        <div>{children}</div>
      </div>
    </>
  );
}
