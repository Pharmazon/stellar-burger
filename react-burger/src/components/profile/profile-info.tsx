import styles from './profile-info.module.css';
import {useAppDispatch, useAppSelector} from "../../services/store";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {updateUserDetails} from "../../services/slice/user-slice";
import Preloader from "../preloader/preloader";
import {useForm} from "../../hooks/useForm";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH} from "../../utils/constants";

const ProfileInfo = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const [anyInputChanged, setAnyInputChanged] = useState(false);
    const [nameInputDisabled, setNameInputDisabled] = useState(true);
    const {values, setValues} = useForm({
        name: user.user?.name ?? '',
        login: user.user?.email ?? '',
        password: ''
    });

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate(LOGIN_PATH);
        }
    }, []);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnyInputChanged(e.target.value !== user.user?.name);
        setValues({...values, name: e.target.value});
    };

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnyInputChanged(e.target.value !== user.user?.email);
        setValues({...values, login: e.target.value});
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnyInputChanged(e.target.value !== '');
        setValues({...values, password: e.target.value});
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(updateUserDetails({
            email: values.login,
            name: values.name,
            password: values.password
        }));
    };

    const onCancelClick = () => {
        setAnyInputChanged(false);
        setValues({
            name: user.user?.name ?? '',
            login: user.user?.email ?? '',
            password: ''
        })
    };

    if (user.status === 'loading') {
        return <Preloader/>;
    }

    if (user.status === 'fail') {
        return <p>{user.error}</p>;
    }

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <Input
                icon={'EditIcon'}
                onIconClick={() => setNameInputDisabled(!nameInputDisabled)}
                type='text'
                size='default'
                placeholder='Имя'
                value={values.name}
                onChange={handleNameChange}
                disabled={nameInputDisabled}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <EmailInput
                isIcon
                size='default'
                placeholder='Логин'
                value={values.login}
                onChange={handleLoginChange}
            />
            <PasswordInput
                size='default'
                value={values.password}
                onChange={handlePasswordChange}
                icon='EditIcon'
            />
            <div className={styles.buttons}>
                {
                    anyInputChanged && (
                        <>
                            <Button
                                htmlType='submit'
                                size='medium'
                            >
                                Сохранить
                            </Button>
                            <Button
                                htmlType='button'
                                size='medium'
                                type='secondary'
                                onClick={onCancelClick}
                            >
                                Отменить
                            </Button>
                        </>
                    )
                }
            </div>
        </form>
    );
};

export default ProfileInfo;