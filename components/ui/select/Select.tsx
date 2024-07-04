/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';

import type Option from '../../shared/models/Option';
import { useCustomTheme } from '../../shared/styles/Theme';
// eslint-disable-next-line import/named
import Picker from '../multiSelect/Picker';
import Text from '../text/Text';

import SelectInput from './components/selectInput/SelectInput';

export type SingleProps = {
	isMultiple?: undefined | false;
	value?: Option;
	onValueChange: (value: Option) => void;
};

type Props = {
	isInvalid?: boolean;
	disabled?: boolean;
	items: Option[];
	placeholder?: string;
	renderLabel?: React.ReactNode;
	onEndReached?: (info: {
		distanceFromEnd: number;
	}) => void;
	onClear?: () => void;
	onChangeSearchInput?: (search: string) => void;
	isLoading?: boolean;
	isSearchable?: boolean;
} & SingleProps;

const Select = ({
	isInvalid,
	isMultiple,
	placeholder,
	disabled,
	renderLabel,
	onEndReached,
	onClear,
	isLoading,
	onChangeSearchInput,
	...props
}: Props) => {
	const theme = useCustomTheme();

	return (
		<Picker
			onChange={(option) => props.onValueChange(option)}
			options={props.items}
			value={props.value}
			disabled={disabled ?? false}
			multi={isMultiple}
			isSearchable={props.items.length > 4}
			onEndReached={onEndReached}
			keyExtractor={(option, index) => `${index}_${option.value}`}
			isLoading={isLoading}
			onClear={onClear}
			onChangeSearchInput={onChangeSearchInput}
			renderItem={(option, _index, isCheked) => (
				<Text
					style={{ color: theme.colors.grey }}
					fontWeight={isCheked ? 'SemiBold' : 'Regular'}
				>
					{option?.label}
				</Text>
			)}
			renderLabel={(item, isOpen) =>
				renderLabel ?? (
					<SelectInput
						value={item}
						isInvalid={isInvalid ?? false}
						editable={!disabled}
						isFocused={isOpen}
						placeholder={placeholder}
						isMultiple={isMultiple}
					/>
				)
			}
		/>
	);
};

export default Select;
