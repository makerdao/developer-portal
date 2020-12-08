/** @jsx jsx */
import { jsx, Select } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const Dropdown = ({ options, activeGroup, onChange, ...props }) => {
  return (
    <Select
      arrow={
        <Icon
          sx={{
            alignSelf: 'center',
            pointerEvents: 'auto',
          }}
          name="chevron_down"
          size={3}
          color="primary"
        />
      }
      {...props}
      defaultValue={activeGroup}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </Select>
  );
};

export default Dropdown;
