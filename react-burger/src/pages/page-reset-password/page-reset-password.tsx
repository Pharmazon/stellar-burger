import styles from './page-reset-password.module.css';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {performPostRequest} from "../../utils/request";
import {FORGOT_PASSWORD_PATH, LOGIN_PATH} from "../../utils/constants";
import AppHeader from "../../components/app-header/app-header/app-header";
import {useAppSelector} from "../../services/store";

const PageResetPassword = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState(String);
    const [password, setPassword] = useState(String);
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!user.isPasswordRestored) {
            navigate(FORGOT_PASSWORD_PATH, {replace: true});
        }
    }, [user.isPasswordRestored, navigate]);

    const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await performPostRequest('password-reset/reset', {
                password: password,
                token: token,
            });
            navigate(LOGIN_PATH, {replace: true});
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка сброса пароля: ${error.message}`
                : error || 'Неожиданная ошибка';
            console.log(errorMessage);
        }
    };

    return (
        <>
            <AppHeader/>
            <div className={`pt-30 ${styles.container}`}>
                <form className={styles.form} onSubmit={onResetSubmit}>
                    <p className={'text text_type_main-medium'}>Восстановление пароля</p>
                    <PasswordInput
                        size={'default'}
                        value={password}
                        placeholder={'Введите новый пароль'}
                        onChange={onPasswordChange}
                        name='password'
                    ></PasswordInput>
                    <Input
                        type={'text'}
                        size={'default'}
                        placeholder={'Введите код из письма'}
                        name={'token'}
                        value={token}
                        onChange={onTokenChange}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    ></Input>
                    <Button
                        htmlType={'submit'}
                        size={'large'}
                    >
                        Сохранить
                    </Button>
                </form>
                <div className={styles.link}>
                    <div className={styles.item}>
                        <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</p>
                        <Link to={LOGIN_PATH}>Войти</Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PageResetPassword;