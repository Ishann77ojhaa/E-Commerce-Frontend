const Form = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form className="p-8 bg-white rounded-lg shadow-lg w-96">
      <h2 className="mb-6 text-2xl font-bold text-center">Create Account</h2>
      <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border rounded" />
      <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded" />
      <button className="w-full py-3 text-white bg-blue-600 rounded">Register</button>
    </form>
  </div>
);

export default Form