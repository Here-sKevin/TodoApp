/* eslint-disable prettier/prettier */
import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';


export class LoginModel {
	public username: string = '';
	public password: string = '';

	public toModel() {
		return {
			username: this.username,
			password: this.password
		};
	}
}


const schemaLoginModel = object<LoginModel>({
	username: string().required('Obrigatorio'),
	password: string().required('Obrigatorio')
})
.compile();

export const useLoginModel = () => useForm(
	LoginModel,
	{
		validate: async (form) => await schemaLoginModel.validate(form),
		validateOnlyAfterFirstSubmit: true
	}
);
