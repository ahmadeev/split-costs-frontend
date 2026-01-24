import '../FormLayout/FormLayout.css';
import './ExpensesForm.css';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';

type Checks = Record<string, boolean>;
interface DividedSum { fraction: number, ways: number }

const getSumDivided = (amount: number, checkStates: Checks): DividedSum => {
    const numberOfChecked = Object.values(checkStates).reduce((acc, value) => {
        return value ? acc + 1 : acc;
    }, 0);

    if (!numberOfChecked || !amount) {
        return { fraction: 0, ways: 0 };
    }

    return { fraction: Math.round(amount / numberOfChecked * 100) / 100, ways: numberOfChecked };
};

const getHintString = (amount: number, checkStates: Checks): string => {
    const result: DividedSum = getSumDivided(amount, checkStates);

    if (!result.fraction || !result.ways) {
        return '';
    }

    return `${String(result.fraction)} руб/чел`;
};

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

const GROUP_NAMES = ['Леша', 'Саша', 'Ваня', 'Толя', 'Вася', 'Акакий'];

export default function ExpensesForm() {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const [divideEvenly, setDivideEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
        return GROUP_NAMES.reduce((acc: Checks, value: string) => {
            return { ...acc, [value]: true };
        }, {});
    });

    const handleCheckStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name;

        setChecksState({ ...checksState, [elementName]: !checksState[elementName] });
    };

    // todo: не обновляется c useMemo
    const hintString = getHintString(+amount, checksState);

    const [expenseName, setExpenseName] = useState('');

    const handleExpenseNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setExpenseName(e.target.value);
    };

    return (
        <div className={'form-layout__container'}>
            <div
                onClick={handleEditClick}
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
            >
                <input
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    type="text"
                    placeholder='Введите комментарий'
                    onChange={handleExpenseNameInput}
                />
            </div>
            <div
                onClick={handleEditClick}
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
            >
                <input
                    type="text"
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='Введите сумму'
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>

            {hintString && (
                <div className={'form-layout__row'}>
                    <span>{hintString}</span>
                </div>
            )}

            {
                divideEvenly ? (
                    <></>
                ) : (
                    GROUP_NAMES.map((name: string, index: number) => (
                        <div className='form-layout__row form-layout__row_bordered' key={index}>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name={name}
                                    onChange={handleCheckStateChange}
                                    style={{ margin: '1rem', cursor: 'pointer' }}
                                />
                                <span>{name}</span>
                            </label>
                        </div>
                    ))
                )
            }

            <button
                onClick={() => {
                    Object.keys(checksState).forEach((name: string) => {
                        checksState[name] = !divideEvenly;
                    });

                    setDivideEvenly((prev: boolean) => !prev);
                }}
            >{divideEvenly ? 'Выбрать из списка' : 'Разделить поровну'}</button>

            <button
                className='form-layout__button_primary form-layout__button_full-width'
                onClick={() => {
                    console.log(expenseName);
                    console.log(amount);
                    console.log(Object.keys(checksState).filter(name => checksState[name]));
                }}
            >Сохранить
            </button>
        </div>
    );
}
