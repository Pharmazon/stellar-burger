import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../services/store";
import {HOME_PATH, LOGIN_PATH} from "../../utils/constants";
import styles from './page-register.module.css';
import {register} from "../../services/slice/user-slice";
import {useForm} from "../../hooks/useForm";

const PageRegister = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {values, handleChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(register({
                email: values.email,
                password: values.password,
                name: values.name,
            }));
            navigate(HOME_PATH, {replace: true});
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка регистрации: ${error.message}`
                : error || 'Неожиданная ошибка';
            console.log(errorMessage);
        }
    };

    return (
        <div className={`pt-30 ${styles.container}`}>
            <form className={styles.form} onSubmit={onRegisterSubmit}>
                <p className={'text text_type_main-medium'}>Регистрация</p>
                <Input
                    type={'text'}
                    size={'default'}
                    placeholder={'Имя'}
                    name={'name'}
                    value={values.name}
                    onChange={handleChange}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                ></Input>
                <EmailInput
                    size={'default'}
                    placeholder={'E-mail'}
                    name={'email'}
                    isIcon={false}
                    value={values.email}
                    onChange={handleChange}></EmailInput>
                <PasswordInput
                    size={'default'}
                    value={values.password}
                    onChange={handleChange}
                    name='password'
                ></PasswordInput>
                <Button htmlType={'submit'} size={'large'}>Зарегистрироваться</Button>
            </form>
            <div className={styles.link}>
                <div className={styles.item}>
                    <p className={'text text_type_main-default text_color_inactive'}>
                        Уже зарегистрированы?
                    </p>
                    <Link to={LOGIN_PATH}>Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default PageRegister;
