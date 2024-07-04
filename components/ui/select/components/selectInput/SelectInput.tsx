import { StyleSheet, View } from 'react-native';

import ChevronDownIcon from '../../../../assets/icons/chevron-down.svg';
import type Option from '../../../../shared/models/Option';
import { useCustomTheme } from '../../../../shared/styles/Theme';
import Input from '../../../input/Input';

type Props = {
	value: Option;
	isInvalid: boolean;
	isFocused: boolean;
	editable: boolean;
	placeholder?: string;
	isMultiple?: boolean;
};

const SelectInput = ({
	value,
	isInvalid,
	isFocused,
	editable,
	placeholder,
	isMultiple,
}: Props) => {
	const theme = useCustomTheme();
	return (
		<View
			pointerEvents="box-only"
			style={[
				styles.input,
				{
					borderColor: isInvalid
						? theme.colors.error
						: isFocused
							? theme.colors.grey
							: theme.colors.lightGrey,
					backgroundColor: editable ? 'white' : 'rgba(204,204,204, 0.2)',
				},
				isMultiple ? styles.textAreaInput : null,
			]}
		>
			<Input
				pointerEvents="box-only"
				value={value?.label}
				placeholder={`${placeholder}   `}
				editable={editable}
				isSelect
				multiline={isMultiple}
				selection={{ start: 0 }}
				isInvalid={isInvalid}
				style={styles.inputTextWrapper}
			/>
			<View
				style={[styles.iconContainer, isMultiple ? styles.TAiconContainer : null]}
			>
				{!editable ? null : <ChevronDownIcon width={20} />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		flexDirection: 'row',
		flex: 1,
		borderWidth: 1,
		alignItems: 'center',
		borderRadius: 6,
	},
	textAreaInput: {
		alignItems: 'flex-start',
	},
	inputTextWrapper: {
		borderWidth: 0,
		paddingRight: 40,
		height: 49,
	},
	iconContainer: {
		position: 'absolute',
		right: 10,
	},
	TAiconContainer: {
		paddingTop: 5,
	},
});

export default SelectInput;
