import Select from 'react-select';

export default function CustomSelect({ options, onChange, value }) {
  const customSelectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      minWidth: 175,
      width: '100%',
      minHeight: 30,
      borderColor: state.isFocused ? 'grey' : '#ccc',
      backgroundColor: '#f0f1f3',
      color: '#000',
    }),
    dropdownIndicator: base => ({
      ...base,
      padding: 4
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        cursor: isDisabled ? 'not-allowed' : 'default',
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? '#ccc'
            : isFocused
              ? '#f6f6f6'
              : undefined,
        color: '#000',
        ':active': {
          ...styles[':active'],
          backgroundColor: '#f6f6f6',
        },
      };
    },
  };
  return (
    <Select
      styles={customSelectStyle}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
}
