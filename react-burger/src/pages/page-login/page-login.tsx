import styles from './page-login.module.css';
import {Button, EmailInput, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../services/store";
import {FORGOT_PASSWORD_PATH, HOME_PATH, REGISTER_PATH} from "../../utils/constants";
import {login} from "../../services/slice/user-slice";
import {useForm} from "../../hooks/useForm";

const PageLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {values, handleChange} = useForm({
        email: '',
        password: ''
    });

    const onLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login({
                email: values.email,
                password: values.password
            })).unwrap();

            navigate(location.state?.from?.pathname || HOME_PATH, {replace: true});
        } catch (e: any) {
            const errorMessage = e.message
                ? `Ошибка авторизации в систему: ${e.message}`
                : e || 'Неожиданная ошибка';
            console.log(errorMessage);
        }
    };

    return (
        <div className={`pt-30 ${styles.container}`}>
            <form className={styles.form} onSubmit={onLoginSubmit}>
                <p className={'text text_type_main-medium'}>Вход</p>
                <EmailInput
                    size={'default'}
                    placeholder={'E-mail'}
                    name={'email'}
                    isIcon={false}
                    value={values.email}
                    onChange={handleChange}
                ></EmailInput>
                <PasswordInput
                    size={'default'}
                    value={values.password}
                    onChange={handleChange}
                    name={'password'}
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
    );
};

export default PageLogin;