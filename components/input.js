export default function Input(props) {
  return (
    <div className="mb-6">
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        Your password
      </label>
      <input
        name={props.name}
        type={props.type}
        id="password"
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-black focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
        placeholder={props.placeholder}
        value={user.password}
        onChange={handleChange}
      />
    </div>
  );
}
