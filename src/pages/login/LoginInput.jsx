const LoginInput = ({
  title,
  type,
  value,
  onChange,
  validation,
  validText,
  placeHolder,
}) => {
  return (
    <div>
      <p className="block text-sm text-gray-600">
        {title}
      </p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className={`mt-1 p-2 w-full text-sm rounded-md ${
          !validation && "border-red-500"
        } border-gray-100 border-2`}
        placeholder={placeHolder}
      />
      {!validation && <p className="text-xs text-red-500">{validText}</p>}
    </div>
  );
};

export default LoginInput;
