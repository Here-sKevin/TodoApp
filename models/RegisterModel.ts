/* eslint-disable prettier/prettier */
import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

export class RegisterModel {
	public username: string = '';
	public password: string = '';

	public toModel() {
		return {
			username: this.username,
            password: this.password
			
		};
	}
}

const schemaRegisterUserModel = object<RegisterModel>({
	username: string().required('Obrigatorio'),
	password: string().required('Obrigatorio'),
})
.compile();

export const useRegisterModel = () => useForm(
	RegisterModel,
	{
		validate: async (form) => await schemaRegisterUserModel.validate(form),
		validateOnlyAfterFirstSubmit: true
	}
);
