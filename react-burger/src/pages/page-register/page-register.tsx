import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../services/store";
import {HOME_PATH, LOGIN_PATH} from "../../utils/constants";
import AppHeader from "../../components/app-header/app-header/app-header";
import styles from './page-register.module.css';
import {register} from "../../services/user-slice";

const PageRegister = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [name, setName] = useState(String);
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(register({
                email: email,
                password: password,
                name: name,
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
        <>
            <AppHeader/>
            <div className={`pt-30 ${styles.container}`}>
                <form className={styles.form} onSubmit={onRegisterSubmit}>
                    <p className={'text text_type_main-medium'}>Регистрация</p>
                    <Input
                        type={'text'}
                        size={'default'}
                        placeholder={'Имя'}
                        name={'name'}
                        value={name}
                        onChange={onNameChange}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    ></Input>
                    <EmailInput
                        size={'default'}
                        placeholder={'E-mail'}
                        name={'email'}
                        isIcon={false}
                        value={email}
                        onChange={onEmailChange}></EmailInput>
                    <PasswordInput
                        size={'default'}
                        value={password}
                        onChange={onPasswordChange}
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
        </>
    );
};

export default PageRegister;
