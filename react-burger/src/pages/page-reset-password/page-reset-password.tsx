import styles from './page-reset-password.module.css';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {performPostRequest} from "../../utils/request";
import {FORGOT_PASSWORD_PATH, LOGIN_PATH} from "../../utils/constants";
import {useAppSelector} from "../../services/store";
import {useForm} from "../../hooks/useForm";

const PageResetPassword = () => {

    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const {values, handleChange} = useForm({
        token: '',
        password: '',
    });

    useEffect(() => {
        if (!user.isPasswordRestored) {
            navigate(FORGOT_PASSWORD_PATH, {replace: true});
        }
    }, [user.isPasswordRestored, navigate]);

    const onResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await performPostRequest('password-reset/reset', {
                password: values.password,
                token: values.token,
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
        <div className={`pt-30 ${styles.container}`}>
            <form className={styles.form} onSubmit={onResetSubmit}>
                <p className={'text text_type_main-medium'}>Восстановление пароля</p>
                <PasswordInput
                    size={'default'}
                    value={values.password}
                    placeholder={'Введите новый пароль'}
                    onChange={handleChange}
                    name='password'
                ></PasswordInput>
                <Input
                    type={'text'}
                    size={'default'}
                    placeholder={'Введите код из письма'}
                    name={'token'}
                    value={values.token}
                    onChange={handleChange}
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
    )
};

export default PageResetPassword;