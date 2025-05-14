export default function Loader({ loading }) {
  return loading ? (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
      Loading...
    </div>
  ) : null;
}
