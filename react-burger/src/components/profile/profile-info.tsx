import styles from './profile-info.module.css';
import {useAppDispatch, useAppSelector} from "../../services/store";
import {ChangeEvent, FormEvent, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {updateUserDetails} from "../../services/user-slice";
import Preloader from "../preloader/preloader";

const ProfileInfo = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const [anyInputChanged, setAnyInputChanged] = useState(false);
    const [nameInputDisabled, setNameInputDisabled] = useState(true);
    const [name, setName] = useState(user.user?.name ?? '');
    const [login, setLogin] = useState(user.user?.email ?? '');
    const [password, setPassword] = useState('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnyInputChanged(e.target.value !== user.user?.name);
        setName(e.target.value);
    };

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnyInputChanged(e.target.value !== user.user?.email);
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnyInputChanged(e.target.value !== '');
        setPassword(e.target.value);
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(updateUserDetails({
                email: login,
                name: name,
                password: password || undefined,
        }));
    };

    const onCancelClick = () => {
        setAnyInputChanged(false);
        setName(user.user?.name ?? '');
        setLogin(user.user?.email ?? '');
        setPassword('');
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
                value={name}
                onChange={handleNameChange}
                disabled={nameInputDisabled}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <EmailInput
                isIcon
                size='default'
                placeholder='Логин'
                value={login}
                onChange={handleLoginChange}
            />
            <PasswordInput
                size='default'
                value={password}
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