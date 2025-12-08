const ForbiddenPage = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">403 - Forbidden</h1>
      <p className="text-gray-500 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
    </div>
  );
};

export default ForbiddenPage;
