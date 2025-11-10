import styles from './page-forgot-password.module.css';
import {Button, EmailInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LOGIN_PATH, RESET_PASSWORD_PATH} from "../../utils/constants";
import {useAppDispatch} from "../../services/store";
import {clearForgotPassword, forgotPassword} from "../../services/user-slice";
import {useForm} from "../../hooks/useForm";

const PageForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {values, handleChange} = useForm({
        email: '',
    });

    useEffect(() => {
        dispatch(clearForgotPassword());
    }, [dispatch]);

    const onForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(forgotPassword(values.email));
            navigate(RESET_PASSWORD_PATH, {replace: true});
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка запроса на сброс пароля: ${error.message}`
                : error || 'Неожиданная ошибка';
            console.log(errorMessage);
        }
    };

    return (
        <div className={styles.container}>
            <form className={`${styles.form} mt-20`} onSubmit={onForgotPasswordSubmit}>
                <p className={'text text_type_main-medium pt-10'}>Восстановление пароля</p>
                <EmailInput
                    size={'default'}
                    placeholder={'Укажите e-mail'}
                    name={'email'}
                    isIcon={false}
                    value={values.email}
                    onChange={handleChange}
                ></EmailInput>
                <Button htmlType={'submit'} size={'large'}>Восстановить</Button>
            </form>
            <div className={styles.links}>
                <div className={styles.item}>
                    <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</p>
                    <Link to={LOGIN_PATH}>Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default PageForgotPassword;
