import Readct from 'react';

export function Select({ register, options, name, ...rest }: any) {
    return (
      <select {...register(name)} {...rest}>
        {options.map((value: any) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  }