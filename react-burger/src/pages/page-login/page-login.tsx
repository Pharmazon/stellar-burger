import styles from './page-login.module.css';
import {Button, EmailInput, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {ChangeEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../services/store";
import {FORGOT_PASSWORD_PATH, HOME_PATH, REGISTER_PATH} from "../../utils/constants";
import AppHeader from "../../components/app-header/app-header/app-header";
import {login} from "../../services/user-slice";

const PageLogin = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login({
                email: email,
                password: password
            })).unwrap();

            navigate(HOME_PATH, {replace: true});
        } catch (e: any) {
            const errorMessage = e.message
                ? `Ошибка авторизации в систему: ${e.message}`
                : e || 'Неожиданная ошибка';
            console.log(errorMessage);
        }
    };

    return (
        <>
            <AppHeader/>
            <div className={`pt-30 ${styles.container}`}>
                <form className={styles.form} onSubmit={onLoginSubmit}>
                    <p className={'text text_type_main-medium'}>Вход</p>
                    <EmailInput
                        size={'default'}
                        placeholder={'E-mail'}
                        name={'email'}
                        isIcon={false}
                        value={email}
                        onChange={onEmailChange}
                    ></EmailInput>
                    <PasswordInput
                        size={'default'}
                        value={password}
                        onChange={onPasswordChange}
                        name='password'
                    ></PasswordInput>
                    <Button
                        htmlType={'submit'}
                        size={'large'}
                    >Войти</Button>
                </form>
                <div className={styles.link}>
                    <div className={styles.item}>
                        <p className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?</p>
                        <Link to={REGISTER_PATH}>Зарегистрироваться</Link>
                    </div>
                    <div className={styles.item}>
                        <p className={'text text_type_main-default text_color_inactive'}>Забыли пароль?</p>
                        <Link to={FORGOT_PASSWORD_PATH}>Восстановить пароль</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageLogin;